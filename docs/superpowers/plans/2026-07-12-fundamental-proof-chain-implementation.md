# Fundamental Proof-Chain Protocol Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `caijing-fundamental` 升级为默认完整推导、断链停止定性、可发现框架外重大事项的基本面研究模块。

**Architecture:** 新增基本面专属证明协议作为唯一事实源，`SKILL.md` 只负责强制加载和流程编排；共享 schema、行业适配、公式、数据降级和 DOCX 规范提供兼容支撑。所有规则先由 Node 合同测试定义，再逐文件实现，最后同步唯一 Codex 运行副本。

**Tech Stack:** Markdown Skill 规范、Node.js `node:test`、Git、Codex Skill 运行副本。

## Global Constraints

- 十个分析块是最低覆盖，不是封闭框架。
- 所有基本面专业版默认完整推导，不设置深浅双档。
- 推导链断裂时，受影响结论停止定性；事实、断点和补数要求仍保留。
- 正文展示决定结论的关键推导；明细底稿、重复计算和完整同业池进入附录。
- 新字段对其他模块兼容可选，只对 `caijing-fundamental` 强制。
- 不建设全行业自动计算引擎，不改变其他六个模块的默认输出。
- 不修改 GitHub About，不公开或替换样张。
- 不在 `~/.codex/skills/` 下创建包含 `SKILL.md` 的备份目录。

---

## File Map

- Create: `references/fundamental-proof-chain.md` — 基本面结论证明、断链 Gate、框架外扫描的唯一执行事实源。
- Create: `tests/fundamental-proof-chain-contract.test.mjs` — 防止规则回退的合同测试。
- Modify: `caijing-fundamental/SKILL.md` — 加载协议并把证明链嵌入取数、分析、渲染和验收流程。
- Modify: `references/output-spec.md` — 增加兼容的 `结论证明[]` 与 `框架外发现[]` schema。
- Modify: `references/data-fallback.md` — 增加基本面专属断链停止定性的覆盖规则。
- Modify: `references/sector-adapters.md` — 增加行业证明链路由和适配器覆盖纪律。
- Modify: `references/formulas-and-thresholds.md` — 增加稳定可复算公式与利润桥恒等关系。
- Modify: `references/docx-visual-spec.md` — 规定正文关键推导和附录底稿分工。
- Modify: `docs/modules/caijing-fundamental.md` — 同步面向人的能力说明。
- Modify: `docs/references.md` — 登记新共享事实源及优先级。
- Sync: `C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\rodya-caijing-studio\` — 验证通过后覆盖唯一运行副本。

---

### Task 1: Define the Contract in a Failing Test

**Files:**
- Create: `tests/fundamental-proof-chain-contract.test.mjs`

**Interfaces:**
- Consumes: existing `read(rel)` testing pattern.
- Produces: seven contract tests that later tasks must satisfy.

- [ ] **Step 1: Create the failing contract test**

```js
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

test("docx separates decisive derivation from calculation workpapers", () => {
  const visual = read("references/docx-visual-spec.md");
  assert.match(visual, /正文.*决定结论.*关键推导/s);
  assert.match(visual, /附录.*原始数据.*完整同业池.*重复计算/s);
});
```

- [ ] **Step 2: Run the new test and verify RED**

Run:

```powershell
node --test tests/fundamental-proof-chain-contract.test.mjs
```

Expected: 7 tests run; failures mention missing `references/fundamental-proof-chain.md` and absent schema/rules.

- [ ] **Step 3: Commit the RED contract**

```powershell
git add tests/fundamental-proof-chain-contract.test.mjs
git commit -m "test: define fundamental proof-chain contract"
```

---

### Task 2: Add the Proof-Chain Source of Truth

**Files:**
- Create: `references/fundamental-proof-chain.md`

**Interfaces:**
- Consumes: `references/data-sourcing.md`, `references/data-fallback.md`, `references/sector-adapters.md`.
- Produces: the terms and gates referenced by the module, schema, renderer and tests.

- [ ] **Step 1: Write the execution reference with these exact sections**

```markdown
# 基本面结论证明协议

## 一、适用范围

本文件是 `caijing-fundamental` 判断性结论的唯一证明规则。十个分析块是最低覆盖，不是封闭框架。

## 二、判断性结论识别

含“强、弱、改善、恶化、领先、落后、可持续、存在护城河、资本回报有效、成长质量高”等定性的命题必须建立证明链。纯事实可以不计算，但必须带来源、口径和截至日。

## 三、结论证明链

研究问题 → 原始数据 → 口径调整 → 公式或拆解 → 计算结果 → 历史坐标 → 同业坐标 → 研究判断 → 反面证据 → 证伪条件。

每条链必须记录：关联分析块、来源等级、状态（完整/断裂）、断点和缺失数据。

## 四、结论 Gate

只有状态为“完整”的链可以输出研究判断。推导链状态为“断裂”时，停止对受影响事项下定性结论；只保留已核实事实、断点、缺失数据、受影响结论和替代观察指标。不得用条件性“偏强/偏弱”维持结论完整感。

## 五、框架外扫描

强制检查异常资产负债/收入结构、未被解释的利润来源、会计或监管失真、新业务/诉讼/关联交易/技术路线/资本动作，以及财务数据与商业现实不匹配。

## 六、重要性 Gate

事项若可能改变收入利润现金流、资本结构控制权或每股价值、护城河或逻辑支柱、常规指标有效性，或被公司/审计/监管列为重大事项，则新增正文分析块；否则进入附录观察清单。

## 七、行业适配器覆盖

允许覆盖默认适配器，但必须写明默认指标失真原因、替代指标、替代指标如何连接结论及其局限。

## 八、正文与附录

正文展示决定结论的关键推导；附录保存原始数据、口径调整、完整同业池、重复计算、来源页码、断裂链和补数清单。

## 九、首页反向审查

首页每一句判断必须能定位到完整证明链。无法反查的判断删除或降级为事实。

## 十、完成自检

判断性结论证明覆盖率 100%；强判断断裂链为 0；关键计算可复算；框架外扫描已记录；行业适配器采用或覆盖理由已披露。
```

- [ ] **Step 2: Run the focused tests**

Run: `node --test tests/fundamental-proof-chain-contract.test.mjs`

Expected: the source-of-truth and field tests pass; integration tests still fail.

- [ ] **Step 3: Commit**

```powershell
git add references/fundamental-proof-chain.md
git commit -m "feat: add fundamental proof-chain protocol"
```

---

### Task 3: Enforce the Protocol in the Fundamental Workflow

**Files:**
- Modify: `caijing-fundamental/SKILL.md`
- Modify: `references/data-fallback.md`

**Interfaces:**
- Consumes: `references/fundamental-proof-chain.md`.
- Produces: a module workflow that cannot mark broken judgments complete.

- [ ] **Step 1: Add the new reference to the mandatory read list**

Insert after `research-methods.md`:

```markdown
执行任何判断性结论前必须读 `../references/fundamental-proof-chain.md`；该文件是结论推导、框架外扫描与断链 Gate 的唯一事实源。
```

- [ ] **Step 2: Replace the analysis-framework heading and completion language**

Use:

```markdown
## 二、分析框架（十个分析块是最低覆盖，不是封闭框架）

完成十个分析块后仍必须执行 `fundamental-proof-chain.md` 的框架外扫描。发现通过重要性 Gate 的特殊事项时，新增第十一项及后续动态分析块，不得硬塞进既有章节。
```

- [ ] **Step 3: Add the proof-chain requirements to the internal schema**

Insert in “内核字段”:

```markdown
- `研究方法.结论证明`：所有判断性结论各绑定一条证明链；状态为“断裂”时 `研究判断` 必须留空，并列断点与缺失数据。
- `研究方法.框架外发现`：记录扫描结果、重要性命中项、处理位置和关联证明链；没有重大事项也要记录“已扫描，未发现通过重要性 Gate 的事项”。
```

- [ ] **Step 4: Rewrite the workflow into proof-first order**

The seven steps must explicitly be:

```markdown
1. 识别公司类型和行业适配器；先读年报、最新财报、审计意见、重大公告与管理层讨论，记录异常结构。
2. 以十个分析块建立基础研究问题，执行框架外扫描并补充公司特有问题。
3. 收集带来源等级、口径、截至日和页码的原始数据。
4. 对所有判断性命题建立结论证明链，执行断链 Gate。
5. 生成唯一结构化内核：关键推导进正文，底稿与断裂链进附录。
6. 从首页逐句反查证明链；无法反查的判断删除或降为事实。
7. 渲染、合规检查与交付；报告判断覆盖率、断裂链数量、框架外扫描状态和数据缺口。
```

- [ ] **Step 5: Add the module-specific fallback override**

Append to `references/data-fallback.md`:

```markdown
## 基本面结论证明链专属覆盖

`caijing-fundamental` 执行 `fundamental-proof-chain.md` 时采用更严格规则：结论证明链断裂，停止对受影响事项下定性结论。可以保留事实、断点、缺失数据和替代观察指标，但不得继续输出条件性“偏强/偏弱”。本规则只覆盖基本面判断性结论，不改变其他模块既有的条件性判断规则。
```

- [ ] **Step 6: Run focused tests and commit**

Run: `node --test tests/fundamental-proof-chain-contract.test.mjs`

Expected: module loading, floor-not-ceiling and broken-chain tests pass.

```powershell
git add caijing-fundamental/SKILL.md references/data-fallback.md
git commit -m "feat: enforce proof-first fundamental workflow"
```

---

### Task 4: Extend the Shared Schema Without Changing Other Modules

**Files:**
- Modify: `references/output-spec.md`

**Interfaces:**
- Consumes: proof-chain field names.
- Produces: renderer-facing schema shared by professional DOCX and future artifacts.

- [ ] **Step 1: Add these fields under `研究方法`**

```yaml
  结论证明:            # caijing-fundamental 强制；其他模块可选
    - 研究问题: ""
      关联分析块: ""
      原始数据: []
      口径调整: ""
      公式或拆解: ""
      计算结果: ""
      历史坐标: ""
      同业坐标: ""
      研究判断: ""
      反面证据: []
      证伪条件: []
      状态: "完整|断裂"
      断点: ""
      缺失数据: []
  框架外发现:          # caijing-fundamental 强制扫描；其他模块可选
    - 事项: ""
      触发证据: ""
      标准框架未覆盖原因: ""
      重要性命中项: []
      处理: "新增正文分析块|附录观察"
      关联证明链: ""
      对原结论影响: ""
```

- [ ] **Step 2: Add the compatibility rule immediately below the schema**

```markdown
`caijing-fundamental` 必须填充 `研究方法.结论证明` 并记录 `研究方法.框架外发现` 扫描结果；其他模块可选，不因本次升级改变既有默认工作流。
```

- [ ] **Step 3: Run response and proof-chain tests**

Run:

```powershell
node --test tests/response-contract.test.mjs tests/fundamental-proof-chain-contract.test.mjs
```

Expected: both suites pass.

- [ ] **Step 4: Commit**

```powershell
git add references/output-spec.md
git commit -m "feat: add proof-chain fields to research schema"
```

---

### Task 5: Add Industry Routes and Stable Formula Support

**Files:**
- Modify: `references/sector-adapters.md`
- Modify: `references/formulas-and-thresholds.md`

**Interfaces:**
- Consumes: proof-chain `公式或拆解`, `历史坐标`, `同业坐标` fields.
- Produces: industry-specific default chains and reproducible calculation vocabulary.

- [ ] **Step 1: Add a “证明链路由” table**

```markdown
## 证明链路由

| 公司类型 | 默认经营桥 | 价值/质量验证 |
|---|---|---|
| 制造业 | 销量 × ASP × 产品结构；材料/制造成本；产能利用率 | 单位毛利、资本开支、增量产能回报 |
| 消费/零售 | 店数/销量 × 客单；同店；渠道和库存 | 店效、费用率、现金转换 |
| 软件/平台 | 用户 × 留存 × ARPU；获客与服务成本 | LTV/CAC、回收期、经营杠杆 |
| 银行 | 生息资产 × 净息差；手续费；信用成本 | 不良生成、拨备、资本充足率、ROE |
| 保险 | NBV、承保利润、投资收益 | 偿付能力、资本生成、股东回报 |
| 研发型公司 | 技术/临床里程碑 × 商业化概率；现金消耗 | runway、融资稀释、里程碑兑现 |

允许覆盖默认适配器，但必须记录：默认指标失真原因、替代指标、替代指标如何连接研究判断、替代方法局限。
```

- [ ] **Step 2: Add stable formulas with explicit limitations**

```markdown
## 基本面证明链稳定公式

- 收入桥恒等关系：收入变化 = 数量变化 + 价格变化 + 产品/业务结构变化 + 并表/口径变化；无法取得分项时只列已核实项，不将残差命名为某一驱动。
- 毛利桥：毛利变化 = 收入变化影响 + 单位售价影响 + 单位成本影响 + 产品/业务结构影响；披露不足时保留未解释残差。
- 杜邦：ROE = 净利率 × 总资产周转率 × 权益乘数；分子分母必须使用一致的平均口径。
- 现金覆盖：经营现金流 ÷ 同口径净利润；同时检查营运资本、票据、保理和季节性。
- CAGR：`(期末值 / 期初值)^(1 / 年数) - 1`；期初为负或跨越零值时禁用。
- 同业分位：先固定同业池和会计口径，再计算 P25/Median/P75；样本少于 4 家时展示排序和原值，不输出伪精确四分位。

以上公式只提供可复算关系，不自动产生“强/弱”判断；判断仍须完成历史、同业、反面证据与证伪条件。
```

- [ ] **Step 3: Run focused tests and commit**

Run: `node --test tests/fundamental-proof-chain-contract.test.mjs tests/research-safety-contract.test.mjs`

Expected: both suites pass.

```powershell
git add references/sector-adapters.md references/formulas-and-thresholds.md
git commit -m "feat: add industry proof routes and stable formulas"
```

---

### Task 6: Make the Derivation Visible in DOCX and Human Docs

**Files:**
- Modify: `references/docx-visual-spec.md`
- Modify: `docs/modules/caijing-fundamental.md`
- Modify: `docs/references.md`

**Interfaces:**
- Consumes: structured `结论证明[]` and `框架外发现[]`.
- Produces: a consistent report rendering contract and discoverable human documentation.

- [ ] **Step 1: Add the DOCX rendering section**

```markdown
## 结论推导与计算底稿

- 正文必须展示决定结论的关键推导：研究问题、核心原始数据、必要口径调整、公式/拆解、历史与同业坐标、研究判断、反面证据和证伪条件。
- 附录必须展示原始数据、来源页码、完整同业池及纳入/排除理由、口径调整表、重复计算、断裂链和补数清单。
- 首页研究判断使用证明链编号，例如 `[P-03]`；正文和附录使用同一编号，保证反向复核。
- 断裂链标为“未完成推导”，使用中性灰，不使用红色警报视觉，也不得在首页保留对应定性结论。
```

- [ ] **Step 2: Update the fundamental human doc**

Add two bullets under “核心优点”:

```markdown
- 所有判断性结论默认展示可复算的证据链，不再只给结果表；推导断裂时停止对受影响事项定性。
- 十个分析块是最低覆盖，完成后仍执行框架外扫描；特殊公司可以新增研究问题并覆盖默认行业适配器，但必须说明理由和局限。
```

- [ ] **Step 3: Register the new reference in `docs/references.md`**

Add to the table:

```markdown
| `fundamental-proof-chain.md` | 基本面结论证明协议：判断识别、完整推导、断链 Gate、框架外扫描、重要性 Gate 和正文/附录分工 | 执行 `caijing-fundamental` 时必读 |
```

Place `fundamental-proof-chain.md` after `research-safety-gate.md` in the documented priority order for fundamental analysis, while retaining safety and compliance as higher-priority constraints.

- [ ] **Step 4: Run focused tests and commit**

Run: `node --test tests/fundamental-proof-chain-contract.test.mjs`

Expected: 7/7 pass.

```powershell
git add references/docx-visual-spec.md docs/modules/caijing-fundamental.md docs/references.md
git commit -m "docs: expose fundamental derivation and flexibility rules"
```

---

### Task 7: Full Regression, Skill Validation, and Runtime Sync

**Files:**
- Verify: all source files above.
- Sync: source project to the single installed runtime copy.

**Interfaces:**
- Consumes: the complete upgraded project.
- Produces: a validated source tree and byte-identical runtime files.

- [ ] **Step 1: Run every Node contract test**

```powershell
$tests = Get-ChildItem -LiteralPath '.\tests' -Filter '*.test.mjs' | Sort-Object Name | Select-Object -ExpandProperty FullName
node --test $tests
```

Expected: all existing 20 tests plus 7 new proof-chain tests pass; 0 failures.

- [ ] **Step 2: Run Skill structural validation**

```powershell
python "C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\.system\skill-creator\scripts\quick_validate.py" "."
```

Expected: validation succeeds with no frontmatter or naming errors.

- [ ] **Step 3: Run regression scans**

```powershell
rg -n "条件性.*偏强|条件性.*偏弱" references/fundamental-proof-chain.md caijing-fundamental/SKILL.md references/data-fallback.md
rg -n "十个分析块.*完成.*无需|只有结果表" caijing-fundamental/SKILL.md references/fundamental-proof-chain.md
git diff --check
```

Expected: first two searches return no prohibited matches; `git diff --check` returns no output.

- [ ] **Step 4: Sync only production files to the runtime copy**

Copy these relative paths to `C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\rodya-caijing-studio\`:

```text
caijing-fundamental/SKILL.md
references/fundamental-proof-chain.md
references/output-spec.md
references/data-fallback.md
references/sector-adapters.md
references/formulas-and-thresholds.md
references/docx-visual-spec.md
docs/modules/caijing-fundamental.md
docs/references.md
```

Use `Copy-Item -Force` with the destination directory created only when missing. Do not create a backup under `~/.codex/skills/`.

- [ ] **Step 5: Verify source/runtime hashes**

```powershell
$rels = @(
  'caijing-fundamental\SKILL.md',
  'references\fundamental-proof-chain.md',
  'references\output-spec.md',
  'references\data-fallback.md',
  'references\sector-adapters.md',
  'references\formulas-and-thresholds.md',
  'references\docx-visual-spec.md',
  'docs\modules\caijing-fundamental.md',
  'docs\references.md'
)
$src = (Get-Location).Path
$dst = 'C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\rodya-caijing-studio'
$rels | ForEach-Object {
  $a = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $src $_)).Hash
  $b = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $dst $_)).Hash
  if ($a -ne $b) { throw "Hash mismatch: $_" }
}
```

Expected: command exits without error.

- [ ] **Step 6: Commit any final validation-only adjustment**

If no adjustment was required, do not create an empty commit. Otherwise:

```powershell
git add caijing-fundamental/SKILL.md references/fundamental-proof-chain.md references/output-spec.md references/data-fallback.md references/sector-adapters.md references/formulas-and-thresholds.md references/docx-visual-spec.md docs/modules/caijing-fundamental.md docs/references.md tests/fundamental-proof-chain-contract.test.mjs
git commit -m "test: finalize fundamental proof-chain validation"
```

---

### Task 8: Update Vault State After Production Validation

**Files:**
- Modify: `D:\AI\RodyaVault\00_System\Current_Status.md`
- Modify: `D:\AI\RodyaVault\00_System\AI_Change_Queue.md`
- Modify: `D:\AI\RodyaVault\90_Archive\AI_Change_Queue_Archive.md`

**Interfaces:**
- Consumes: passing tests, commit hashes and runtime hash verification.
- Produces: durable cross-session handoff.

- [ ] **Step 1: Add a dated Current_Status result**

Record: proof-chain protocol files, framework-outside mechanism, test total, source/runtime hash result, commits, and that CATL V2 remains pending author review.

- [ ] **Step 2: Move the approved queue item to the archive**

Move the exact `2026-07-12 - 基本面 Skill 结论证明协议与框架外发现机制` entry from the queue into the archive, change status to `已完成`, and preserve the user approval note.

- [ ] **Step 3: Verify only the intended queue entry moved**

Run:

```powershell
rg -n "基本面 Skill 结论证明协议" 00_System/AI_Change_Queue.md 90_Archive/AI_Change_Queue_Archive.md
```

Expected: no hit in the active queue; exactly one completed hit in the archive.

---

## Completion Evidence

- New proof-chain contract tests pass.
- Existing repository tests remain green.
- Skill structural validation passes.
- Source and installed runtime copies are SHA-256 identical for every changed production file.
- Active queue entry is archived only after production validation.
- No sample is made public by this plan.
