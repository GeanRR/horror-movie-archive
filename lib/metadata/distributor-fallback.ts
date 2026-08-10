import { normalizeCountries } from "@/lib/constants/country-abbreviations";

type DistributorFallbackInput = {
  imdbId?: string;
  tmdbId: number;
  title: string;
  year: string;
  originCountry?: string;
};

type WikidataMovie = {
  itemId: string;
  enwikiTitle: string | null;
};

type WikidataBinding = Record<
  string,
  {
    value?: string;
  }
>;

const WIKIDATA_SPARQL_ENDPOINT = "https://query.wikidata.org/sparql";
const WIKIPEDIA_API_ENDPOINT = "https://en.wikipedia.org/w/api.php";
const USER_AGENT = "HorrorMovieArchive/1.0 metadata fallback";

export function isMissingMetadataValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return !normalized || normalized === "-" || normalized === "—";
}

export async function fetchDistributorFallback({
  imdbId,
  tmdbId,
  title,
  year,
  originCountry,
}: DistributorFallbackInput): Promise<string | null> {
  const wikidataMovie = await findWikidataMovie({ imdbId, tmdbId });

  if (wikidataMovie) {
    if (wikidataMovie.enwikiTitle) {
      const wikipediaDistributor = await fetchWikipediaInfoboxDistributor(
        wikidataMovie.enwikiTitle,
        originCountry
      );

      if (wikipediaDistributor) {
        return wikipediaDistributor;
      }
    }

    const wikidataDistributor = await fetchWikidataDistributor(
      wikidataMovie.itemId
    );

    if (wikidataDistributor) {
      return wikidataDistributor;
    }
  }

  const titleSearchMatch = await findWikipediaTitleMatch({
    imdbId,
    title,
    year,
  });

  if (!titleSearchMatch) {
    return null;
  }

  return fetchWikipediaInfoboxDistributor(titleSearchMatch, originCountry);
}

async function findWikidataMovie({
  imdbId,
  tmdbId,
}: Pick<DistributorFallbackInput, "imdbId" | "tmdbId">) {
  const idClauses = [
    imdbId ? `?item wdt:P345 ${sparqlString(imdbId)}.` : null,
    `?item wdt:P4947 ${sparqlString(String(tmdbId))}.`,
  ].filter(Boolean);

  for (const idClause of idClauses) {
    const query = `
      SELECT ?item ?article WHERE {
        ${idClause}
        OPTIONAL {
          ?article schema:about ?item;
            schema:isPartOf <https://en.wikipedia.org/>.
        }
      }
      LIMIT 2
    `;

    const bindings = await fetchWikidataBindings(query);
    if (bindings.length !== 1) continue;

    const itemUri = bindings[0]?.item?.value;
    const itemId = itemUri?.split("/").at(-1);
    if (!itemId) continue;

    const articleUrl = bindings[0]?.article?.value;

    return {
      itemId,
      enwikiTitle: articleUrl ? decodeWikiTitle(articleUrl) : null,
    } satisfies WikidataMovie;
  }

  return null;
}

async function fetchWikidataDistributor(itemId: string) {
  const query = `
    SELECT ?distributorLabel WHERE {
      wd:${itemId} wdt:P750 ?distributor.
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en".
      }
    }
    LIMIT 5
  `;

  const bindings = await fetchWikidataBindings(query);
  const labels = bindings
    .map((binding: WikidataBinding) => binding.distributorLabel?.value)
    .filter((value: string | undefined): value is string =>
      Boolean(value?.trim())
    )
    .filter(
      (value: string, index: number, values: string[]) =>
        values.findIndex(
          (candidate) => candidate.toLowerCase() === value.toLowerCase()
        ) === index
    );

  if (labels.length !== 1) {
    return null;
  }

  return normalizeDistributor(labels[0]);
}

async function fetchWikidataBindings(query: string) {
  const url = `${WIKIDATA_SPARQL_ENDPOINT}?query=${encodeURIComponent(
    query
  )}&format=json`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/sparql-results+json",
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return Array.isArray(data.results?.bindings)
      ? data.results.bindings
      : [];
  } catch {
    return [];
  }
}

async function findWikipediaTitleMatch({
  imdbId,
  title,
  year,
}: Pick<DistributorFallbackInput, "imdbId" | "title" | "year">) {
  if (!title || !year) return null;

  const searchParams = new URLSearchParams({
    action: "query",
    format: "json",
    list: "search",
    srsearch: `"${title}" ${year} film`,
    srlimit: "5",
    origin: "*",
  });

  try {
    const response = await fetch(`${WIKIPEDIA_API_ENDPOINT}?${searchParams}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 0 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const results = Array.isArray(data.query?.search)
      ? data.query.search
      : [];

    const candidates = results
      .map((result: { title?: string }) => result.title)
      .filter((candidate: string | undefined): candidate is string =>
        Boolean(candidate)
      );

    const verified: string[] = [];
    for (const candidate of candidates) {
      const wikitext = await fetchWikipediaWikitext(candidate);
      if (!wikitext) continue;

      if (imdbId && !wikitext.includes(imdbId.replace(/^tt/, ""))) {
        continue;
      }

      verified.push(candidate);
    }

    return verified.length === 1 ? verified[0] : null;
  } catch {
    return null;
  }
}

async function fetchWikipediaInfoboxDistributor(
  title: string,
  originCountry?: string
) {
  const wikitext = await fetchWikipediaWikitext(title);
  if (!wikitext) return null;

  const infobox = extractInfobox(wikitext);
  if (!infobox) return null;

  const rawValue = extractInfoboxField(infobox, [
    "distributed_by",
    "distributor",
    "distributors",
  ]);

  return normalizeDistributor(rawValue, originCountry);
}

async function fetchWikipediaWikitext(title: string) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    prop: "revisions",
    rvprop: "content",
    rvslots: "main",
    titles: title,
    redirects: "1",
    origin: "*",
  });

  try {
    const response = await fetch(`${WIKIPEDIA_API_ENDPOINT}?${params}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 0 },
    });

    if (!response.ok) return null;

    const data = await response.json();
    const pages = data.query?.pages;
    const page = pages ? Object.values(pages)[0] : null;

    if (!page || typeof page !== "object") return null;

    const revision = (page as { revisions?: Array<Record<string, unknown>> })
      .revisions?.[0];
    const slots = revision?.slots as
      | { main?: { "*": string; content?: string } }
      | undefined;

    return slots?.main?.content ?? slots?.main?.["*"] ?? null;
  } catch {
    return null;
  }
}

function extractInfobox(wikitext: string) {
  const start = wikitext.search(/\{\{Infobox\s+(film|television)/i);
  if (start === -1) return null;

  let depth = 0;
  for (let index = start; index < wikitext.length - 1; index += 1) {
    const pair = wikitext.slice(index, index + 2);
    if (pair === "{{") {
      depth += 1;
      index += 1;
    } else if (pair === "}}") {
      depth -= 1;
      index += 1;
      if (depth === 0) {
        return wikitext.slice(start, index + 1);
      }
    }
  }

  return null;
}

function extractInfoboxField(infobox: string, fieldNames: string[]) {
  const source = stripReferencesAndComments(infobox);

  for (const fieldName of fieldNames) {
    const pattern = new RegExp(String.raw`^\|\s*${fieldName}\s*=`, "im");
    const match = pattern.exec(source);
    if (!match) continue;

    const start = match.index + match[0].length;
    let templateDepth = 0;

    for (let index = start; index < source.length - 1; index += 1) {
      const pair = source.slice(index, index + 2);

      if (pair === "{{") {
        templateDepth += 1;
        index += 1;
        continue;
      }

      if (pair === "}}") {
        if (templateDepth === 0) return source.slice(start, index).trim();
        templateDepth -= 1;
        index += 1;
        continue;
      }

      if (source[index] === "\n" && templateDepth === 0) {
        const nextLine = source.slice(index + 1);
        if (/^\|\s*[\w ]+\s*=/.test(nextLine) || /^}}/.test(nextLine)) {
          return source.slice(start, index).trim();
        }
      }
    }

    return source.slice(start).trim();
  }

  return null;
}

function normalizeDistributor(
  value: string | null | undefined,
  originCountry?: string
) {
  if (!value) return null;

  const candidates = expandDistributorCandidates(value)
    .map((candidate) => parseDistributorCandidate(candidate))
    .filter((candidate): candidate is DistributorCandidate => Boolean(candidate));

  return chooseDistributorCandidate(candidates, originCountry)?.name ?? null;
}

type DistributorCandidate = {
  name: string;
  territory: string;
};

function stripReferencesAndComments(value: string) {
  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<ref[\s\S]*?<\/ref>/gi, "")
    .replace(/<ref[^/>]*\/>/gi, "");
}

function parseDistributorCandidate(value: string): DistributorCandidate | null {
  const cleaned = cleanDistributorCandidate(value);
  if (!isValidDistributorValue(cleaned)) return null;

  const territoryMatch = cleaned.match(/\(([^()]+)\)\s*$/);
  const territory = territoryMatch?.[1]?.trim() ?? "";
  const name = cleaned.replace(/\s*\([^()]+\)\s*$/, "").trim();

  if (!isValidDistributorValue(name)) return null;

  return { name, territory };
}

function chooseDistributorCandidate(
  candidates: DistributorCandidate[],
  originCountry?: string
) {
  if (candidates.length === 0) return null;

  const byOrigin = candidates.find((candidate) =>
    territoryMatchesOrigin(candidate.territory, originCountry)
  );
  if (byOrigin) return byOrigin;

  const byUnitedStates = candidates.find((candidate) =>
    territoryMatches(candidate.territory, ["United States"])
  );
  if (byUnitedStates) return byUnitedStates;

  const byWorldwide = candidates.find((candidate) =>
    /\b(worldwide|international|global|all territories)\b/i.test(
      candidate.territory
    )
  );
  if (byWorldwide) return byWorldwide;

  return candidates[0];
}

function expandDistributorCandidates(value: string) {
  const expanded = stripReferencesAndComments(value)
    .replace(/\{\{\s*(ubl|unbulleted list|plainlist|flatlist)\s*\|/gi, "")
    .replace(/\{\{\s*nowrap\s*\|([^{}]+)\}\}/gi, "$1")
    .replace(/<br\s*\/?>/gi, "|")
    .replace(/\n\*\s*/g, "|")
    .replace(/\n/g, "|");

  return expanded
    .split(/[|;]/)
    .map((candidate) => candidate.trim())
    .filter(Boolean);
}

function cleanDistributorCandidate(value: string) {
  return stripReferencesAndComments(value)
    .replace(/\{\{nowrap\|([^{}]+)\}\}/gi, "$1")
    .replace(/\{\{flagicon\|[^{}]+\}\}/gi, "")
    .replace(/\{\{[^{}]+\}\}/g, "")
    .replace(/\[\[File:[^\]]+\]\]/gi, "")
    .replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, "$1")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/'''?/g, "")
    .replace(/^(distributed|released)\s+by\s+/i, "")
    .replace(/<br\s*\/?>/gi, ", ")
    .replace(/\n\*\s*/g, ", ")
    .replace(/\n/g, ", ")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s+/g, " ")
    .replace(/^[,;\s]+|[,;\s]+$/g, "")
    .trim();
}

function isValidDistributorValue(value: string | null | undefined) {
  if (!value) return false;
  if (value.length < 2 || value.length > 80) return false;
  if (/[={}<>[\]|]/.test(value)) return false;
  if (/<!--|-->|template|citation needed|unknown/i.test(value)) return false;
  if (
    /\b(magazine|journal|publisher|publication|citation|reference|isbn|doi|editor|retrieved|access-date|newspaper|website|url|service|services)\b/i.test(
      value
    )
  ) {
    return false;
  }
  if (/\b(distributed|released|published|retrieved|accessed)\b/i.test(value)) {
    return false;
  }
  if (value.split(/\s+/).length > 8) return false;
  if (!/[a-z0-9]/i.test(value)) return false;
  return true;
}

function territoryMatchesOrigin(
  territory: string,
  originCountry: string | undefined
) {
  const origins = normalizeCountries(originCountry);
  if (origins.length === 0) return false;

  return territoryMatches(territory, origins);
}

function territoryMatches(territory: string, countries: string[]) {
  if (!territory) return false;

  const comparable = normalizeComparableTerritory(territory);
  return countries.some((country) => {
    const normalizedCountry = normalizeComparableTerritory(country);
    if (comparable.includes(normalizedCountry)) return true;

    if (
      normalizedCountry === "united states" &&
      /\b(us|u s|usa|u s a|america|american)\b/.test(comparable)
    ) {
      return true;
    }

    if (
      normalizedCountry === "united kingdom" &&
      /\b(uk|u k|britain|british|england)\b/.test(comparable)
    ) {
      return true;
    }

    if (
      ["norway", "sweden", "denmark", "finland", "iceland"].includes(
        normalizedCountry
      ) &&
      /\b(nordic|scandinavia|scandinavian)\b/.test(comparable)
    ) {
      return true;
    }

    return false;
  });
}

function normalizeComparableTerritory(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sparqlString(value: string) {
  return JSON.stringify(value);
}

function decodeWikiTitle(url: string) {
  const title = url.split("/wiki/")[1];
  return title ? decodeURIComponent(title).replace(/_/g, " ") : null;
}
