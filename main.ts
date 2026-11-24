// One Line of Earned Pride — entry program.
//
// Writes a single line of text to /output/entry.txt: a quiet, earned
// moment of pride for someone in a scene. One line, 137 characters,
// no trailing newline. Runs fully offline: only node:fs, no network,
// no randomness, no clock.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "After eleven years of night shifts, she folded her uniform for the last time, set it on the chair, and walked out into the morning light.";

// The entry is a single line: 137 characters, 1-240 per the gate,
// ASCII only per the build spec (100-160 chars, one line).
const line = ENTRY.trim();
if (!/^[\x20-\x7e]+$/.test(line)) {
  throw new Error("entry must be printable ASCII");
}
if (line.length < 1 || line.length > 240) {
  throw new Error(`entry length ${line.length} outside gate 1-240`);
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`wrote /output/entry.txt (${line.length} chars)`);
