import Papa from "papaparse";

export type CsvParseResult<T> = Papa.ParseResult<T>;

/**
 * Foundation wrapper for Papa Parse — use when importing/exporting archive data.
 */
export function parseCsv<T = Record<string, string>>(
  input: string,
  options?: Papa.ParseConfig
): CsvParseResult<T> {
  return Papa.parse<T>(input, {
    header: true,
    skipEmptyLines: true,
    ...options,
  });
}

export function stringifyCsv<T extends Record<string, unknown>>(
  data: T[],
  options?: Papa.UnparseConfig
): string {
  return Papa.unparse(data, options);
}
