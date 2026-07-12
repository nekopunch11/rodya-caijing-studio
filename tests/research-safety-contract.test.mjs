import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const productionFiles = [
  "SKILL.md",
  "AGENTS.md",
  "caijing-fundamental/SKILL.md",
  "caijing-earnings/SKILL.md",
  "caijing-valuation/SKILL.md",
  "caijing-risk/SKILL.md",
  "caijing-industry/SKILL.md",
  "caijing-ipo-a/SKILL.md",
  "caijing-ipo-hk/SKILL.md",
  "references/output-spec.md",
  "references/compliance.md",
  "references/formulas-and-thresholds.md",
];
const production = productionFiles.map(read).join("\n");

test("unsafe HK IPO pseudo-precision is absent", () => {
  assert.doesNotMatch(production, /公开发售手数\s*÷\s*\(超购倍数/);
  assert.doesNotMatch(production, /贝叶斯加权（同业 40%/);
  assert.doesNotMatch(production, /最坏情况（破发10%）/);
  assert.doesNotMatch(production, /边际成本≈0 时应打满/);
});

test("HK IPO estimates require observable allocation evidence", () => {
  const hk = read("caijing-ipo-hk/SKILL.md");
  assert.match(hk, /档位中签率.*申请档位.*配售结果/s);
  assert.match(hk, /未经.*样本外验证.*概率校准.*不得输出.*精确.*概率/s);
  assert.match(hk, /18C.*不得.*机制 B/s);
});

test("professional completion uses structural completeness rather than word floors", () => {
  // 不复活字数下限（坏代理）
  assert.doesNotMatch(production, /不得低于\s*4000\s*字/);
  assert.doesNotMatch(production, /默认不少于\s*5000\s*字/);
  const output = read("references/output-spec.md");
  assert.match(output, /分析块覆盖率/);
  assert.match(output, /关键结论证据覆盖率/);
  // 正向：详实靠结构，"薄=未完成"必须明确，防止"短也没关系"退化
  assert.match(output, /全面、详细、完备/);
  assert.match(output, /薄＝未完成|薄=未完成/);
  assert.match(output, /子项覆盖率/);
});

test("shared research safety gate is mandatory", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "references/research-safety-gate.md")));
  assert.match(read("SKILL.md"), /research-safety-gate\.md/);
  for (const rel of productionFiles.filter((rel) => rel.startsWith("caijing-"))) {
    assert.match(read(rel), /research-safety-gate\.md/, `${rel} must load the safety gate directly`);
  }
  const gate = read("references/research-safety-gate.md");
  assert.match(gate, /不决定研究质量/);
  assert.match(gate, /普通研究不询问使用者身份/);
  assert.match(gate, /具体资金、仓位、杠杆或个性化操作建议/);
  assert.match(gate, /免责声明.*不能替代.*合规审查/s);
});
