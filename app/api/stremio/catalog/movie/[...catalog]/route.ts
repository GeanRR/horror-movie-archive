import { getStremioCatalogMetas } from "@/lib/stremio/catalog";
import { stremioHead, stremioJson, stremioOptions } from "@/lib/stremio/http";

type RouteContext = {
  params: Promise<{ catalog: string[] }>;
};

function parseCatalogId(segments: string[]) {
  const lastSegment = segments.at(-1) ?? "";
  return lastSegment.replace(/\.json$/, "");
}

export async function GET(_request: Request, context: RouteContext) {
  const { catalog } = await context.params;
  const catalogId = parseCatalogId(catalog);
  try {
    const { metas } = await getStremioCatalogMetas(catalogId);
    return stremioJson({ metas });
  } catch {
    return stremioJson(
      { metas: [], error: "Unable to load Stremio catalog." },
      { status: 503 }
    );
  }
}

export function OPTIONS() {
  return stremioOptions();
}

export function HEAD() {
  return stremioHead();
}
