/**
 * Writes public/runtime-config.js from NEXT_PUBLIC_API_URL.
 * Use --allow-missing during Docker image build when URL is set only at Cloud Run runtime.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const outPath = path.join(appRoot, "public", "runtime-config.js");
const allowMissing = process.argv.includes("--allow-missing");

/** Read NEXT_PUBLIC_API_URL from .env (wins over stale shell env in local dev). */
function readApiUrlFromDotEnv() {
  const envPath = path.join(appRoot, ".env");
  if (!fs.existsSync(envPath)) return null;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (!trimmed.startsWith("NEXT_PUBLIC_API_URL=")) continue;
    let val = trimmed.slice("NEXT_PUBLIC_API_URL=".length).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (val) return val;
  }
  return null;
}

const raw = (readApiUrlFromDotEnv() ?? process.env.NEXT_PUBLIC_API_URL)?.trim();

if (!raw) {
  if (allowMissing) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, 'window.__NEXT_PUBLIC_API_URL__="";\n', "utf8");
    console.warn(
      "[runtime-config] NEXT_PUBLIC_API_URL not set at build — placeholder written; entrypoint will set it at container start"
    );
    process.exit(0);
  }
  console.error("[runtime-config] NEXT_PUBLIC_API_URL is required (env, .env, or Docker --build-arg)");
  process.exit(1);
}

const apiUrl = raw.replace(/\/+$/, "");
const content = `window.__NEXT_PUBLIC_API_URL__=${JSON.stringify(apiUrl)};\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, "utf8");

console.log(`[runtime-config] wrote ${outPath}`);
