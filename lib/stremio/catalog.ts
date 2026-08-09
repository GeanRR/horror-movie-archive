import { prisma } from "@/lib/db/prisma";

export type StremioCatalogMeta = {
  id: string;
  type: "movie";
  name: string;
  poster?: string;
  releaseInfo?: string;
};

export type StremioCatalog = {
  type: "movie";
  id: string;
  name: string;
};

export type StremioManifest = {
  id: string;
  version: string;
  name: string;
  description: string;
  resources: ["catalog"];
  types: ["movie"];
  catalogs: StremioCatalog[];
};

const ADDON_ID = "community.retromax.watchlists.poc";
const ADDON_NAME = "Retromax Watchlists";
const ADDON_VERSION = "0.0.1";

function isValidImdbId(value: string | null | undefined): value is string {
  return /^tt\d{7,}$/.test(value ?? "");
}

export async function getStremioWatchlistCatalogs(): Promise<StremioCatalog[]> {
  const lists = await prisma.watchlist.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
    },
  });

  return lists.map((list) => ({
    type: "movie",
    id: list.id,
    name: list.name,
  }));
}

export async function getStremioWatchlistCatalog(catalogId: string) {
  const list = await prisma.watchlist.findUnique({
    where: { id: catalogId },
    include: {
      items: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!list) return null;

  return {
    id: list.id,
    name: list.name,
    items: list.items,
  };
}

export async function getStremioManifest(): Promise<StremioManifest> {
  const catalogs = await getStremioWatchlistCatalogs();

  return {
    id: ADDON_ID,
    version: ADDON_VERSION,
    name: ADDON_NAME,
    description:
      "Private Horror Movie Archive watchlist catalogs.",
    resources: ["catalog"],
    types: ["movie"],
    catalogs,
  };
}

export async function getStremioCatalogMetas(catalogId: string) {
  const catalog = await getStremioWatchlistCatalog(catalogId);

  if (!catalog) {
    return {
      catalog,
      metas: [] satisfies StremioCatalogMeta[],
    };
  }

  const metas: StremioCatalogMeta[] = catalog.items
    .filter((item) => isValidImdbId(item.imdbId))
    .map((item) => ({
      id: item.imdbId!,
      type: "movie",
      name: item.displayTitle,
      poster: item.posterUrl ?? undefined,
      releaseInfo: item.year || undefined,
    }));

  return {
    catalog,
    metas,
  };
}
