import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "committee.html",
  "call-for-papers.html",
  "submission.html",
  "publication.html",
  "program.html",
  "contact.html",
  "styles.css",
  "script.js",
  "_headers",
  "_redirects",
  "wrangler.toml"
];

for (const file of requiredFiles) {
  await access(path.join(root, file));
}

const files = await readdir(root);
const htmlFiles = files.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const content = await readFile(path.join(root, file), "utf8");
  if (!content.includes('href="styles.css"')) {
    throw new Error(`${file} does not reference styles.css`);
  }
  if (!content.includes('src="script.js"')) {
    throw new Error(`${file} does not reference script.js`);
  }
}

console.log(`Verified ${requiredFiles.length} required files and ${htmlFiles.length} HTML pages.`);
