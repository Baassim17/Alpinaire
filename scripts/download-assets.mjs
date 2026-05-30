import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_ORIGIN = "https://alpinaire.com";
const API_ORIGIN = "https://api.alpinaire.com";
const HOMEPAGE_API_URL = `${API_ORIGIN}/api/homepage?populate=deep`;
const ROOT = process.cwd();

const homeUrl = `${SITE_ORIGIN}/`;
const randomUrl = `${API_ORIGIN}/api/random`;

const assetPattern =
  /https:\/\/api\.alpinaire\.com\/uploads\/[^\s"'()<>]+|https:\/\/www\.alpinaire\.com\/(?:index-[^\s"'()<>]+\.(?:css|js)|index-legacy-[^\s"'()<>]+\.js|polyfills-legacy-[^\s"'()<>]+\.js|favicon\/[^\s"'()<>]+|share_image\.jpg|UCity[^\s"'()<>]+\.woff2|Zodiak[^\s"'()<>]+\.woff2)|\/(?:uploads\/[^\s"'()<>]+|index-[^\s"'()<>]+\.(?:css|js)|index-legacy-[^\s"'()<>]+\.js|polyfills-legacy-[^\s"'()<>]+\.js|favicon\/[^\s"'()<>]+|share_image\.jpg|UCity[^\s"'()<>]+\.woff2|Zodiak[^\s"'()<>]+\.woff2)/g;

const ensureDir = async (filePath) => {
  await mkdir(path.dirname(filePath), { recursive: true });
};

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
};

const fetchBinary = async (url) => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
      }

      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === 3) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
};

const normalizeAssetUrl = (value) => {
  if (value.startsWith("https://api.alpinaire.com/uploads/")) {
    return value.replace(API_ORIGIN, "");
  }

  if (value.startsWith("https://alpinaire.com/")) {
    return value.replace(SITE_ORIGIN, "");
  }

  return value;
};

const absolutizeAssetUrl = (value) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/uploads/")) {
    return `${API_ORIGIN}${value}`;
  }

  return `${SITE_ORIGIN}${value}`;
};

const addMatchedAssets = (source, assetSet) => {
  for (const match of source.matchAll(assetPattern)) {
    const candidate = normalizeAssetUrl(match[0]);
    if (candidate.startsWith("/")) {
      assetSet.add(candidate);
    }
  }
};

const extractScriptValue = (html, marker) => {
  const start = html.indexOf(marker);
  if (start === -1) {
    throw new Error(`Marker not found: ${marker}`);
  }

  const contentStart = start + marker.length;
  const end = html.indexOf("</script>", contentStart);
  if (end === -1) {
    throw new Error(`Script end not found for: ${marker}`);
  }

  return html.slice(contentStart, end);
};

const extractRootMarkup = (html) => {
  const rootMarker = '<div id="root">';
  const scriptMarker = '<script type="text/javascript">window.__SSR_STATIC_PROPS__=';
  const rootStart = html.indexOf(rootMarker);
  const rootEnd = html.indexOf(scriptMarker);

  if (rootStart === -1 || rootEnd === -1) {
    throw new Error("Unable to locate root SSR markup");
  }

  const inner = html.slice(rootStart + rootMarker.length, rootEnd);
  return inner.replace(/<\/div>\s*$/, "");
};

const rewriteAssetHosts = (value) =>
  value
    .replaceAll(`${API_ORIGIN}/uploads/`, "/uploads/")
    .replaceAll(`${SITE_ORIGIN}/share_image.jpg`, "/share_image.jpg");

const runtimeInterceptor = `<script>
(() => {
  const localMap = new Map([
    ["${API_ORIGIN}/api/random", "/alpinaire/random.json"],
    ["${API_ORIGIN}/api/homepage?populate=deep", "/alpinaire/homepage.json"]
  ]);
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof Request
          ? input.url
          : String(input);
    if (localMap.has(url)) {
      const response = await nativeFetch(localMap.get(url), init);
      return new Response(await response.text(), {
        status: response.status,
        statusText: response.statusText,
        headers: { "Content-Type": "application/json" }
      });
    }
    return nativeFetch(input, init);
  };
})();
</script>`;

const rewriteCssAssetPaths = (value) =>
  value
    .replaceAll(
      "../fonts/ucity/UCityProTrial-Light.woff2",
      "/UCityProTrial-Light-Bec3XHL8.woff2"
    )
    .replaceAll(
      "../fonts/ucity/UCityProTrial-Regular.woff2",
      "/UCityProTrial-Regular-Dw9vie3S.woff2"
    )
    .replaceAll("../fonts/zodiak/Zodiak-Light.woff2", "/Zodiak-Light-B3IFu5EZ.woff2");

const moduleScriptTag =
  '<script type="module" crossorigin src="/index-Cf95Hpzn.js"></script>';
const legacyScriptPattern =
  /<script nomodule crossorigin src="\/index-legacy-[^"]+"><\/script><script nomodule crossorigin src="\/polyfills-legacy-[^"]+"><\/script>/;

const collectUploadAssets = (value, assetSet) => {
  const uploadPattern = /\/uploads\/[^\s"'()<>]+/g;
  for (const match of value.matchAll(uploadPattern)) {
    assetSet.add(match[0]);
  }
};

const main = async () => {
  const homeHtml = await fetchText(homeUrl);
  const randomJsonText = await fetchText(randomUrl);
  const homepageJsonText = await fetchText(HOMEPAGE_API_URL);

  const assets = new Set();
  addMatchedAssets(homeHtml, assets);
  addMatchedAssets(randomJsonText, assets);
  addMatchedAssets(homepageJsonText, assets);
  collectUploadAssets(homeHtml, assets);
  collectUploadAssets(randomJsonText, assets);
  collectUploadAssets(homepageJsonText, assets);

  const rewrittenRootMarkup = rewriteAssetHosts(extractRootMarkup(homeHtml));
  const rewrittenSsrStaticProps = rewriteAssetHosts(
    extractScriptValue(
      homeHtml,
      '<script type="text/javascript">window.__SSR_STATIC_PROPS__='
    )
  );
  const rewrittenGlobalData = rewriteAssetHosts(
    extractScriptValue(
      homeHtml,
      '<script type="text/javascript">window.__GLOBAL_DATA__='
    )
  );
  const rewrittenRandomJson = rewriteAssetHosts(randomJsonText);
  const rewrittenHomepageJson = rewriteAssetHosts(homepageJsonText);
  const cssAssetPath = [...assets].find(
    (assetPath) => assetPath.startsWith("/index-") && assetPath.endsWith(".css")
  );
  const rewrittenHomeHtml = rewriteAssetHosts(homeHtml)
    .replace(moduleScriptTag, "")
    .replace(legacyScriptPattern, "")
    .replace("</body>", `${runtimeInterceptor}${moduleScriptTag}</body>`);

  const assetList = [...assets];
  const concurrency = 4;

  for (let index = 0; index < assetList.length; index += concurrency) {
    const batch = assetList.slice(index, index + concurrency);

    await Promise.all(
      batch.map(async (assetPath) => {
        const destination = path.join(ROOT, "public", assetPath);
        await ensureDir(destination);
        await writeFile(
          destination,
          await fetchBinary(absolutizeAssetUrl(assetPath))
        );
      })
    );
  }

  const homeDataPath = path.join(ROOT, "src", "data", "alpinaire", "home.json");
  const randomDataPath = path.join(
    ROOT,
    "public",
    "alpinaire",
    "random.json"
  );
  const homepageDataPath = path.join(
    ROOT,
    "public",
    "alpinaire",
    "homepage.json"
  );
  const legacyUCityLightPath = path.join(
    ROOT,
    "public",
    "fonts",
    "ucity",
    "UCityProTrial-Light.woff2"
  );
  const legacyUCityRegularPath = path.join(
    ROOT,
    "public",
    "fonts",
    "ucity",
    "UCityProTrial-Regular.woff2"
  );
  const legacyZodiakLightPath = path.join(
    ROOT,
    "public",
    "fonts",
    "zodiak",
    "Zodiak-Light.woff2"
  );
  const staticHtmlPath = path.join(
    ROOT,
    "public",
    "alpinaire",
    "index.html"
  );
  const appCssPath = path.join(ROOT, "src", "app", "alpinaire.css");

  await ensureDir(homeDataPath);
  await ensureDir(randomDataPath);
  await ensureDir(homepageDataPath);
  await ensureDir(legacyUCityLightPath);
  await ensureDir(legacyUCityRegularPath);
  await ensureDir(legacyZodiakLightPath);
  await ensureDir(staticHtmlPath);
  await ensureDir(appCssPath);

  await writeFile(
    homeDataPath,
    JSON.stringify(
      {
        rootMarkup: rewrittenRootMarkup,
        ssrStaticProps: rewrittenSsrStaticProps,
        globalData: rewrittenGlobalData,
      },
      null,
      2
    )
  );

  await writeFile(randomDataPath, rewrittenRandomJson);
  await writeFile(homepageDataPath, rewrittenHomepageJson);
  await writeFile(staticHtmlPath, rewrittenHomeHtml);
  await writeFile(
    legacyUCityLightPath,
    await fetchBinary(`${SITE_ORIGIN}/UCityProTrial-Light-Bec3XHL8.woff2`)
  );
  await writeFile(
    legacyUCityRegularPath,
    await fetchBinary(`${SITE_ORIGIN}/UCityProTrial-Regular-Dw9vie3S.woff2`)
  );
  await writeFile(
    legacyZodiakLightPath,
    await fetchBinary(`${SITE_ORIGIN}/Zodiak-Light-B3IFu5EZ.woff2`)
  );

  if (cssAssetPath) {
    await writeFile(
      appCssPath,
      rewriteCssAssetPaths(await fetchText(absolutizeAssetUrl(cssAssetPath)))
    );
  }

  console.log(`Downloaded ${assetList.length} mirrored assets for Alpinaire.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
