import type { RequestHandler } from './$types';

/** Boards are user-made and endless, so only the front door is worth crawling. */
export const GET: RequestHandler = ({ url }) =>
  new Response(
    `User-agent: *
Allow: /$
Disallow: /s/
Disallow: /go
Disallow: /api/

Sitemap: ${url.origin}/sitemap.xml
`,
    { headers: { 'content-type': 'text/plain; charset=utf-8' } }
  );
