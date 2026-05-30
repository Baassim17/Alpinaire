import { renderAlpinairePage } from "@/lib/alpinaire-page";

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const html = await renderAlpinairePage(`/${path.join("/")}`);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache, must-revalidate",
    },
  });
}
