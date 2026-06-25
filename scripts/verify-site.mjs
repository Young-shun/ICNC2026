import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pages = [
  "index.html",
  "committee.html",
  "call-for-papers.html",
  "submission.html",
  "publication.html",
  "program.html",
  "contact.html",
];

const requiredFiles = [
  ...pages,
  "styles.css",
  "script.js",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml",
  "wrangler.toml",
];
const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

if (missing.length > 0) {
  throw new Error(`Missing required files: ${missing.join(", ")}`);
}

const linkPattern = /href="(?!https?:\/\/)([^"]+\.html)"/g;
const brokenLinks = [];

for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
  const canonicalPath = page === "index.html" ? "" : page;
  const canonical = `https://icnc2026.org/${canonicalPath}`;

  if (!html.includes(`rel="canonical" href="${canonical}"`)) {
    throw new Error(`${page} is missing canonical URL ${canonical}`);
  }

  const matches = [...html.matchAll(linkPattern)].map((match) => match[1]);

  for (const href of matches) {
    if (!existsSync(join(root, href))) {
      brokenLinks.push(`${page} -> ${href}`);
    }
  }
}

if (brokenLinks.length > 0) {
  throw new Error(`Broken internal links:\n${brokenLinks.join("\n")}`);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!robots.includes("https://icnc2026.org/sitemap.xml")) {
  throw new Error("robots.txt does not reference the production sitemap.");
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const page of pages) {
  const sitemapPath = page === "index.html" ? "" : page;
  const loc = `https://icnc2026.org/${sitemapPath}`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    throw new Error(`sitemap.xml is missing ${loc}`);
  }
}

console.log("Cloudflare Pages static site verification passed.");
