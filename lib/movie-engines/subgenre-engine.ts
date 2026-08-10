import type { LibraryMovie } from "@/store/movie-store";

export type SubgenreMetadata = {
  title?: string | null;
  originalTitle?: string | null;
  genres?: string[] | null;
  keywords?: string[] | null;
  collections?: string[] | null;
  overview?: string | null;
};

type SubgenreRule = {
  label: string;
  priority: number;
  terms: string[];
  supportTerms?: string[];
};

const SUBGENRE_RULES: SubgenreRule[] = [
  {
    label: "Screenlife Horror",
    priority: 110,
    terms: ["screenlife", "computer screen", "webcam", "video call", "livestream"],
  },
  {
    label: "Found Footage",
    priority: 105,
    terms: [
      "found footage",
      "found-footage",
      "mockumentary horror",
      "documentary horror",
      "documentary crew",
    ],
  },
  {
    label: "Giallo",
    priority: 104,
    terms: ["giallo", "italian giallo"],
  },
  {
    label: "Slasher",
    priority: 100,
    terms: ["slasher", "masked killer", "final girl", "stalk and slash"],
  },
  {
    label: "Zombie Horror",
    priority: 96,
    terms: ["zombie horror", "zombie apocalypse", "living dead", "zombies"],
  },
  {
    label: "Vampire Horror",
    priority: 94,
    terms: ["vampire horror", "vampires", "dracula", "bloodsucker"],
  },
  {
    label: "Werewolf Horror",
    priority: 92,
    terms: ["werewolf horror", "werewolf", "lycanthrope"],
  },
  {
    label: "Body Horror",
    priority: 90,
    terms: [
      "body horror",
      "bodily transformation",
      "grotesque physical transformation",
      "physical transformation",
      "flesh mutation",
      "flesh transformation",
    ],
  },
  {
    label: "Possession Horror",
    priority: 88,
    terms: [
      "possession horror",
      "demonic possession",
      "exorcism horror",
      "exorcist",
    ],
  },
  {
    label: "Folk Horror",
    priority: 86,
    terms: [
      "folk horror",
      "folk-horror",
      "pagan horror",
      "rural occult horror",
      "folklore-based horror",
      "folk tale horror",
    ],
  },
  {
    label: "Cosmic Horror",
    priority: 84,
    terms: ["cosmic horror", "lovecraftian horror", "eldritch horror"],
  },
  {
    label: "Supernatural Horror",
    priority: 82,
    terms: [
      "supernatural horror",
      "ghost story",
      "ghost horror",
      "haunted house horror",
    ],
    supportTerms: [
      "supernatural",
      "paranormal",
      "occult",
      "demon",
      "evil spirit",
      "haunted house",
      "ritual",
      "curse",
    ],
  },
  {
    label: "Sci-Fi Horror",
    priority: 80,
    terms: [
      "science fiction horror",
      "science-fiction horror",
      "sci-fi horror",
      "sci fi horror",
      "alien horror",
    ],
    supportTerms: [
      "science fiction",
      "sci-fi",
      "alien invasion",
      "extraterrestrial",
      "martian",
      "apocalyptic",
      "post-apocalyptic",
      "science fiction thriller",
    ],
  },
  {
    label: "Psychological Horror",
    priority: 78,
    terms: ["psychological horror", "psychological-horror"],
  },
  {
    label: "Creature Feature",
    priority: 76,
    terms: ["creature feature", "monster movie", "animal attack horror"],
    supportTerms: ["giant monster", "kaiju", "animal attack"],
  },
  {
    label: "Home Invasion",
    priority: 74,
    terms: ["home invasion", "break-in", "intruder", "intruders"],
  },
  {
    label: "Torture Horror",
    priority: 72,
    terms: ["torture horror", "torture porn", "sadistic horror"],
  },
  {
    label: "Gothic Horror",
    priority: 70,
    terms: ["gothic horror", "gothic-horror"],
  },
  {
    label: "Fairy-tale Horror",
    priority: 69,
    terms: [
      "fairy tale horror",
      "fairy-tale horror",
      "dark fairy tale",
      "dark fairy-tale",
    ],
  },
  {
    label: "Horror Comedy",
    priority: 68,
    terms: [
      "horror comedy",
      "comedy horror",
      "horror-comedy",
      "dark horror comedy",
      "splatstick",
    ],
  },
];

const COLLECTION_RULES: Array<[RegExp, string]> = [
  [/scream/i, "Slasher"],
  [/friday the 13th|halloween|nightmare on elm street|texas chainsaw/i, "Slasher"],
  [/blair witch|paranormal activity|v\/h\/s/i, "Found Footage"],
  [/conjuring|annabelle|insidious/i, "Supernatural Horror"],
  [/alien/i, "Sci-Fi Horror"],
  [/evil dead/i, "Possession Horror"],
  [/living dead|dead/i, "Zombie Horror"],
];

function normalizeSignal(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function includesTerm(haystack: string, term: string) {
  const normalizedTerm = normalizeSignal(term);
  return new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedTerm)}([^a-z0-9]|$)`).test(
    haystack
  );
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getPrimarySubgenre(value: LibraryMovie | SubgenreMetadata) {
  const overview = "synopsis" in value ? value.synopsis : value.overview;
  const genres = value.genres ?? [];
  const keywords = "keywords" in value ? value.keywords ?? [] : [];
  const collections = "collections" in value ? value.collections ?? [] : [];
  const structuredSignal = normalizeSignal(
    [...genres, ...keywords, ...collections].join(" ")
  );
  const overviewSignal = normalizeSignal(overview);

  for (const [pattern, label] of COLLECTION_RULES) {
    if (collections.some((collection) => pattern.test(collection))) {
      return label;
    }
  }

  const matches = SUBGENRE_RULES.map((rule) => {
    const structuredHits = rule.terms.filter((term) =>
      includesTerm(structuredSignal, term)
    ).length;
    const supportHits =
      rule.supportTerms?.filter((term) => includesTerm(structuredSignal, term))
        .length ?? 0;
    const overviewSupportHits =
      structuredHits > 0 || supportHits > 0
        ? rule.terms.filter((term) => includesTerm(overviewSignal, term)).length
        : 0;

    return {
      label: rule.label,
      structuredHits,
      supportHits,
      overviewSupportHits,
      score: structuredHits * 100 + supportHits * 35 + overviewSupportHits * 10,
      priority: rule.priority,
    };
  })
    .filter((match) => match.structuredHits > 0 || match.supportHits > 0)
    .filter((match) => match.score >= 70)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.priority - a.priority;
    });

  const best = matches[0];
  if (!best) return "";

  return best.label;
}

export function normalizePrimarySubgenres(
  subgenres: string[] | null | undefined,
  movie: LibraryMovie | SubgenreMetadata
) {
  const existing = subgenres?.find((subgenre) => subgenre.trim().length > 0);
  if (existing) return [existing.trim()];

  const classified = getPrimarySubgenre(movie);
  return classified ? [classified] : [];
}
