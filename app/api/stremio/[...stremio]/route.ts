import { getStremioManifest } from "@/lib/stremio/catalog";
import { stremioHead, stremioJson, stremioOptions } from "@/lib/stremio/http";

type RouteContext = {
  params: Promise<{ stremio: string[] }>;
};

function isManifestRoute(segments: string[]) {
  return segments.length === 1 && segments[0] === "manifest.json";
}

export async function GET(_request: Request, context: RouteContext) {
  const { stremio } = await context.params;

  if (!isManifestRoute(stremio)) {
    return stremioJson({ error: "Not found" }, { status: 404 });
  }

  try {
    const manifest = await getStremioManifest();
    return stremioJson(manifest);
  } catch {
    return stremioJson(
      { error: "Unable to load Stremio manifest." },
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
