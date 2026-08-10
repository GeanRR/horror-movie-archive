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
  genreTerms?: string[];
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
    terms: ["found footage", "mockumentary", "documentary crew", "video camera"],
  },
  {
    label: "Giallo",
    priority: 104,
    terms: ["giallo", "masked killer", "black-gloved", "black gloves"],
  },
  {
    label: "Slasher",
    priority: 100,
    terms: ["slasher", "masked killer", "final girl", "stalk and slash"],
  },
  {
    label: "Zombie Horror",
    priority: 96,
    terms: ["zombie", "zombies", "undead", "living dead", "infected"],
  },
  {
    label: "Vampire Horror",
    priority: 94,
    terms: ["vampire", "vampires", "dracula", "bloodsucker"],
  },
  {
    label: "Werewolf Horror",
    priority: 92,
    terms: ["werewolf", "lycanthrope", "full moon"],
  },
  {
    label: "Body Horror",
    priority: 90,
    terms: ["body horror", "mutation", "mutant", "parasite", "flesh"],
  },
  {
    label: "Possession Horror",
    priority: 88,
    terms: ["possession", "possessed", "exorcism", "exorcist"],
  },
  {
    label: "Folk Horror",
    priority: 86,
    terms: ["folk horror", "witchcraft", "pagan ritual", "pagan cult"],
  },
  {
    label: "Cosmic Horror",
    priority: 84,
    terms: ["cosmic horror", "lovecraft", "eldritch", "ancient god", "cosmic"],
  },
  {
    label: "Supernatural Horror",
    priority: 82,
    terms: ["supernatural", "ghost", "haunting", "haunted house", "spirit", "curse"],
  },
  {
    label: "Sci-Fi Horror",
    priority: 80,
    terms: ["alien", "space", "extraterrestrial", "science experiment", "laboratory"],
    genreTerms: ["science fiction", "sci-fi"],
  },
  {
    label: "Psychological Horror",
    priority: 78,
    terms: ["psychological horror", "paranoia", "hallucination", "madness"],
  },
  {
    label: "Creature Feature",
    priority: 76,
    terms: ["creature", "monster", "beast", "animal attack", "shark", "crocodile"],
  },
  {
    label: "Home Invasion",
    priority: 74,
    terms: ["home invasion", "break-in", "intruder", "intruders"],
  },
  {
    label: "Torture Horror",
    priority: 72,
    terms: ["torture", "sadistic", "captivity", "abduction"],
  },
  {
    label: "Gothic Horror",
    priority: 70,
    terms: ["gothic", "castle", "victorian", "mansion"],
  },
  {
    label: "Horror Comedy",
    priority: 68,
    terms: ["horror comedy", "dark comedy"],
    genreTerms: ["comedy"],
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

const TITLE_RULES: Array<[RegExp, string]> = [
  [/\bsuspiria\b/i, "Giallo"],
  [/\bscream\b/i, "Slasher"],
  [/\bthe blair witch project\b/i, "Found Footage"],
  [/\bthe thing\b/i, "Body Horror"],
  [/\bthe witch\b/i, "Folk Horror"],
  [/\bthe conjuring\b/i, "Supernatural Horror"],
  [/\balien\b/i, "Sci-Fi Horror"],
  [/\bhereditary\b/i, "Psychological Horror"],
  [/\btrain to busan\b/i, "Zombie Horror"],
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
  const title = "displayTitle" in value ? value.displayTitle : value.title;
  const overview = "synopsis" in value ? value.synopsis : value.overview;
  const genres = value.genres ?? [];
  const keywords = "keywords" in value ? value.keywords ?? [] : [];
  const collections = "collections" in value ? value.collections ?? [] : [];
  const titleSignal = normalizeSignal(
    [title, value.originalTitle].filter(Boolean).join(" ")
  );
  const structuredSignal = normalizeSignal(
    [...genres, ...keywords, ...collections].join(" ")
  );
  const overviewSignal = normalizeSignal(overview);

  for (const [pattern, label] of COLLECTION_RULES) {
    if (collections.some((collection) => pattern.test(collection))) {
      return label;
    }
  }

  for (const [pattern, label] of TITLE_RULES) {
    if (pattern.test(titleSignal)) return label;
  }

  const matches = SUBGENRE_RULES.map((rule) => {
    const structuredHits = rule.terms.filter((term) =>
      includesTerm(structuredSignal, term)
    ).length;
    const genreHits =
      rule.genreTerms?.filter((term) => includesTerm(structuredSignal, term))
        .length ?? 0;
    const overviewHits = rule.terms.filter((term) =>
      includesTerm(overviewSignal, term)
    ).length;

    return {
      label: rule.label,
      structuredHits,
      genreHits,
      overviewHits,
      score: structuredHits * 4 + genreHits * 3 + overviewHits,
      priority: rule.priority,
    };
  })
    .filter((match) => match.structuredHits > 0 || match.genreHits > 0)
    .filter((match) => match.score >= 4)
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
