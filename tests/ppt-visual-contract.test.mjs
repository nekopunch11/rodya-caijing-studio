import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const requiredLayouts = [
  "cover",
  "overview",
  "thesis",
  "fundamental",
  "valuation",
  "risk",
  "disclaimer",
];

test("execution sources point to references/ppt-visual-spec.md", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "references/ppt-visual-spec.md")));
  assert.match(read("SKILL.md"), /references\/ppt-visual-spec\.md/);
  assert.match(read("references/output-spec.md"), /ppt-visual-spec\.md/);
});

test("docs design record is not an execution dependency", () => {
  for (const rel of ["SKILL.md", "AGENTS.md", "references/output-spec.md"]) {
    assert.doesNotMatch(read(rel), /docs\/superpowers/);
  }
});

test("pptx renderer exposes adaptive pure functions", async () => {
  const source = read("assets/deck-template.mjs");
  assert.match(source, /export const CANONICAL_LAYOUTS/);
  assert.match(source, /export function resolveTheme/);
  assert.match(source, /export function chooseVisualVariant/);

  const mod = await import(pathToFileURL(path.join(ROOT, "assets/deck-template.mjs")));
  assert.deepEqual(mod.CANONICAL_LAYOUTS, requiredLayouts);
  assert.equal(mod.resolveTheme({ mode: "light", accent: "7A5C3E" }).accent, "7A5C3E");
  assert.notEqual(mod.resolveTheme({ mode: "light" }).accent, mod.resolveTheme({ mode: "dark" }).accent);
  assert.equal(mod.chooseVisualVariant({ type: "cover" }), "cover-no-media");
  assert.equal(
    mod.chooseVisualVariant({
      type: "cover",
      visual_asset: { path: path.join(ROOT, "assets", "logo.svg") },
    }),
    "cover-media",
  );
  assert.notEqual(mod.resolveTheme({ mode: "light" }).accent, mod.resolveTheme({ mode: "light" }).up);
  assert.notEqual(mod.resolveTheme({ mode: "light" }).accent, mod.resolveTheme({ mode: "light" }).down);
});

test("normalizeDeck validates order and removes unavailable media", async () => {
  const source = read("assets/deck-template.mjs");
  assert.match(source, /export function normalizeDeck/);
  const mod = await import(pathToFileURL(path.join(ROOT, "assets/deck-template.mjs")));
  const slides = requiredLayouts.map((type, index) => ({
    type,
    conclusion: index === 0 ? "研究命题" : `${type} 结论`,
    visual_asset: index === 0 ? { path: path.join(ROOT, "missing-hero.png") } : undefined,
  }));
  const normalized = mod.normalizeDeck({
    title: "研究命题",
    subject: "演示标的 / DEMO",
    as_of: "2026-07-10",
    theme: { mode: "light" },
    slides,
  });
  assert.deepEqual(normalized.slides.map((slide) => slide.type), requiredLayouts);
  assert.equal(normalized.slides[0].visual_asset, undefined);
  assert.throws(
    () =>
      mod.normalizeDeck({
        title: "x",
        subject: "演示标的",
        as_of: "2026-07-10",
        slides: [{ type: "cover" }],
      }),
    /conclusion|结论/i,
  );
});

test("HTML renderer shares schema, tokens and layout types", () => {
  const html = read("assets/template-deck.html");
  for (const token of [
    "surface",
    "surface_alt",
    "ink",
    "muted",
    "hairline",
    "accent",
    "up",
    "down",
    "scrim",
  ]) {
    assert.match(html, new RegExp(token));
  }
  for (const layout of requiredLayouts) {
    assert.match(
      html,
      new RegExp(`data-layout=["']${layout}["']|["']?type["']?\\s*:\\s*["']${layout}["']`),
    );
  }
  assert.match(html, /id=["']deck-data["']/);
  assert.match(html, /visual_asset/);
  assert.match(html, /no-media/);
});

test("renderers contain no fixed sample company", () => {
  for (const rel of ["assets/deck-template.mjs", "assets/template-deck.html"]) {
    assert.doesNotMatch(read(rel), /宁德时代|300750/);
  }
});

test("pptx renderer owns exactly one visible page-number system", () => {
  assert.doesNotMatch(read("assets/deck-template.mjs"), /slideNumber\s*:\s*\{/);
});
