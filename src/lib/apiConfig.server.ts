import "server-only";
import fs from "fs";
import path from "path";
import { normalizeApiUrl } from "./apiConfig.shared";

const ENV_KEY = "NEXT_PUBLIC_API_URL";

function readFromProcessEnv(): string | null {
  const raw = process.env[ENV_KEY];
  if (raw?.trim()) return normalizeApiUrl(raw);
  return null;
}

/** Parse public/runtime-config.js written by scripts/write-runtime-config.mjs */
function readFromRuntimeConfigFile(): string | null {
  const filePath = path.join(process.cwd(), "public", "runtime-config.js");
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(
    /window\.__NEXT_PUBLIC_API_URL__\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*');/
  );
  if (!match?.[1]) return null;

  try {
    const value = JSON.parse(match[1]) as string;
    if (value?.trim()) return normalizeApiUrl(value);
  } catch {
    return null;
  }
  return null;
}

/**
 * Server (SSR/layout): reads NEXT_PUBLIC_API_URL at runtime from process.env
 * or public/runtime-config.js (Cloud Run entrypoint). Not compile-time inlined.
 */
export function getServerApiUrl(): string {
  const url = readFromProcessEnv() ?? readFromRuntimeConfigFile();
  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not set. Add it to .env or Cloud Run env, and run scripts/write-runtime-config.mjs."
    );
  }
  return url;
}
