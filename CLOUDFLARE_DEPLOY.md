# Cloudflare Pages Deployment

This project is a static site. It does not require a build step.

## Pages Build Settings

- Framework preset: None
- Build command: leave empty
- Build output directory: `.`
- Root directory: `/`

## Custom Domain

Add the following custom domains in Cloudflare Pages:

- `icnc2026.org`
- `www.icnc2026.org`, optional

If both apex and `www` are enabled, use a Cloudflare Redirect Rule to redirect:

```text
www.icnc2026.org/* -> https://icnc2026.org/$1
```

## Notes

- `wrangler.toml` sets the Pages output directory to the project root.
- `_headers` adds basic security headers and cache headers for CSS and JavaScript.
