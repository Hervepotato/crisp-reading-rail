import {
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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
  it("copies runtime artifacts and replaces only the owned asset tree", () => {
    const vault = mkdtempSync(resolve(tmpdir(), "crisp-reading-rail-"));
    temporaryDirectories.push(vault);
    mkdirSync(resolve(vault, ".obsidian"));
    const destination = resolve(vault, ".obsidian/plugins/crisp-reading-rail");
    mkdirSync(resolve(destination, "assets"), { recursive: true });
    writeFileSync(resolve(destination, "assets/stale.svg"), "stale");
    writeFileSync(resolve(destination, "data.json"), '{"orbStyle":"gear"}');

    const result = spawnSync(process.execPath, [script, vault], {
      cwd: projectRoot,
      encoding: "utf8",
    });
    expect(result.status, result.stderr).toBe(0);

    expect(readdirSync(destination).sort()).toEqual([
      "assets",
      "data.json",
      "main.js",
      "manifest.json",
      "styles.css",
    ]);
    for (const artifact of ["main.js", "manifest.json", "styles.css"]) {
      expect(readFileSync(resolve(destination, artifact))).toEqual(
        readFileSync(resolve(projectRoot, artifact)),
      );
    }
    expect(readFileSync(resolve(destination, "data.json"), "utf8")).toBe(
      '{"orbStyle":"gear"}',
    );
    expect(existsSync(resolve(destination, "assets/stale.svg"))).toBe(false);
    const sourceAssets = readdirSync(resolve(projectRoot, "assets")).sort();
    expect(readdirSync(resolve(destination, "assets")).sort()).toEqual(sourceAssets);
    for (const asset of sourceAssets) {
      expect(readFileSync(resolve(destination, "assets", asset))).toEqual(
        readFileSync(resolve(projectRoot, "assets", asset)),
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
