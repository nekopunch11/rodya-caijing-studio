import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const modules = [
  "caijing-fundamental/SKILL.md",
  "caijing-earnings/SKILL.md",
  "caijing-valuation/SKILL.md",
  "caijing-risk/SKILL.md",
  "caijing-industry/SKILL.md",
  "caijing-ipo-a/SKILL.md",
  "caijing-ipo-hk/SKILL.md",
];

test("one professional research core serves every user", () => {
  const root = read("SKILL.md");
  assert.match(root, /使用者身份不决定研究质量/);
  assert.match(root, /同一套专业研究内核/);
  assert.match(root, /普通研究不询问使用者身份/);
});

test("shared conclusion schema separates research judgment from action", () => {
  const output = read("references/output-spec.md");
  for (const field of ["事实摘要", "研究判断", "判断依据", "适用边界", "关键变量", "反面证据", "行动建议"]) {
    assert.match(output, new RegExp(field));
  }
  assert.match(output, /客户合规口径.*保留 `结论\.研究判断`/s);
  assert.match(output, /永久丢弃 `结论\.行动建议`/);
});

test("client-compliant rendering keeps judgment but removes trading actions", () => {
  const compliance = read("references/compliance-rendering.md");
  assert.match(compliance, /不得删除 `结论\.研究判断`/);
  assert.match(compliance, /必须移除/);
  assert.match(compliance, /仓位、金额、股数、融资、杠杆/);
  assert.match(compliance, /研究结论.*判断依据.*适用边界/s);
});

test("audience and artifact are independent", () => {
  const output = read("references/output-spec.md");
  assert.match(output, /受众口径与交付形态彼此独立/);
  assert.match(output, /客户版可以是 docx、卡片\+文案或 PPT/);
  assert.match(read("SKILL.md"), /PPT.*未说明时使用专业研究口径/);
});

test("all seven modules use the new shared conclusion fields", () => {
  for (const rel of modules) {
    const content = read(rel);
    assert.doesNotMatch(content, /结论\.客观概括/, rel);
    assert.doesNotMatch(content, /结论\.专业判断/, rel);
    assert.match(content, /结论\.事实摘要/, rel);
    assert.match(content, /结论\.研究判断/, rel);
  }
});

test("HK IPO separates default research from gated actions", () => {
  const hk = read("caijing-ipo-hk/SKILL.md");
  assert.match(hk, /统一研究模式（默认）/);
  assert.match(hk, /行动顾问模式（按需）/);
  assert.match(hk, /普通 IPO 体检不追问个人资金|不主动追问资金档案/);
  assert.match(hk, /`结论\.行动建议` 仅行动顾问模式可填/);
});
