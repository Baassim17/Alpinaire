import { readFile } from "node:fs/promises";
import path from "node:path";

const apiDir = path.join(process.cwd(), "public", "alpinaire", "api");
const alpinaireDir = path.join(process.cwd(), "public", "alpinaire");

function jsonPathFor(request: Request, segments: string[]) {
  const url = new URL(request.url);
  const endpoint = segments.join("/");

  if (endpoint === "random") {
    return path.join(alpinaireDir, "random.json");
  }

  if (endpoint === "homepage") {
    return path.join(alpinaireDir, "homepage.json");
  }

  if (endpoint === "service") {
    return path.join(apiDir, "service__populate_deep.json");
  }

  if (endpoint === "projects-listing") {
    const page = url.searchParams.get("pagination[page]");
    if (page === "2") {
      return path.join(apiDir, "projects-listing__populate_deep__page_2.json");
    }

    if (page === "1") {
      return path.join(apiDir, "projects-listing__populate_deep__page_1.json");
    }

    return path.join(apiDir, "projects-listing__populate_deep.json");
  }

  if (endpoint === "projects") {
    const slug = url.searchParams.get("filters[slug]");
    if (slug) {
      const safeSlug = slug.replace(/[^A-Za-z0-9._-]/g, "_");
      return path.join(apiDir, `project__slug__${safeSlug}.json`);
    }
  }

  const pageFiles: Record<string, string> = {
    warrantie: "warrantie__populate_deep.json",
    faq: "faq__populate_deep.json",
    contact: "contact__populate_deep.json",
    legal: "legal__populate_deep.json",
    "legal-notice": "legal-notice__populate_deep.json",
    cookie: "cookie__populate_deep.json",
    "term-of-use": "term-of-use__populate_deep.json",
    "term-and-condition": "term-and-condition__populate_deep.json",
    "not-found": "not-found__populate_deep.json",
  };

  const file = pageFiles[endpoint];
  return file ? path.join(apiDir, file) : null;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  const filePath = jsonPathFor(request, segments);

  if (!filePath) {
    return Response.json({ data: null, meta: {} }, { status: 404 });
  }

  try {
    const json = await readFile(filePath, "utf8");
    return new Response(json, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-cache, must-revalidate",
      },
    });
  } catch {
    return Response.json({ data: null, meta: {} }, { status: 404 });
  }
}
