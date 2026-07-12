import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

test("fundamental loads one proof-chain source of truth", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "references/fundamental-proof-chain.md")));
  assert.match(read("caijing-fundamental/SKILL.md"), /fundamental-proof-chain\.md/);
});

test("proof chain exposes every reproducible field", () => {
  const proof = read("references/fundamental-proof-chain.md");
  for (const field of [
    "研究问题", "原始数据", "口径调整", "公式或拆解", "计算结果",
    "历史坐标", "同业坐标", "研究判断", "反面证据", "证伪条件",
    "完整", "断裂", "缺失数据",
  ]) assert.match(proof, new RegExp(field), field);
});

test("broken fundamental chains stop qualitative judgments", () => {
  const proof = read("references/fundamental-proof-chain.md");
  const fallback = read("references/data-fallback.md");
  assert.match(proof, /推导链.*断裂.*停止.*定性/s);
  assert.match(fallback, /基本面.*结论证明链.*断裂.*停止.*定性/s);
  assert.doesNotMatch(proof, /断裂.*仍可.*条件性.*偏强/s);
});

test("ten blocks are a floor and framework-outside scanning is mandatory", () => {
  const fundamental = read("caijing-fundamental/SKILL.md");
  const proof = read("references/fundamental-proof-chain.md");
  assert.match(fundamental, /十个分析块.*最低覆盖.*不是.*封闭/s);
  assert.match(proof, /框架外扫描/);
  assert.match(proof, /重要性 Gate/);
});

test("shared schema is mandatory only for fundamental", () => {
  const output = read("references/output-spec.md");
  assert.match(output, /结论证明/);
  assert.match(output, /框架外发现/);
  assert.match(output, /caijing-fundamental.*强制.*其他模块.*可选/s);
});

test("sector adapters may be overridden with a recorded reason", () => {
  const adapters = read("references/sector-adapters.md");
  assert.match(adapters, /证明链路由/);
  assert.match(adapters, /覆盖.*默认.*适配器/s);
  assert.match(adapters, /失真原因.*替代指标.*局限/s);
});

test("docx keeps proof-chain apparatus out of the body and in the appendix", () => {
  const visual = read("references/docx-visual-spec.md");
  const proof = read("references/fundamental-proof-chain.md");
  // 正文是研报叙事，禁止摆证明链字段/装置词
  assert.match(visual, /正文不得出现证明链结构词/);
  assert.match(proof, /正文严禁出现证明链结构词/);
  // 完整证明链集中进附录
  assert.match(visual, /完整证明链集中进附录/);
  assert.match(visual, /附录.*原始数据.*完整同业池.*重复计算/s);
  // 不设自述方法论章节；章节只用中文编号
  assert.match(visual, /不设自述方法论章节/);
  assert.match(visual, /只用中文.*编号.*不加英文 kicker/s);
  assert.match(proof, /不写自述方法论/);
});
