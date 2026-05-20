/**
 * Removes Turbopack/Next dev caches (fixes stale chunks like [root-of-the-server]__*.js).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  path.join(appRoot, ".next"),
  path.join(appRoot, "node_modules", ".cache"),
];

for (const dir of targets) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`[clean] removed ${dir}`);
  }
}
