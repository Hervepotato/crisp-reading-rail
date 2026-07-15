import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const script = resolve(projectRoot, "scripts/deploy.mjs");
const temporaryDirectories: string[] = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    rmSync(directory, { force: true, recursive: true });
  }
});

describe("deploy script", () => {
  it("copies exactly the three Obsidian runtime artifacts", () => {
    const vault = mkdtempSync(resolve(tmpdir(), "crisp-reading-rail-"));
    temporaryDirectories.push(vault);
    mkdirSync(resolve(vault, ".obsidian"));

    const result = spawnSync(process.execPath, [script, vault], {
      cwd: projectRoot,
      encoding: "utf8",
    });
    expect(result.status, result.stderr).toBe(0);

    const destination = resolve(vault, ".obsidian/plugins/crisp-reading-rail");
    expect(readdirSync(destination).sort()).toEqual([
      "main.js",
      "manifest.json",
      "styles.css",
    ]);
    for (const artifact of readdirSync(destination)) {
      expect(readFileSync(resolve(destination, artifact))).toEqual(
        readFileSync(resolve(projectRoot, artifact)),
      );
    }
  });

  it("rejects a path that is not an Obsidian vault", () => {
    const directory = mkdtempSync(resolve(tmpdir(), "crisp-reading-rail-invalid-"));
    temporaryDirectories.push(directory);
    const result = spawnSync(process.execPath, [script, directory], {
      cwd: projectRoot,
      encoding: "utf8",
    });
    expect(result.status).not.toBe(0);
  });
});
