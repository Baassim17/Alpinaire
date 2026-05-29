import { readFile } from "node:fs/promises";
import path from "node:path";

const htmlPath = path.join(process.cwd(), "public", "altergeneva", "index.html");

export async function GET() {
  const html = await readFile(htmlPath, "utf8");

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache, must-revalidate",
    },
  });
}
