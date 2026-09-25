/** Relatório do bundle (@next/bundle-analyzer precisa do webpack). */
import { spawnSync } from "node:child_process";

const r = spawnSync("npx", ["next", "build", "--webpack"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, ANALYZE: "true" },
});
process.exit(r.status ?? 1);
