import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_BASE_URL = "http://localhost:3000";
const DEFAULT_VIEWPORT = { width: 1440, height: 1200 };
const SCREENSHOT_ROOT = path.join(process.cwd(), "screenshots");
const RUN_ID = new Date().toISOString().replace(/[:.]/g, "-");
const OUTPUT_DIR = path.join(SCREENSHOT_ROOT, `visual-audit-${RUN_ID}`);

const ROUTE_LABELS = {
  "/library": "Library",
  "/dashboard": "Dashboard",
  "/year-in-review": "Year in Review",
  "/watchlist": "Watchlist",
  "/release-calendar": "Release Calendar",
  "/settings": "Settings",
};

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    console.error(
      [
        "Playwright is not installed in this project.",
        "",
        "Install it before running this visual audit:",
        "  npm install -D playwright",
        "  npx playwright install chromium",
        "",
        "Then run:",
        "  npm run visual:audit",
      ].join("\n")
    );
    process.exit(1);
  }
}

async function discoverAppRoutes() {
  const appRoot = path.join(process.cwd(), "app", "(app)");
  const routes = new Set();

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.name !== "page.tsx") continue;

      const relativeDir = path.relative(appRoot, path.dirname(fullPath));
      if (!relativeDir || relativeDir.includes("[") || relativeDir === ".") {
        continue;
      }

      routes.add(`/${relativeDir.split(path.sep).join("/")}`);
    }
  }

  await walk(appRoot);

  return Array.from(routes).sort((a, b) => {
    const preferred = Object.keys(ROUTE_LABELS);
    const aIndex = preferred.indexOf(a);
    const bIndex = preferred.indexOf(b);
    if (aIndex >= 0 && bIndex >= 0) return aIndex - bIndex;
    if (aIndex >= 0) return -1;
    if (bIndex >= 0) return 1;
    return a.localeCompare(b);
  });
}

async function waitForPageSettled(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(500);
}

async function safeClick(locator, options = {}) {
  try {
    if ((await locator.count()) === 0) return false;
    await locator.first().click({ timeout: 5000, ...options });
    return true;
  } catch {
    return false;
  }
}

async function safeFill(locator, value) {
  try {
    if ((await locator.count()) === 0) return false;
    await locator.first().fill(value, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

async function screenshot(page, name) {
  const filePath = path.join(OUTPUT_DIR, `${slug(name)}.png`);
  await page.screenshot({
    path: filePath,
    fullPage: true,
    animations: "disabled",
  });
  console.log(`captured ${path.relative(process.cwd(), filePath)}`);
}

async function closeTopModal(page) {
  const closeButton = page
    .locator(
      [
        '[aria-label^="Close"]',
        'button:has-text("Cancel")',
        'button:has-text("Back")',
      ].join(", ")
    )
    .last();

  if (!(await safeClick(closeButton))) {
    await page.keyboard.press("Escape").catch(() => {});
  }

  await page.waitForTimeout(300);
}

async function waitForAddMovieResults(page) {
  await Promise.race([
    page.getByRole("listitem").first().getByRole("button").waitFor({
      state: "visible",
      timeout: 10000,
    }),
    page.getByText(/search unavailable|no movies found/i).waitFor({
      state: "visible",
      timeout: 10000,
    }),
  ]).catch(() => {});
  await page.waitForTimeout(500);
}

async function openAddMoviePanel(page) {
  if (await safeClick(page.getByRole("button", { name: /^add movie$/i }))) {
    return true;
  }

  const headerButtons = page.locator("header button");
  if ((await headerButtons.count()) > 0) {
    return safeClick(headerButtons.last());
  }

  return false;
}

async function createTemporaryLibraryMovie(page, baseUrl) {
  await page.goto(`${baseUrl}/library`);
  await waitForPageSettled(page);

  if ((await page.locator('[aria-label^="Open details for"]').count()) > 0) {
    return false;
  }

  if (!(await openAddMoviePanel(page))) return false;

  await page.waitForTimeout(500);
  if (!(await safeFill(page.getByPlaceholder(/search by title/i), "the thing"))) {
    await closeTopModal(page);
    return false;
  }

  await waitForAddMovieResults(page);

  const result = page.getByRole("listitem").first().getByRole("button");
  if (!(await safeClick(result, { force: true }))) {
    await closeTopModal(page);
    return false;
  }

  await page.waitForTimeout(1000);
  await safeClick(page.getByRole("radio", { name: /^8$/ }).first());

  if (!(await safeClick(page.getByRole("button", { name: /save movie/i })))) {
    await closeTopModal(page);
    return false;
  }

  await page.waitForTimeout(1000);
  await closeTopModal(page);
  return true;
}

async function captureLibraryStates(page, baseUrl) {
  await page.goto(`${baseUrl}/library`);
  await waitForPageSettled(page);

  await createTemporaryLibraryMovie(page, baseUrl);
  await page.goto(`${baseUrl}/library`);
  await waitForPageSettled(page);

  await safeClick(page.getByRole("button", { name: /list view/i }));
  await waitForPageSettled(page);
  await screenshot(page, "Library - List View");

  const firstMovie = page.locator('[aria-label^="Open details for"]').first();
  if (await safeClick(firstMovie)) {
    await page.waitForTimeout(500);
    await screenshot(page, "Library - Movie Details");

    if (await safeClick(page.getByRole("button", { name: /^edit$/i }))) {
      await page.waitForTimeout(500);
      await screenshot(page, "Library - Edit Movie Modal");
      await closeTopModal(page);
    }

    if (await safeClick(page.getByRole("button", { name: /change poster/i }))) {
      await page.waitForTimeout(700);
      await screenshot(page, "Library - Change Poster Modal");
      await closeTopModal(page);
    }

    if (await safeClick(page.getByRole("button", { name: /^delete$/i }))) {
      await page.waitForTimeout(300);
      await screenshot(page, "Library - Delete Confirmation");
      await safeClick(page.getByRole("button", { name: /cancel/i }));
    }

    if (await safeClick(page.getByRole("button", { name: /manage lists/i }))) {
      await page.waitForTimeout(500);
      await screenshot(page, "Library - Manage Lists Modal");
      await closeTopModal(page);
    }

    await closeTopModal(page);
  }

  await safeClick(page.getByRole("button", { name: /filters/i }));
  await page.waitForTimeout(300);
  await screenshot(page, "Library - Filters Open");
  await safeClick(page.getByRole("button", { name: /filters/i }));
  await page.waitForTimeout(300);

  await safeClick(page.getByRole("button", { name: /grid view/i }));
  await waitForPageSettled(page);
  await screenshot(page, "Library - Grid View");

  const firstGridMovie = page.locator("main button, section button").filter({ hasText: /\d{4}/ }).first();
  if (await safeClick(firstGridMovie)) {
    await page.waitForTimeout(500);
    await screenshot(page, "Library - Grid Movie Details");
    await closeTopModal(page);
  }

  await page.goto(`${baseUrl}/library`);
  await waitForPageSettled(page);
  const headerButtons = page.locator("header button");
  if ((await headerButtons.count()) > 0 && (await safeClick(headerButtons.last()))) {
    await page.waitForTimeout(500);
    await screenshot(page, "Library - Add Movie Panel");

    const searchField = page.getByPlaceholder(/search by title/i);
    if (await safeFill(searchField, "nosferatu")) {
      await waitForAddMovieResults(page);
      await screenshot(page, "Library - Add Movie Search Results");

      const result = page.getByRole("listitem").first().getByRole("button");
      if (await safeClick(result, { force: true })) {
        await page.waitForTimeout(1000);
        await screenshot(page, "Library - Add Movie Confirmation");
      }
    }

    await closeTopModal(page);
  }
}

async function captureDashboardStates(page, baseUrl) {
  await page.goto(`${baseUrl}/dashboard`);
  await waitForPageSettled(page);
  await screenshot(page, "Dashboard - Full Page");

  const interactiveCards = [
    "Open 1980s movies",
    "Open United States movies",
    "Open Classic movies",
    "Open Nastiest Nasties movies",
    "Open Trashiest Trashes movies",
    "Open Guiltiest Pleasures movies",
    "Open Baddest Baddies movies",
  ];

  for (const label of interactiveCards) {
    if (await safeClick(page.getByLabel(label))) {
      await page.waitForTimeout(500);
      await screenshot(page, `Dashboard - ${label.replace(/^Open /, "")}`);
      await closeTopModal(page);
    }
  }
}

async function captureYearInReviewStates(page, baseUrl) {
  await page.goto(`${baseUrl}/year-in-review`);
  await waitForPageSettled(page);
  await screenshot(page, "Year in Review - Full Page");

  const interactiveCards = [
    "Open January movies",
    "Open Classic movies",
    "Open Psychological Horror movies",
  ];

  for (const label of interactiveCards) {
    if (await safeClick(page.getByLabel(label))) {
      await page.waitForTimeout(500);
      await screenshot(page, `Year in Review - ${label.replace(/^Open /, "")}`);
      await closeTopModal(page);
    }
  }
}

async function captureWatchlistStates(page, baseUrl) {
  await page.goto(`${baseUrl}/watchlist`);
  await waitForPageSettled(page);
  await screenshot(page, "Watchlist - Full Page");

  if (await safeClick(page.getByRole("button", { name: /create list/i }))) {
    await page.waitForTimeout(500);
    await screenshot(page, "Watchlist - Create List Modal");
    await closeTopModal(page);
  }

  const firstList = page.locator("section button").filter({ hasText: /movies?/i }).first();
  if (await safeClick(firstList)) {
    await page.waitForTimeout(500);
    await screenshot(page, "Watchlist - List Detail");

    if (await safeClick(page.getByRole("button", { name: /add movies/i }))) {
      await page.waitForTimeout(500);
      await screenshot(page, "Watchlist - Add Movies Modal");
      await safeFill(page.getByPlaceholder(/search any movie/i), "nosferatu");
      await page.waitForTimeout(1800);
      await screenshot(page, "Watchlist - Add Movies Search Results");
      await closeTopModal(page);
    }

    if (await safeClick(page.getByRole("button", { name: /edit list/i }))) {
      await page.waitForTimeout(500);
      await screenshot(page, "Watchlist - Edit List Modal");
      await closeTopModal(page);
    }

    const firstMovie = page.locator("article").first();
    if (await safeClick(firstMovie)) {
      await page.waitForTimeout(500);
      await screenshot(page, "Watchlist - Movie Details");
      await closeTopModal(page);
    }
  }
}

async function captureReleaseCalendarStates(page, baseUrl) {
  await page.goto(`${baseUrl}/release-calendar`);
  await waitForPageSettled(page);
  await screenshot(page, "Release Calendar - Full Page");

  const monthButton = page.getByLabel(/open .* releases/i).first();
  if (await safeClick(monthButton)) {
    await page.waitForTimeout(500);
    await screenshot(page, "Release Calendar - Month Modal");

    const firstRelease = page.locator("button").filter({ hasText: /theatrical|streaming|digital|tba/i }).first();
    if (await safeClick(firstRelease)) {
      await page.waitForTimeout(500);
      await screenshot(page, "Release Calendar - Movie Details");
      await closeTopModal(page);
    }

    await closeTopModal(page);
  }
}

async function captureSettingsStates(page, baseUrl) {
  await page.goto(`${baseUrl}/settings`);
  await waitForPageSettled(page);
  await screenshot(page, "Settings - Full Page");

  if (await safeClick(page.getByRole("button", { name: /import csv/i }))) {
    await page.waitForTimeout(500);
    await screenshot(page, "Settings - Import CSV Modal");
    await closeTopModal(page);
  }
}

async function main() {
  const baseUrl = process.env.HMA_BASE_URL ?? DEFAULT_BASE_URL;
  const { chromium } = await loadPlaywright();

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const discoveredRoutes = await discoverAppRoutes();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: DEFAULT_VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(7000);

  console.log(`visual audit base URL: ${baseUrl}`);
  console.log(`screenshots: ${path.relative(process.cwd(), OUTPUT_DIR)}`);
  console.log(`discovered routes: ${discoveredRoutes.join(", ")}`);

  for (const route of discoveredRoutes) {
    await page.goto(`${baseUrl}${route}`);
    await waitForPageSettled(page);
    await screenshot(page, `${ROUTE_LABELS[route] ?? route} - Page`);
  }

  await captureLibraryStates(page, baseUrl);
  await captureDashboardStates(page, baseUrl);
  await captureYearInReviewStates(page, baseUrl);
  await captureWatchlistStates(page, baseUrl);
  await captureReleaseCalendarStates(page, baseUrl);
  await captureSettingsStates(page, baseUrl);

  await browser.close();
  console.log("visual audit complete");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
