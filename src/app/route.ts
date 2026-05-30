import { renderAlpinairePage } from "@/lib/alpinaire-page";

export async function GET() {
  const html = await renderAlpinairePage("/");

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache, must-revalidate",
    },
  });
}
