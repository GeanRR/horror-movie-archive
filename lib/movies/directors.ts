export function formatDirectorNames(names: Array<string | null | undefined>) {
  const uniqueNames = Array.from(
    new Set(
      names
        .map((name) => name?.trim())
        .filter((name): name is string => Boolean(name))
    )
  );

  return uniqueNames.length > 0 ? uniqueNames.join(", ") : "—";
}

export function splitDirectorNames(value: string | null | undefined) {
  const director = value?.trim();

  if (!director || director === "-" || director === "—") return [];

  return Array.from(
    new Set(
      director
        .split(/\s*(?:,|\/|&|\band\b)\s*/i)
        .map((name) => name.trim())
        .filter(Boolean)
    )
  );
}
