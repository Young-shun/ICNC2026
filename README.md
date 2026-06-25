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
- Build command: `npm run build`
- Build output directory: `.`

The repository includes `wrangler.toml`, `_headers`, and `_redirects`, so Cloudflare Pages can deploy the static files directly.

## Deploy with Wrangler

```powershell
npm install
npm run deploy
```
