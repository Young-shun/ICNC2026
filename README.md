# ICNC 2026 Website

Static website for the 2026 International Conference on Neuromorphic Computing.

## Run locally

Open `index.html` directly in a browser, or run the Cloudflare Pages dev server:

```powershell
npm install
npm run dev
```

## Deploy on Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages and use:

- Framework preset: `None`
- Build command: leave empty, or use `npm run build`
- Build output directory: `.`

The repository includes `wrangler.toml`, `_headers`, `_redirects`, `robots.txt`, and `sitemap.xml`, so Cloudflare Pages can deploy the static files directly.

Do not set the Cloudflare Pages build command to `wrangler deploy`. That is the Workers deploy command. If you see `Missing entry-point to Worker script or to assets directory`, change the Pages build command back to blank or `npm run build`.

## Production Domain

The production domain is:

```text
https://icnc2026.org/
```

In Cloudflare Pages, open the `icnc2026` project and add `icnc2026.org` under Custom domains. Because the domain is already on Cloudflare, Pages can create the required DNS record automatically.

Optionally add `www.icnc2026.org` and redirect it to `https://icnc2026.org/`.

## Deploy with Wrangler

```powershell
npm install
npm run deploy
```

This runs `wrangler pages deploy`, not `wrangler deploy`.
