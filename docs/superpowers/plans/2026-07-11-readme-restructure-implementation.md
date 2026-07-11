# README Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 README 重构为“能力 → 权威证据 → 安装 → 样张 → 全貌 → 公众号”的成果型产品页，同时保持现有安装、更新、命令和合规信息完整。

**Architecture:** 使用一个 README 契约测试锁定关键文案、章节顺序和审核边界，再整体重写 `README.md`。样张区只保留审核说明，真实图片在用户批准前不进入项目；GitHub About 不在本计划范围内。

**Tech Stack:** Markdown、Node.js `node:test`、现有仓库契约测试。

## Global Constraints

- 首屏先讲能力与成果，不先贴人群标签。
- 前三个主要内容区依次回答“能做什么、凭什么专业、怎么安装”。
- 安装仅保留“让 AI 安装”和 `npx skills add nekopunch11/rodya-caijing-studio`。
- 不虚构用户数、Stars、准确率、收益率、机构背书或测试结果。
- 未经用户审核的真实公司样张不得嵌入 README 或提交 GitHub。
- GitHub About 由用户自行修改，本计划不操作远端设置。

---

### Task 1: README Contract Test

**Files:**
- Create: `tests/readme-contract.test.mjs`
- Test: `tests/readme-contract.test.mjs`

**Interfaces:**
- Consumes: repository-root `README.md`
- Produces: section-order, install-command, sample-gate, and newsletter-placement assertions

- [ ] **Step 1: Write the failing test**

Create a Node test that loads `README.md` and asserts:

```js
assert.match(readme, /把一句“分析一下”，变成一份专业财经研究报告/);
assert.match(readme, /专业不是靠语气，是靠约束/);
assert.match(readme, /npx skills add nekopunch11\/rodya-caijing-studio/);
assert.ok(readme.indexOf('七种能力') < readme.indexOf('专业不是靠语气'));
assert.ok(readme.indexOf('专业不是靠语气') < readme.indexOf('安装'));
assert.ok(readme.indexOf('安装') < readme.indexOf('适合谁'));
assert.match(readme, /样张.*审核/);
assert.ok(readme.indexOf('适合谁') < readme.indexOf('微信公众号「风骨」'));
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/readme-contract.test.mjs`

Expected: FAIL because the current README lacks the approved hero heading and approved section order.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/readme-contract.test.mjs
git commit -m "test: define README product-page contract"
```

### Task 2: Rewrite README

**Files:**
- Modify: `README.md`
- Test: `tests/readme-contract.test.mjs`

**Interfaces:**
- Consumes: approved design spec and existing README facts
- Produces: public-facing README with approved information architecture

- [ ] **Step 1: Replace the opening**

Use the approved result headline, subtitle, capability strip, and a compact seven-capability table. Do not mention audience identities before the “适合谁” section.

- [ ] **Step 2: Add authority evidence**

Add the five evidence groups: sourced methods, data discipline, falsifiability, research-safety Gate, and quality contracts. Every test claim must correspond to a repository test file.

- [ ] **Step 3: Move installation forward**

Place the two approved installation methods immediately after authority evidence. Retain update hygiene later in the README.

- [ ] **Step 4: Add the sample review boundary**

Name the three approved sample subjects and formats, but state that screenshots will only be displayed after user review. Do not add unapproved image paths.

- [ ] **Step 5: Compress the product overview**

Represent each module with: question answered, representative methods, default output. Add the workflow chain, then the audience section, commands, update details, architecture, compliance, author, and WeChat QR.

- [ ] **Step 6: Run README contract test and verify GREEN**

Run: `node --test tests/readme-contract.test.mjs`

Expected: PASS.

- [ ] **Step 7: Run all repository tests**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass with zero failures.

- [ ] **Step 8: Run Markdown and diff checks**

Run: `git diff --check`

Expected: no output and exit code 0. Review `git diff -- README.md tests/readme-contract.test.mjs` for factual drift and accidental About changes.

- [ ] **Step 9: Commit README implementation**

```bash
git add README.md tests/readme-contract.test.mjs
git commit -m "docs: rebuild README around capability and evidence"
```

