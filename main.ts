// The Painfully Honest Out-of-Office
// make.fun competition: u-po-pu-the-painfully-honest-out-of-office-63e7ca0b
//
// Writes one out-of-office email auto-reply — a single sentence of at most
// 200 characters, painfully honest about the inbox and still polite enough
// for a manager to let it stand — to /output/entry.txt.
//
// The line: the sender admits the private truth that replies are triaged by
// guilt, not by priority. The twist lands in the last words
// ("how guilty each sender makes me feel"), the narrator is the butt of the
// joke, and nothing in the setup explains the joke — the reader does the work.
//
// Node 22, standard library only, deterministic, no network, no environment
// reads: the same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I'm away until Monday, and your email joins the unread pile I answer strictly in order of how guilty each sender makes me feel.";

const OUTPUT_PATH = "/output/entry.txt";

function writeEntry(path: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, ENTRY, "utf8");
}

function main(): void {
  // Guard the gate before writing: one sentence, 1-200 chars, not blank.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, gate needs 1-200`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.split(/[.!?]/).filter(Boolean).length !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
  try {
    writeEntry(OUTPUT_PATH);
  } catch {
    // Local runs without a writable /output (the grader always provides one):
    // keep the exact same bytes, written next to the working directory.
    writeEntry(join(process.cwd(), "output", "entry.txt"));
  }
}

main();
