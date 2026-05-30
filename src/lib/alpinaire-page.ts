import { readFile } from "node:fs/promises";
import path from "node:path";

const alpinaireDir = path.join(process.cwd(), "public", "alpinaire");
const apiDir = path.join(alpinaireDir, "api");
const htmlPath = path.join(alpinaireDir, "index.html");

type StrapiImage = {
  data?: {
    attributes?: {
      url?: string;
    };
  } | null;
};

type StrapiMeta = {
  title?: string;
  description?: string;
  canonicalUrl?: string | null;
  image?: StrapiImage;
};

type StrapiEntity = {
  attributes?: {
    meta?: StrapiMeta;
  };
};

type StrapiResponse = {
  data?: StrapiEntity | StrapiEntity[] | null;
};

type StaticProps = {
  props: {
    data: StrapiEntity | null;
    meta: {
      title: string;
      description: string;
      imageUrl: string;
      canonical?: string | null;
    };
  };
  name: string;
  url: string;
};

const defaultDescription =
  "Alpinaire is an independent Swiss watchmaking studio specializing in watch customization. Our mission is to transform your timepieces into one-of-a-kind pieces through a creative, artisanal process";

function safeSlug(slug: string) {
  return slug.replace(/[^A-Za-z0-9._-]/g, "_");
}

function buildMeta(meta?: StrapiMeta) {
  return {
    title: meta?.title || "Alpinaire",
    description: meta?.description || defaultDescription,
    imageUrl: meta?.image?.data?.attributes?.url || "https://alpinaire.com/share_image.webp",
    canonical: meta?.canonicalUrl,
  };
}

async function readJson(filePath: string): Promise<StrapiResponse> {
  return JSON.parse(await readFile(filePath, "utf8")) as StrapiResponse;
}

async function getRouteData(pathname: string): Promise<StaticProps> {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";

  if (cleanPath === "/services") {
    const response = await readJson(path.join(apiDir, "service__populate_deep.json"));
    const data = Array.isArray(response.data) ? null : response.data || null;
    return {
      props: { data, meta: buildMeta(data?.attributes?.meta) },
      name: "services",
      url: "/services",
    };
  }

  if (cleanPath === "/projects") {
    const response = await readJson(path.join(apiDir, "projects-listing__populate_deep.json"));
    const data = Array.isArray(response.data) ? null : response.data || null;
    return {
      props: { data, meta: buildMeta(data?.attributes?.meta) },
      name: "project-list",
      url: "/projects",
    };
  }

  const pageMatch = cleanPath.match(/^\/projects\/page\/([^/]+)$/);
  if (pageMatch) {
    const response = await readJson(
      path.join(apiDir, `projects-listing__populate_deep__page_${safeSlug(pageMatch[1])}.json`),
    );
    const data = Array.isArray(response.data) ? null : response.data || null;
    return {
      props: { data, meta: buildMeta(data?.attributes?.meta) },
      name: "project-list-page",
      url: cleanPath,
    };
  }

  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const response = await readJson(
      path.join(apiDir, `project__slug__${safeSlug(projectMatch[1])}.json`),
    );
    const data = Array.isArray(response.data) ? response.data[0] || null : response.data || null;
    return {
      props: { data, meta: buildMeta(data?.attributes?.meta) },
      name: "single-project",
      url: cleanPath,
    };
  }

  const pages: Record<string, { file: string; name: string }> = {
    "/warranties": { file: "warrantie__populate_deep.json", name: "warranties" },
    "/faq": { file: "faq__populate_deep.json", name: "faq" },
    "/contact": { file: "contact__populate_deep.json", name: "contact" },
    "/privacy-policy": { file: "legal__populate_deep.json", name: "privacy-policy" },
    "/legal-notices": { file: "legal-notice__populate_deep.json", name: "legal-notices" },
    "/cookies": { file: "cookie__populate_deep.json", name: "cookies" },
    "/terms-of-use": { file: "term-of-use__populate_deep.json", name: "terms-of-use" },
    "/terms-and-conditions": {
      file: "term-and-condition__populate_deep.json",
      name: "terms-and-conditions",
    },
  };

  const page = pages[cleanPath];
  if (page) {
    const response = await readJson(path.join(apiDir, page.file));
    const data = Array.isArray(response.data) ? null : response.data || null;
    return {
      props: { data, meta: buildMeta(data?.attributes?.meta) },
      name: page.name,
      url: cleanPath,
    };
  }

  const response = await readJson(path.join(alpinaireDir, "homepage.json"));
  const data = Array.isArray(response.data) ? null : response.data || null;
  return {
    props: { data, meta: buildMeta(data?.attributes?.meta) },
    name: "home",
    url: "/",
  };
}

export async function renderAlpinairePage(pathname: string) {
  const [html, staticProps] = await Promise.all([readFile(htmlPath, "utf8"), getRouteData(pathname)]);
  const propsScript = `window.__SSR_STATIC_PROPS__=${JSON.stringify(staticProps)}`;

  return html.replace(
    /window\.__SSR_STATIC_PROPS__=[\s\S]*?<\/script><script type="text\/javascript">window\.__GLOBAL_DATA__/,
    `${propsScript}</script><script type="text/javascript">window.__GLOBAL_DATA__`,
  );
}
