import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One code review comment: approves the PR, carries quiet existential dread.
const ENTRY =
  "Approved. It works, the tests pass, and I have made my peace with whatever this becomes in six months.";

// Gate: single line, 1-140 characters, not only whitespace.
if (!ENTRY || ENTRY.trim().length === 0) {
  throw new Error("entry must not be empty");
}
if (ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} characters, over the 140 limit`);
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} chars)`);
