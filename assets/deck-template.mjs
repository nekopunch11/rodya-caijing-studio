// 财经内容台 · 投顾内部研究汇报 renderer v1.0
// 唯一执行视觉事实源：references/ppt-visual-spec.md
// 用法：node assets/deck-template.mjs --input deck-data.json --output report.pptx
// 依赖：pptxgenjs。renderer 不依赖 imagegen；visual_asset 只接受已存在的本地图片路径。

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

export const CANONICAL_LAYOUTS = Object.freeze([
  "cover",
  "overview",
  "thesis",
  "fundamental",
  "valuation",
  "risk",
  "disclaimer",
]);
export const OPTIONAL_LAYOUTS = Object.freeze(["pipeline"]);

const ALL_LAYOUTS = new Set([...CANONICAL_LAYOUTS, ...OPTIONAL_LAYOUTS]);
const SANS = "MiSans";
const MONO = "IBM Plex Mono";
const W = 13.333;
const H = 7.5;
const M = 0.72;

const THEME_PRESETS = Object.freeze({
  light: {
    mode: "light",
    surface: "F4F2EE",
    surface_alt: "E8E4DC",
    ink: "171717",
    muted: "6C6A66",
    hairline: "CEC9BF",
    accent: "8B6F47",
    up: "B23A32",
    down: "1F7A5A",
    scrim: "111111",
  },
  dark: {
    mode: "dark",
    surface: "121517",
    surface_alt: "20262A",
    ink: "F4F1EA",
    muted: "A5ADB0",
    hairline: "384146",
    accent: "C19A6B",
    up: "E06A5F",
    down: "52A987",
    scrim: "0B0D0E",
  },
  "media-led": {
    mode: "media-led",
    surface: "EDEBE6",
    surface_alt: "DDD9D1",
    ink: "151719",
    muted: "666B6E",
    hairline: "C5C1B9",
    accent: "58717E",
    up: "B23A32",
    down: "1F7A5A",
    scrim: "101416",
  },
});

function cleanHex(value, fallback) {
  const normalized = String(value ?? "").trim().replace(/^#/, "").toUpperCase();
  return /^[0-9A-F]{6}$/.test(normalized) ? normalized : fallback;
}

export function resolveTheme(input = {}) {
  const mode = Object.hasOwn(THEME_PRESETS, input.mode) ? input.mode : "light";
  const base = THEME_PRESETS[mode];
  const resolved = { mode };
  for (const key of [
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
    resolved[key] = cleanHex(input[key], base[key]);
  }
  if (resolved.accent === resolved.up || resolved.accent === resolved.down) {
    resolved.accent = base.accent;
  }
  return resolved;
}

function normalizeMetric(metric = {}) {
  return {
    label: String(metric.label ?? "").trim(),
    value: String(metric.value ?? "").trim(),
    context: String(metric.context ?? "").trim(),
    direction: ["up", "down", "neutral"].includes(metric.direction)
      ? metric.direction
      : "neutral",
  };
}

function normalizeEvidence(item = {}) {
  return {
    label: String(item.label ?? "").trim(),
    value: String(item.value ?? "").trim(),
    source: String(item.source ?? "").trim(),
    as_of: String(item.as_of ?? "").trim(),
    context: String(item.context ?? "").trim(),
  };
}

export function chooseVisualVariant(slide = {}) {
  const hasMedia = Boolean(
    slide.visual_asset?.path && fs.existsSync(path.resolve(slide.visual_asset.path)),
  );
  return `${slide.type ?? "unknown"}-${hasMedia ? "media" : "no-media"}`;
}

export function normalizeDeck(input = {}) {
  if (!String(input.title ?? "").trim()) throw new Error("deck.title / 研究命题不能为空");
  if (!String(input.subject ?? "").trim()) throw new Error("deck.subject / 标的不能为空");
  if (!String(input.as_of ?? "").trim()) throw new Error("deck.as_of / 数据截至日不能为空");
  if (!Array.isArray(input.slides) || input.slides.length === 0) {
    throw new Error("deck.slides 不能为空");
  }

  const slides = input.slides.map((raw, index) => {
    const type = String(raw.type ?? "").trim();
    if (!ALL_LAYOUTS.has(type)) throw new Error(`slides[${index}].type 不受支持：${type}`);
    const conclusion = String(raw.conclusion ?? "").trim();
    if (!conclusion) throw new Error(`slides[${index}].conclusion / 本页结论不能为空`);
    const visualPath = raw.visual_asset?.path
      ? path.resolve(String(raw.visual_asset.path))
      : "";
    const visual_asset = visualPath && fs.existsSync(visualPath)
      ? {
          path: visualPath,
          alt: String(raw.visual_asset.alt ?? "主题视觉").trim(),
          position: ["left", "right", "full"].includes(raw.visual_asset.position)
            ? raw.visual_asset.position
            : "right",
        }
      : undefined;

    return {
      ...raw,
      type,
      conclusion,
      eyebrow: String(raw.eyebrow ?? "内部研究").trim(),
      body: String(raw.body ?? "").trim(),
      hero_metric: raw.hero_metric ? normalizeMetric(raw.hero_metric) : undefined,
      support_metrics: Array.isArray(raw.support_metrics)
        ? raw.support_metrics.slice(0, 3).map(normalizeMetric)
        : [],
      evidence: Array.isArray(raw.evidence) ? raw.evidence.map(normalizeEvidence) : [],
      pillars: Array.isArray(raw.pillars) ? raw.pillars.slice(0, 4) : [],
      watchlist: Array.isArray(raw.watchlist) ? raw.watchlist.slice(0, 5) : [],
      rows: Array.isArray(raw.rows) ? raw.rows.slice(0, 5) : [],
      visual_asset,
    };
  });

  return {
    title: String(input.title).trim(),
    subject: String(input.subject).trim(),
    as_of: String(input.as_of).trim(),
    market: String(input.market ?? "").trim(),
    author: String(input.author ?? "财经内容台").trim(),
    disclaimer: String(
      input.disclaimer
        ?? "本材料基于公开信息整理，仅供内部研究讨论，不构成任何证券的买卖建议、目标价或收益承诺。市场有风险，决策需谨慎。",
    ).trim(),
    theme: resolveTheme(input.theme),
    slides,
  };
}

function metricColor(metric, theme) {
  if (metric?.direction === "up") return theme.up;
  if (metric?.direction === "down") return theme.down;
  return theme.ink;
}

function sourceLine(slide, deck) {
  const sources = [...new Set(slide.evidence.map((item) => item.source).filter(Boolean))];
  return `${sources.length ? `来源 ${sources.join(" / ")} · ` : ""}截至 ${deck.as_of}`;
}

function addRect(slide, shapes, x, y, w, h, color, transparency = 0) {
  slide.addShape(shapes.RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color, transparency },
    line: { type: "none" },
  });
}

function addRule(slide, shapes, x, y, w, color, width = 0.7) {
  slide.addShape(shapes.LINE, {
    x,
    y,
    w,
    h: 0,
    line: { color, width },
  });
}

function addVerticalRule(slide, shapes, x, y, h, color, width = 0.7) {
  slide.addShape(shapes.LINE, {
    x,
    y,
    w: 0,
    h,
    line: { color, width },
  });
}

function addText(slide, text, options = {}) {
  slide.addText(String(text ?? ""), {
    margin: 0,
    breakLine: false,
    fit: "shrink",
    valign: "mid",
    fontFace: SANS,
    color: options.color,
    ...options,
  });
}

function addHeader(slide, shapes, deck, item, page) {
  addText(slide, item.eyebrow || "内部研究", {
    x: M,
    y: 0.38,
    w: 2.2,
    h: 0.26,
    fontFace: MONO,
    fontSize: 9.5,
    bold: true,
    color: deck.theme.accent,
    charSpacing: 1.4,
  });
  addText(slide, deck.subject, {
    x: 3.15,
    y: 0.38,
    w: 6.2,
    h: 0.26,
    fontFace: MONO,
    fontSize: 9,
    align: "center",
    color: deck.theme.muted,
  });
  addText(slide, `${String(page).padStart(2, "0")} / ${String(deck.slides.length).padStart(2, "0")}`, {
    x: 11.55,
    y: 0.38,
    w: 1.05,
    h: 0.26,
    fontFace: MONO,
    fontSize: 9,
    align: "right",
    color: deck.theme.muted,
  });
  addRule(slide, shapes, M, 0.82, W - M * 2, deck.theme.hairline, 0.6);
}

function addFooter(slide, shapes, deck, item) {
  addRule(slide, shapes, M, 6.91, W - M * 2, deck.theme.hairline, 0.6);
  addText(slide, "财经内容台 · 投顾内部研究", {
    x: M,
    y: 7.04,
    w: 4.0,
    h: 0.19,
    fontFace: MONO,
    fontSize: 8,
    color: deck.theme.muted,
  });
  addText(slide, sourceLine(item, deck), {
    x: 6.0,
    y: 7.04,
    w: 6.6,
    h: 0.19,
    fontFace: MONO,
    fontSize: 8,
    align: "right",
    color: deck.theme.muted,
  });
}

function addMetric(slide, metric, x, y, w, theme, primary = false) {
  if (!metric) return;
  addText(slide, metric.label, {
    x,
    y,
    w,
    h: 0.25,
    fontSize: 10,
    color: theme.muted,
  });
  addText(slide, metric.value, {
    x,
    y: y + 0.28,
    w,
    h: primary ? 0.88 : 0.54,
    fontFace: MONO,
    fontSize: primary ? 48 : 25,
    bold: primary,
    color: metricColor(metric, theme),
  });
  if (metric.context) {
    addText(slide, metric.context, {
      x,
      y: y + (primary ? 1.12 : 0.86),
      w,
      h: 0.27,
      fontSize: 9.5,
      color: theme.muted,
    });
  }
}

function renderCover(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  const hasMedia = Boolean(item.visual_asset);
  if (hasMedia) {
    slide.addImage({
      path: item.visual_asset.path,
      x: 7.75,
      y: 0,
      w: W - 7.75,
      h: H,
      sizing: { type: "cover", w: W - 7.75, h: H },
      altText: item.visual_asset.alt,
    });
    addRect(slide, shapes, 7.75, 0, W - 7.75, H, deck.theme.scrim, 66);
    addRect(slide, shapes, 7.62, 0, 0.13, H, deck.theme.accent);
  } else {
    addRect(slide, shapes, 0.72, 0.8, 0.1, 1.08, deck.theme.accent);
    addRect(slide, shapes, 10.9, 0.82, 1.7, 0.1, deck.theme.accent);
  }
  const contentW = hasMedia ? 6.3 : 11.25;
  addText(slide, item.eyebrow || "内部研究", {
    x: 0.95,
    y: 0.85,
    w: 3.2,
    h: 0.3,
    fontFace: MONO,
    fontSize: 10,
    bold: true,
    charSpacing: 1.8,
    color: deck.theme.accent,
  });
  addText(slide, deck.subject, {
    x: 0.95,
    y: 1.42,
    w: contentW,
    h: 0.36,
    fontFace: MONO,
    fontSize: 13,
    color: deck.theme.muted,
  });
  addText(slide, item.conclusion, {
    x: 0.95,
    y: 2.15,
    w: contentW,
    h: 1.5,
    fontSize: hasMedia ? 38 : 46,
    bold: true,
    color: deck.theme.ink,
    breakLine: true,
    valign: "top",
  });
  addText(slide, item.body || deck.title, {
    x: 0.95,
    y: 4.08,
    w: contentW,
    h: 0.8,
    fontSize: 17,
    color: deck.theme.muted,
    breakLine: true,
    valign: "top",
  });
  addRule(slide, shapes, 0.95, 6.55, contentW, deck.theme.hairline, 0.7);
  addText(slide, `${deck.market ? `${deck.market} · ` : ""}数据截至 ${deck.as_of}`, {
    x: 0.95,
    y: 6.72,
    w: contentW,
    h: 0.26,
    fontFace: MONO,
    fontSize: 9,
    color: deck.theme.muted,
  });
  addText(slide, `${String(page).padStart(2, "0")} / ${String(deck.slides.length).padStart(2, "0")}`, {
    x: 11.55,
    y: 6.72,
    w: 1.05,
    h: 0.26,
    fontFace: MONO,
    fontSize: 9,
    align: "right",
    color: hasMedia ? "E9E5DE" : deck.theme.muted,
  });
}

function renderOverview(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  addHeader(slide, shapes, deck, item, page);
  addText(slide, item.conclusion, {
    x: M,
    y: 1.12,
    w: 11.9,
    h: 0.62,
    fontSize: 29,
    bold: true,
    color: deck.theme.ink,
  });
  const rows = item.rows.length
    ? item.rows
    : item.evidence.map((e) => ({ label: e.label, conclusion: e.context || e.value, metric: e.value, confidence: "" }));
  const y0 = 2.05;
  const widths = [1.55, 6.05, 2.55, 1.25];
  const headers = ["模块", "结论", "主指标", "确定性"];
  let x = M;
  headers.forEach((header, index) => {
    addText(slide, header, {
      x,
      y: y0,
      w: widths[index],
      h: 0.32,
      fontFace: MONO,
      fontSize: 9,
      bold: true,
      color: index === 0 ? deck.theme.accent : deck.theme.muted,
      align: index >= 2 ? "right" : "left",
    });
    x += widths[index];
  });
  addRule(slide, shapes, M, y0 + 0.45, 11.9, deck.theme.ink, 1.0);
  rows.slice(0, 4).forEach((row, index) => {
    const y = y0 + 0.63 + index * 0.82;
    addRule(slide, shapes, M, y + 0.61, 11.9, deck.theme.hairline, 0.6);
    addText(slide, row.label || row.module || "—", { x: M, y, w: widths[0], h: 0.48, fontSize: 14, bold: true, color: deck.theme.ink });
    addText(slide, row.conclusion || row.summary || "—", { x: M + widths[0], y, w: widths[1], h: 0.48, fontSize: 13, color: deck.theme.ink });
    addText(slide, row.metric || row.value || "—", { x: M + widths[0] + widths[1], y, w: widths[2], h: 0.48, fontFace: MONO, fontSize: 14, align: "right", color: deck.theme.ink });
    addText(slide, row.confidence || "—", { x: M + widths[0] + widths[1] + widths[2], y, w: widths[3], h: 0.48, fontFace: MONO, fontSize: 13, align: "right", color: deck.theme.muted });
  });
  addFooter(slide, shapes, deck, item);
}

function renderThesis(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  addHeader(slide, shapes, deck, item, page);
  const hasMedia = Boolean(item.visual_asset);
  const contentW = hasMedia ? 8.15 : 11.9;
  addText(slide, item.conclusion, { x: M, y: 1.1, w: contentW, h: 0.75, fontSize: 30, bold: true, color: deck.theme.ink, valign: "top" });
  if (item.body) addText(slide, item.body, { x: M, y: 1.88, w: contentW, h: 0.58, fontSize: 15, color: deck.theme.muted, valign: "top" });
  const pillars = item.pillars.length ? item.pillars : item.evidence.slice(0, 4);
  const gap = 0.28;
  const colW = (contentW - gap * (pillars.length - 1)) / Math.max(1, pillars.length);
  pillars.forEach((pillar, index) => {
    const x = M + index * (colW + gap);
    if (index > 0) addVerticalRule(slide, shapes, x - gap / 2, 2.72, 3.02, deck.theme.hairline, 0.6);
    addText(slide, String(index + 1).padStart(2, "0"), { x, y: 2.68, w: colW, h: 0.25, fontFace: MONO, fontSize: 9, color: deck.theme.accent });
    addText(slide, pillar.title || pillar.label || "逻辑支柱", { x, y: 3.08, w: colW, h: 0.52, fontSize: 17, bold: true, color: deck.theme.ink, valign: "top" });
    addText(slide, pillar.evidence || pillar.context || pillar.value || "", { x, y: 3.75, w: colW, h: 0.72, fontSize: 12, color: deck.theme.ink, valign: "top" });
    addText(slide, `证伪：${pillar.falsifier || pillar.watch || "待跟踪"}`, { x, y: 5.02, w: colW, h: 0.55, fontSize: 10, color: deck.theme.muted, valign: "top" });
  });
  if (hasMedia) {
    slide.addImage({ path: item.visual_asset.path, x: 9.55, y: 1.18, w: 3.06, h: 4.95, sizing: { type: "cover", w: 3.06, h: 4.95 }, altText: item.visual_asset.alt });
    addRect(slide, shapes, 9.55, 1.18, 3.06, 4.95, deck.theme.scrim, 82);
  }
  addFooter(slide, shapes, deck, item);
}

function renderFundamental(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  addHeader(slide, shapes, deck, item, page);
  const hasMedia = Boolean(item.visual_asset);
  addText(slide, item.conclusion, { x: M, y: 1.08, w: 11.9, h: 0.78, fontSize: 29, bold: true, color: deck.theme.ink, valign: "top" });
  addMetric(slide, item.hero_metric, M, 2.2, 3.55, deck.theme, true);
  addVerticalRule(slide, shapes, 4.55, 2.18, 3.38, deck.theme.hairline, 0.7);
  const rightW = hasMedia ? 4.65 : 7.4;
  addText(slide, item.body || "本页判断由主指标与三个辅助指标共同支撑。", { x: 4.88, y: 2.18, w: rightW, h: 0.78, fontSize: 15, color: deck.theme.ink, valign: "top" });
  item.support_metrics.forEach((metric, index) => addMetric(slide, metric, 4.88 + index * (rightW / 3), 3.28, rightW / 3 - 0.22, deck.theme));
  const watch = item.watchlist[0];
  if (watch) addText(slide, `跟踪重点：${watch.indicator || watch.risk || watch.status}`, { x: 4.88, y: 5.02, w: rightW, h: 0.5, fontSize: 12, color: deck.theme.muted, valign: "top" });
  if (hasMedia) {
    slide.addImage({ path: item.visual_asset.path, x: 9.85, y: 3.0, w: 2.76, h: 2.42, sizing: { type: "cover", w: 2.76, h: 2.42 }, altText: item.visual_asset.alt });
    addRect(slide, shapes, 9.85, 3.0, 2.76, 2.42, deck.theme.scrim, 86);
  }
  addFooter(slide, shapes, deck, item);
}

function renderValuation(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  addHeader(slide, shapes, deck, item, page);
  addText(slide, item.conclusion, { x: M, y: 1.08, w: 11.9, h: 0.78, fontSize: 29, bold: true, color: deck.theme.ink, valign: "top" });
  addMetric(slide, item.hero_metric, M, 2.1, 4.2, deck.theme, true);
  const percent = Math.max(0, Math.min(100, Number(item.hero_metric?.percentile ?? String(item.hero_metric?.value ?? "").replace(/[^0-9.]/g, "")) || 50));
  addRect(slide, shapes, 5.2, 2.68, 7.4, 0.1, deck.theme.hairline);
  addRect(slide, shapes, 5.2, 2.68, 7.4 * (percent / 100), 0.1, deck.theme.accent);
  [0.25, 0.5, 0.75].forEach((tick) => addRect(slide, shapes, 5.2 + 7.4 * tick, 2.56, 0.02, 0.34, deck.theme.muted));
  addRect(slide, shapes, 5.2 + 7.4 * (percent / 100) - 0.09, 2.57, 0.18, 0.32, deck.theme.ink);
  addText(slide, "P25", { x: 5.2, y: 3.02, w: 1.0, h: 0.25, fontFace: MONO, fontSize: 9, color: deck.theme.muted });
  addText(slide, "中位", { x: 8.42, y: 3.02, w: 1.0, h: 0.25, fontFace: MONO, fontSize: 9, align: "center", color: deck.theme.muted });
  addText(slide, "P75", { x: 11.6, y: 3.02, w: 1.0, h: 0.25, fontFace: MONO, fontSize: 9, align: "right", color: deck.theme.muted });
  item.support_metrics.forEach((metric, index) => addMetric(slide, metric, 5.2 + index * 2.5, 3.75, 2.2, deck.theme));
  if (item.body) addText(slide, item.body, { x: M, y: 5.58, w: 11.9, h: 0.52, fontSize: 13, color: deck.theme.muted, valign: "top" });
  addFooter(slide, shapes, deck, item);
}

function renderRisk(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  addHeader(slide, shapes, deck, item, page);
  addText(slide, item.conclusion, { x: M, y: 1.08, w: 11.9, h: 0.72, fontSize: 29, bold: true, color: deck.theme.ink, valign: "top" });
  const widths = [2.35, 2.15, 3.35, 4.05];
  const headers = ["风险", "当前状态", "缓释因子", "可观测指标"];
  let x = M;
  headers.forEach((header, index) => {
    addText(slide, header, { x, y: 2.05, w: widths[index], h: 0.28, fontFace: MONO, fontSize: 9, bold: true, color: index === 0 ? deck.theme.accent : deck.theme.muted });
    x += widths[index];
  });
  addRule(slide, shapes, M, 2.48, 11.9, deck.theme.ink, 1.0);
  item.watchlist.slice(0, 4).forEach((row, index) => {
    const y = 2.7 + index * 0.84;
    addRule(slide, shapes, M, y + 0.62, 11.9, deck.theme.hairline, 0.6);
    let cx = M;
    [row.risk, row.status, row.mitigant, row.indicator].forEach((value, col) => {
      addText(slide, value || "—", { x: cx, y, w: widths[col] - 0.18, h: 0.5, fontSize: col === 0 ? 13 : 11, bold: col === 0, color: deck.theme.ink, valign: "top" });
      cx += widths[col];
    });
  });
  addFooter(slide, shapes, deck, item);
}

function renderDisclaimer(pres, slide, deck, item, page, shapes) {
  const dark = deck.theme.mode === "dark";
  const surface = dark ? deck.theme.surface : deck.theme.surface_alt;
  slide.background = { color: surface };
  addText(slide, item.eyebrow || "内部研究", { x: M, y: 0.62, w: 2.4, h: 0.28, fontFace: MONO, fontSize: 10, bold: true, color: deck.theme.accent, charSpacing: 1.6 });
  addText(slide, item.conclusion, { x: M, y: 1.45, w: 5.4, h: 0.62, fontSize: 31, bold: true, color: deck.theme.ink });
  addRule(slide, shapes, M, 2.34, 11.9, deck.theme.accent, 1.1);
  addText(slide, item.body || deck.disclaimer, { x: M, y: 2.75, w: 10.65, h: 2.1, fontSize: 16, color: deck.theme.ink, breakLine: true, valign: "top", paraSpaceAfterPt: 8 });
  addText(slide, `数据截至 ${deck.as_of} · 来源口径见各页页脚`, { x: M, y: 5.45, w: 7.0, h: 0.3, fontFace: MONO, fontSize: 9.5, color: deck.theme.muted });
  addText(slide, `${String(page).padStart(2, "0")} / ${String(deck.slides.length).padStart(2, "0")}`, { x: 11.55, y: 6.72, w: 1.05, h: 0.26, fontFace: MONO, fontSize: 9, align: "right", color: deck.theme.muted });
}

function renderPipeline(pres, slide, deck, item, page, shapes) {
  slide.background = { color: deck.theme.surface };
  addHeader(slide, shapes, deck, item, page);
  addText(slide, item.conclusion, { x: M, y: 1.08, w: 11.9, h: 0.72, fontSize: 29, bold: true, color: deck.theme.ink, valign: "top" });
  const stages = item.rows.length ? item.rows.slice(0, 4) : item.evidence.slice(0, 4);
  const w = 2.55;
  stages.forEach((stage, index) => {
    const x = M + index * 3.02;
    const weight = Math.max(0.7, Math.min(2.2, Number(stage.weight ?? stage.value ?? 1)));
    addRect(slide, shapes, x, 5.25 - weight, w, weight, index === 1 ? deck.theme.accent : deck.theme.surface_alt);
    addText(slide, stage.label || stage.title || `环节 ${index + 1}`, { x, y: 5.46, w, h: 0.34, fontSize: 15, bold: true, align: "center", color: deck.theme.ink });
    addText(slide, stage.context || stage.conclusion || "", { x, y: 5.86, w, h: 0.5, fontSize: 10, align: "center", color: deck.theme.muted, valign: "top" });
    if (index < stages.length - 1) addText(slide, "→", { x: x + w + 0.12, y: 4.35, w: 0.26, h: 0.3, fontSize: 19, align: "center", color: deck.theme.muted });
  });
  addFooter(slide, shapes, deck, item);
}

const RENDERERS = {
  cover: renderCover,
  overview: renderOverview,
  thesis: renderThesis,
  fundamental: renderFundamental,
  valuation: renderValuation,
  risk: renderRisk,
  disclaimer: renderDisclaimer,
  pipeline: renderPipeline,
};

export function buildPresentation(input, PptxGenJS) {
  const deck = normalizeDeck(input);
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_WIDE";
  pres.author = deck.author;
  pres.subject = deck.subject;
  pres.title = deck.title;
  pres.company = "财经内容台";
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: SANS,
    bodyFontFace: SANS,
    lang: "zh-CN",
  };
  pres.defineSlideMaster({
    title: "RODYA_BLANK",
    background: { color: deck.theme.surface },
    objects: [],
  });

  deck.slides.forEach((item, index) => {
    const slide = pres.addSlide("RODYA_BLANK");
    RENDERERS[item.type](pres, slide, deck, item, index + 1, pres.shapes);
  });
  return pres;
}

export async function writePresentation({ inputPath, outputPath }) {
  const input = JSON.parse(fs.readFileSync(path.resolve(inputPath), "utf8"));
  const require = createRequire(import.meta.url);
  const PptxGenJS = require("pptxgenjs");
  const pres = buildPresentation(input, PptxGenJS);
  await pres.writeFile({ fileName: path.resolve(outputPath) });
}

function parseArgs(argv) {
  const result = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--input") result.inputPath = argv[index + 1];
    if (argv[index] === "--output") result.outputPath = argv[index + 1];
  }
  return result;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.inputPath || !args.outputPath) {
    console.error("用法：node assets/deck-template.mjs --input deck-data.json --output report.pptx");
    process.exitCode = 1;
    return;
  }
  await writePresentation(args);
  console.log(`written ${path.resolve(args.outputPath)}`);
}

const isDirect = process.argv[1]
  && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirect) {
  main().catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  });
}
