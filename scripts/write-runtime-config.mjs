/**
 * Runs at container start (Cloud Run). Writes public/runtime-config.js from
 * NEXT_PUBLIC_API_URL so the browser always gets the live env value.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const outPath = path.join(appRoot, "public", "runtime-config.js");

const raw =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  process.env.BACKEND_URL ||
  "";

const apiUrl = raw.trim().replace(/\/+$/, "") || "http://localhost:5000";

const content = `window.__NEXT_PUBLIC_API_URL__=${JSON.stringify(apiUrl)};\n`;
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, "utf8");

console.log(`[runtime-config] API base URL: ${apiUrl}`);
