# P0 Research Safety Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove unsafe pseudo-precision and hard word-count incentives while adding a shared research/advisory safety gate and executable regression contracts.

**Architecture:** Keep the seven-module routing and rendering architecture intact. Put cross-module audience, evidence, compliance, and decision-safety rules in one new shared reference; keep Hong Kong IPO allocation and recommendation corrections in its module plus the common formula library; enforce all P0 invariants with a dependency-free Node contract test.

**Tech Stack:** Markdown Agent Skills, Node.js built-in `node:test`, PowerShell, Git.

## Global Constraints

- Implement P0 only; do not add the audited P1 methodology items.
- Preserve the self-use / internal research / client-facing split and existing three-format visual system.
- Do not claim a calibrated probability model or completed backtest.
- Do not push GitHub without separate user authorization.
- Use `apply_patch` for file edits and verify the source tree before syncing the runtime copy.

---

### Task 1: Research-safety regression contract

**Files:**
- Create: `tests/research-safety-contract.test.mjs`
- Read: `caijing-ipo-hk/SKILL.md`
- Read: `references/output-spec.md`
- Read: `references/compliance.md`
- Read: `references/formulas-and-thresholds.md`
- Read: `SKILL.md`

**Interfaces:**
- Consumes: current Markdown production rules.
- Produces: a dependency-free static contract executed by `node --test`.

- [ ] **Step 1: Write the failing contract**

```js
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const production = [
  "SKILL.md",
  "AGENTS.md",
  "caijing-ipo-hk/SKILL.md",
  "references/output-spec.md",
  "references/compliance.md",
  "references/formulas-and-thresholds.md",
].map(read).join("\n");

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

test("professional completion uses evidence rather than word floors", () => {
  assert.doesNotMatch(production, /不得低于\s*4000\s*字/);
  assert.doesNotMatch(production, /默认不少于\s*5000\s*字/);
  assert.match(read("references/output-spec.md"), /分析块覆盖率/);
  assert.match(read("references/output-spec.md"), /关键结论证据覆盖率/);
});

test("shared research safety gate is mandatory", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "references/research-safety-gate.md")));
  assert.match(read("SKILL.md"), /research-safety-gate\.md/);
  const gate = read("references/research-safety-gate.md");
  assert.match(gate, /个人自用/);
  assert.match(gate, /机构内部研究/);
  assert.match(gate, /对客材料/);
  assert.match(gate, /免责声明.*不能替代.*合规审查/s);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test tests/research-safety-contract.test.mjs`  
Expected: FAIL because unsafe legacy phrases exist and `references/research-safety-gate.md` does not exist.

- [ ] **Step 3: Commit the failing contract**

```powershell
git add -- tests/research-safety-contract.test.mjs
git commit -m "test: define P0 research safety contracts"
```

### Task 2: Shared safety gate and output-completion contract

**Files:**
- Create: `references/research-safety-gate.md`
- Modify: `SKILL.md`
- Modify: `AGENTS.md`
- Modify: `references/output-spec.md`
- Modify: `references/compliance.md`
- Modify: seven module `SKILL.md` files only where hard word floors appear

**Interfaces:**
- Consumes: audience mode and data-evidence state.
- Produces: one observable safety gate and one evidence-based completion contract used by all modules.

- [ ] **Step 1: Add the shared gate** with three explicit modes, inputs required before specific-money advice, institutional recordkeeping, client-review requirements, and the disclaimer boundary from the approved design.
- [ ] **Step 2: Link the gate from the parent workflow and project instructions** without duplicating its detailed rules.
- [ ] **Step 3: Replace hard word floors** with six completion metrics: analysis-block coverage, evidence coverage, A/B-source ratio, formula transparency, thesis-evidence-falsifier closure, and visible data gaps.
- [ ] **Step 4: Run focused GREEN check**

Run: `node --test tests/research-safety-contract.test.mjs`  
Expected: HK-specific tests may still fail, but safety-gate and word-floor tests PASS.

### Task 3: Hong Kong IPO mathematical and rule repair

**Files:**
- Modify: `caijing-ipo-hk/SKILL.md`
- Modify: `references/formulas-and-thresholds.md`
- Modify: `references/freshness-gate.md`
- Modify: `README.md` only if its public summary repeats an unsafe rule

**Interfaces:**
- Consumes: offer structure, public lots, actual/comparable application bands and allocation results, financing terms, risk budget, liquidity and collateral constraints.
- Produces: conditional allocation ranges, evidence scores, empirical stress scenarios, and a conditional self-use recommendation without calibrated-probability claims.

- [ ] **Step 1: Replace the invalid allocation formula** with an evidence hierarchy: actual allocation table → matched comparable curves → unquantified conditional range.
- [ ] **Step 2: Rename pseudo-Bayesian output** to evidence score/scenario weighting and prohibit exact probabilities without training, out-of-sample validation and calibration.
- [ ] **Step 3: Replace the fixed -10% worst case** with empirical ordinary/stress/extreme loss scenarios and explicit sample limitations.
- [ ] **Step 4: Replace unconditional maxing and mechanical exit rules** with risk-budget gates and condition-based execution triggers.
- [ ] **Step 5: Correct the 18C mechanism rule** and require current HKEX verification through the freshness gate.
- [ ] **Step 6: Run contract tests**

Run: `node --test tests/research-safety-contract.test.mjs`  
Expected: PASS with zero failures.

### Task 4: Full validation and runtime synchronization

**Files:**
- Verify: all production files under project root
- Sync: project production files to `C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\rodya-caijing-studio\`
- Modify: `00_System/Current_Status.md`
- Archive: approved queue entry to `90_Archive/AI_Change_Queue_Archive.md`

**Interfaces:**
- Consumes: verified project source.
- Produces: identical runtime production copy and auditable status record.

- [ ] **Step 1: Run all tests**

Run: `node --test tests/*.test.mjs`  
Expected: all tests PASS, zero failures and zero warnings.

- [ ] **Step 2: Run structural and residual scans**

Run: `git diff --check` and targeted `rg` scans for the removed formulas, probability label, fixed loss, hard word floors and unconditional maxing.  
Expected: no whitespace errors and no unsafe production-rule matches.

- [ ] **Step 3: Validate skill structure**

Run the installed `quick_validate.py` against the project root when available; otherwise validate all eight SKILL frontmatters and required files with a local read-only check.  
Expected: valid skill name/frontmatter and required reference links.

- [ ] **Step 4: Sync only verified production files** and compare SHA-256 hashes for every runtime file.
- [ ] **Step 5: Update Current_Status, mark the queue item complete, and archive it** with date and Codex attribution.
- [ ] **Step 6: Review `git diff` against the approved design** and commit the implementation.

```powershell
git add -- SKILL.md AGENTS.md README.md caijing-* references tests
git commit -m "fix: harden research and HK IPO safety rules"
```
