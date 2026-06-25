# Cloudflare Pages Deployment

This project is a static site. It does not require a build step.

## Pages Build Settings

- Framework preset: None
- Build command: leave empty
- Build output directory: `.`
- Root directory: `/`

## Custom Domain

In Cloudflare Pages, open the `icnc2026` project, go to Custom domains, and add:

- `icnc2026.org`
- `www.icnc2026.org`, optional

Because the domain is already managed by Cloudflare, Pages can create the required DNS record automatically.

If both apex and `www` are enabled, use a Cloudflare Redirect Rule to redirect:

```text
www.icnc2026.org/* -> https://icnc2026.org/$1
```

## Notes

- `wrangler.toml` sets the Pages output directory to the project root.
- `_headers` adds basic security headers and cache headers for CSS and JavaScript.
- `robots.txt`, `sitemap.xml`, canonical URLs, and Open Graph URLs are configured for `https://icnc2026.org/`.
