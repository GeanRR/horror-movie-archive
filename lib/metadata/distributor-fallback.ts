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
    const wikidataDistributor = await fetchWikidataDistributor(
      wikidataMovie.itemId,
      originCountry
    );

    if (wikidataDistributor) {
      return wikidataDistributor;
    }
  }

  const wikipediaTitles = await findWikipediaMoviePageTitles({
    imdbId,
    tmdbId,
    title,
    year,
  });

  for (const wikipediaTitle of wikipediaTitles) {
    const wikipediaDistributor = await fetchWikipediaInfoboxDistributor(
      wikipediaTitle,
      originCountry
    );

    if (wikipediaDistributor) {
      return wikipediaDistributor;
    }
  }

  return null;
}

export async function fetchWikipediaMovieSubgenreSignals({
  imdbId,
  tmdbId,
  title,
  year,
}: Omit<DistributorFallbackInput, "originCountry">): Promise<string[]> {
  const wikipediaTitles = await findWikipediaMoviePageTitles({
    imdbId,
    tmdbId,
    title,
    year,
  });

  for (const wikipediaTitle of wikipediaTitles) {
    const wikitext = await fetchWikipediaWikitext(wikipediaTitle);
    if (!wikitext) continue;

    const signals = extractWikipediaSubgenreSignals(wikitext);
    if (signals.length > 0) return signals;
  }

  return [];
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

async function fetchWikidataDistributor(itemId: string, originCountry?: string) {
  const query = `
    SELECT ?distributorLabel ?territoryLabel WHERE {
      wd:${itemId} p:P750 ?statement.
      ?statement ps:P750 ?distributor.
      OPTIONAL { ?statement pq:P17 ?territory. }
      OPTIONAL { ?statement pq:P1001 ?territory. }
      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en".
      }
    }
    LIMIT 20
  `;

  const bindings = await fetchWikidataBindings(query);
  const candidates = dedupeDistributorCandidates(
    bindings
      .map((binding: WikidataBinding) => {
        const name = normalizeDistributorNameOnly(
          binding.distributorLabel?.value
        );
        if (!name) return null;

        return {
          name,
          territory: binding.territoryLabel?.value?.trim() ?? "",
        } satisfies DistributorCandidate;
      })
      .filter(
        (
          candidate: DistributorCandidate | null
        ): candidate is DistributorCandidate => Boolean(candidate)
      )
  );

  if (candidates.length === 0) return null;

  const theatricalCandidates =
    candidates.length > 1
      ? candidates.filter(
          (candidate) => !isLikelyStreamingOrHomeVideoDistributor(candidate.name)
        )
      : candidates;
  const usableCandidates =
    theatricalCandidates.length > 0 ? theatricalCandidates : candidates;

  return chooseDistributorCandidate(usableCandidates, originCountry)?.name ?? null;
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
    const exactTitleYearMatches: string[] = [];
    for (const candidate of candidates) {
      const wikitext = await fetchWikipediaWikitext(candidate);
      if (!wikitext) continue;

      if (isExactWikipediaMovieTitle(candidate, title, year)) {
        exactTitleYearMatches.push(candidate);
      }

      if (imdbId && !wikitext.includes(imdbId.replace(/^tt/, ""))) {
        continue;
      }

      verified.push(candidate);
    }

    if (verified.length === 1) return verified[0];
    return exactTitleYearMatches.length === 1 ? exactTitleYearMatches[0] : null;
  } catch {
    return null;
  }
}

async function findWikipediaMoviePageTitles({
  imdbId,
  tmdbId,
  title,
  year,
}: Omit<DistributorFallbackInput, "originCountry">) {
  const titles: string[] = [];
  const wikidataMovie = await findWikidataMovie({ imdbId, tmdbId });
  if (wikidataMovie?.enwikiTitle) titles.push(wikidataMovie.enwikiTitle);

  for (const candidate of [title, year ? `${title} (${year} film)` : ""]) {
    if (!candidate) continue;
    const wikitext = await fetchWikipediaWikitext(candidate);
    if (wikitext && isLikelyRequestedMoviePage(wikitext, imdbId, year)) {
      titles.push(candidate);
    }
  }

  const titleSearchMatch = await findWikipediaTitleMatch({ imdbId, title, year });
  if (titleSearchMatch) titles.push(titleSearchMatch);

  return Array.from(
    new Map(titles.map((candidate) => [candidate.toLowerCase(), candidate])).values()
  );
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

function isLikelyRequestedMoviePage(
  wikitext: string,
  imdbId: string | undefined,
  year: string
) {
  const infobox = extractInfobox(wikitext);
  if (!infobox) return false;

  if (imdbId && wikitext.includes(imdbId.replace(/^tt/, ""))) {
    return true;
  }

  return Boolean(year && infobox.includes(year));
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
    .replace(/<ref\b[^>]*\/\s*>/gi, "")
    .replace(/<ref\b[^>]*>[\s\S]*?<\/ref>/gi, "")
    .replace(/\{\{\s*(efn|refn|notetag|#tag:ref)\b[^{}]*\}\}/gi, "");
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

function normalizeDistributorNameOnly(value: string | null | undefined) {
  return normalizeDistributor(value);
}

function dedupeDistributorCandidates(candidates: DistributorCandidate[]) {
  return candidates.filter(
    (candidate, index, values) =>
      values.findIndex(
        (value) =>
          value.name.toLowerCase() === candidate.name.toLowerCase() &&
          normalizeComparableTerritory(value.territory) ===
            normalizeComparableTerritory(candidate.territory)
      ) === index
  );
}

function isLikelyStreamingOrHomeVideoDistributor(value: string) {
  return /\b(netflix|prime video|amazon video|amazon prime|hulu|disney\+?|hbo max|max|paramount\+|peacock|shudder|tubi|pluto tv|crackle|roku|apple tv\+?|itunes|google play|youtube|vudu|fandango at home|criterion channel|mubi|kanopy|home video|video|dvd|blu-ray)\b/i.test(
    value
  );
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
    .replace(/\{\{\s*ill\s*\|\s*([^|{}]+)(?:\|[^{}]*)?\}\}/gi, "$1")
    .replace(/\{\{\s*interlanguage link\s*\|\s*([^|{}]+)(?:\|[^{}]*)?\}\}/gi, "$1")
    .replace(/\{\{\s*film distribution\s*\|\s*([^|{}]+)(?:\|[^{}]*)?\}\}/gi, "$1")
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

function isExactWikipediaMovieTitle(
  candidateTitle: string,
  expectedTitle: string,
  expectedYear: string
) {
  if (!expectedTitle || !expectedYear) return false;
  const candidateYear = candidateTitle.match(/\((\d{4})\s+film\)/i)?.[1];
  if (candidateYear !== expectedYear) return false;

  return (
    normalizeComparableTitle(candidateTitle.replace(/\s*\(\d{4}\s+film\)\s*$/i, "")) ===
    normalizeComparableTitle(expectedTitle)
  );
}

function normalizeComparableTitle(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/^the\s+/, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractWikipediaSubgenreSignals(wikitext: string) {
  const signals = new Set<string>();
  const cleaned = stripReferencesAndComments(wikitext);
  const infobox = extractInfobox(cleaned);
  const articleBody = infobox ? cleaned.replace(infobox, "") : cleaned;
  const lead = articleBody.split(/\n==\s*Plot\s*==/i)[0] ?? "";

  for (const match of lead.matchAll(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g)) {
    const label = cleanWikiText(match[2] ?? match[1]);
    if (isUsefulSubgenreSignal(label)) signals.add(label);
  }

  for (const match of cleaned.matchAll(/\[\[Category:([^\]|]+)(?:\|[^\]]*)?\]\]/gi)) {
    const label = cleanWikiText(match[1]);
    if (isUsefulSubgenreSignal(label)) signals.add(label);
  }

  return Array.from(signals);
}

function cleanWikiText(value: string) {
  return value
    .replace(/\{\{[^{}]+\}\}/g, "")
    .replace(/'''?/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isUsefulSubgenreSignal(value: string) {
  const normalized = normalizeComparableTitle(value);
  return (
    /\b(horror|giallo|slasher|zombie|vampire|werewolf|screenlife|found footage|mockumentary|lovecraftian|eldritch|supernatural|body|possession|folk|gothic|creature|home invasion|torture|splatter|demon)\b/.test(
      normalized
    ) && !/\b(portal|template|stub|lists?|awards?)\b/.test(normalized)
  );
}

function sparqlString(value: string) {
  return JSON.stringify(value);
}

function decodeWikiTitle(url: string) {
  const title = url.split("/wiki/")[1];
  return title ? decodeURIComponent(title).replace(/_/g, " ") : null;
}
