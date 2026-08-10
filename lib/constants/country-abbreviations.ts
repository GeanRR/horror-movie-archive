const COUNTRY_ALIASES: Record<string, string> = {
  "united states of america": "United States",
  "united states": "United States",
  usa: "United States",
  "u.s.a.": "United States",
  "u.s.": "United States",
  us: "United States",
  "united kingdom": "United Kingdom",
  uk: "United Kingdom",
  gb: "United Kingdom",
  "great britain": "United Kingdom",
  england: "United Kingdom",
};

const COUNTRY_DISPLAY_MAP: Record<string, string> = {
  "United States": "USA",
  "United Kingdom": "UK",
  Japan: "JPN",
  Brazil: "BRA",
  France: "FRA",
  Germany: "GER",
  "West Germany": "GER",
  "East Germany": "GER",
  Italy: "ITA",
  Spain: "ESP",
  Mexico: "MEX",
  Canada: "CAN",
  Australia: "AUS",
  "South Korea": "KOR",
  China: "CHN",
  India: "IND",
  Russia: "RUS",
  Sweden: "SWE",
  Norway: "NOR",
  Denmark: "DEN",
  Finland: "FIN",
  Netherlands: "NED",
  Belgium: "BEL",
  Switzerland: "SUI",
  Austria: "AUT",
  Ireland: "IRL",
  "New Zealand": "NZL",
  Argentina: "ARG",
  Chile: "CHI",
  Colombia: "COL",
  Portugal: "POR",
  Poland: "POL",
  "Czech Republic": "CZE",
  Czechoslovakia: "CZE",
  Hungary: "HUN",
  Romania: "ROU",
  Greece: "GRE",
  Turkey: "TUR",
  Thailand: "THA",
  "Hong Kong": "HKG",
  Taiwan: "TWN",
  "South Africa": "ZAF",
  Egypt: "EGY",
  Nigeria: "NGA",
  Iran: "IRN",
  Israel: "ISR",
  Iceland: "ISL",
  Croatia: "CRO",
  Serbia: "SRB",
  Bulgaria: "BGR",
  Ukraine: "UKR",
  Indonesia: "IDN",
  Philippines: "PHL",
  Malaysia: "MYS",
  Singapore: "SGP",
  Vietnam: "VNM",
  Pakistan: "PAK",
  Bangladesh: "BGD",
  "Saudi Arabia": "SAU",
  "United Arab Emirates": "ARE",
  Peru: "PER",
  Venezuela: "VEN",
  Cuba: "CUB",
  "Puerto Rico": "PRI",
};

function isMissingCountry(value: string | null | undefined) {
  const normalized = value?.trim();
  return (
    !normalized ||
    normalized === "-" ||
    normalized === "—" ||
    normalized === "â€”"
  );
}

export function normalizeCountryName(country: string | null | undefined): string {
  if (isMissingCountry(country)) return "";

  const trimmed = country!.trim();
  return COUNTRY_ALIASES[trimmed.toLowerCase()] ?? trimmed;
}

export function normalizeCountries(country: string | null | undefined): string[] {
  if (isMissingCountry(country)) return [];

  const countries = country!
    .split(",")
    .map((item) => normalizeCountryName(item))
    .filter(Boolean);

  return Array.from(new Set(countries));
}

export function formatCountry(country: string | null | undefined): string {
  const countries = normalizeCountries(country);
  return countries.length > 0 ? countries.join(", ") : "—";
}

export function abbreviateCountry(country: string | null | undefined): string {
  const countries = normalizeCountries(country);
  if (countries.length === 0) return "—";
  return countries.map((item) => COUNTRY_DISPLAY_MAP[item] ?? item).join(", ");
}
