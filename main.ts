import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const sentence =
  "The night I wanted to quit, my father said nobody remembers how fast you finished, only that you finished — and I have never walked away from anything since.\n";

// Guard the gate: exactly one sentence, 1-200 characters excluding the newline.
const body = sentence.replace(/\n$/, "");
if (body.length < 1 || body.length > 200) {
  throw new Error(`sentence length ${body.length} outside 1-200`);
}
if ((body.match(/\./g) ?? []).length > 1) {
  throw new Error("more than one sentence");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, sentence, "utf8");
chmodSync(outPath, 0o644);
