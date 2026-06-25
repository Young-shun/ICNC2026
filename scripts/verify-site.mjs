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

const requiredFiles = [...pages, "styles.css", "script.js", "_headers", "_redirects", "wrangler.toml"];
const missing = requiredFiles.filter((file) => !existsSync(join(root, file)));

if (missing.length > 0) {
  throw new Error(`Missing required files: ${missing.join(", ")}`);
}

const linkPattern = /href="([^"]+\.html)"/g;
const brokenLinks = [];

for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
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

console.log("Cloudflare Pages static site verification passed.");
