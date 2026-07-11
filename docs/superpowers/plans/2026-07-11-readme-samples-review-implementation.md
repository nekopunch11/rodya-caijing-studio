# README Samples Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在仓库外生成三组使用真实上市公司公开数据的高质量成果样张，并在任何 GitHub 发布动作前交由用户逐项审核。

**Architecture:** 所有草稿、数据台账、构建脚本、渲染图和最终审核件放入 `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\`。三组样张独立生产和验收；只有用户明确批准的截图或完整样张，才在后续单独变更中复制到项目仓库。

**Tech Stack:** rodya-caijing-studio 研究模块、官方公告与公司财报、python-docx、LibreOffice 渲染、HTML 卡片模板、PowerPoint Artifact Tool、幻灯片渲染与越界检测。

## Global Constraints

- 使用真实公司和公开数据，逐条记录来源、口径和数据截至日。
- 每份样张醒目标注“演示样张，不构成投资建议”。
- 样张不进入项目仓库、不提交 GitHub，直至用户明确批准。
- 宁德时代样张为基本面专业 DOCX；招商银行样张为估值客户合规卡；小米集团样张为基本面 + 估值 + 排雷组合 PPT。
- GitHub About 不在本计划范围内。

---

### Task 1: Review Workspace and Evidence Ledgers

**Files:**
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\README.md`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\sources.md`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\cmb\sources.md`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\xiaomi\sources.md`

**Interfaces:**
- Consumes: primary company filings, exchange disclosures, official macro/rate sources, dated market data
- Produces: source ledgers used by all three artifacts

- [ ] **Step 1: Create the review-only directory structure**

Create separate `catl`, `cmb`, and `xiaomi` folders and state that nothing in this directory is approved for publication.

- [ ] **Step 2: Apply freshness and source gates**

For each company, record the latest available annual report, latest interim/quarterly report, price/valuation date, source URL, evidence grade, accounting currency, and unresolved conflicts.

- [ ] **Step 3: Verify source coverage**

Check that every headline number planned for a screenshot has a source and cutoff date. Mark unsupported calculations as excluded rather than estimating them silently.

### Task 2: CATL Fundamental DOCX

**Files:**
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\宁德时代_基本面研究样张.docx`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\render\page-*.png`
- Create: task-local builder and QA files under the same `catl` directory

**Interfaces:**
- Consumes: `catl\sources.md`, `caijing-fundamental`, shared research/output/visual specifications
- Produces: complete professional DOCX and rendered pages for user review

- [ ] **Step 1: Build the ten-block research kernel**

Cover company overview, business model, moat evidence, five-year financial examination, growth, valuation brief, risk scan, stage coordinates, management/capital allocation/unit economics, and investment pillars with falsification conditions.

- [ ] **Step 2: Generate the DOCX using the project visual specification**

Use the charcoal-and-bronze research-report system in `references/docx-visual-spec.md`, with explicit source lines and data cutoff dates.

- [ ] **Step 3: Render every page**

Run the documents skill `render_docx.py` against the generated DOCX and emit PNG pages.

- [ ] **Step 4: Inspect and iterate**

Inspect every rendered page at full size; fix clipping, table geometry, missing glyphs, awkward gaps, source placement, and page breaks; rerender after every fix.

- [ ] **Step 5: Select review candidates**

Prepare the cover, one-page overview, and one evidence/risk page as candidate README screenshots without copying them into the repository.

### Task 3: China Merchants Bank Valuation Card

**Files:**
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\cmb\招商银行_估值客户合规卡.html`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\cmb\招商银行_估值客户合规卡.png`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\cmb\招商银行_估值客户文案.md`

**Interfaces:**
- Consumes: `cmb\sources.md`, PB-ROE valuation kernel, compliance rendering rules, card template
- Produces: 1080×1440 review card and compliant caption

- [ ] **Step 1: Build the bank-adapted valuation kernel**

Use PB-ROE as the primary anchor; include current PB, historical percentile, peer quartiles with ROE controls, dividend/buyback return where available, rate context, evidence boundary, and 2–3 follow-up variables.

- [ ] **Step 2: Render the customer-compliant card**

Populate the project card template using the locked ink-ledger palette. Use red/green only for actual price changes; valuation percentiles and position markers remain ink-colored.

- [ ] **Step 3: Run compliance and visual checks**

Remove target prices, buy/sell implications, and personalized actions. Verify 1080×1440 output, no overflow, no clipping, readable source/footer, and correct data cutoff.

### Task 4: Xiaomi Combined Research PPT

**Files:**
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\xiaomi\小米集团_基本面估值排雷研究样张.pptx`
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\xiaomi\render\slide-*.png`
- Create: task-local Artifact Tool source and QA files under the `xiaomi` directory

**Interfaces:**
- Consumes: `xiaomi\sources.md`, fundamental/valuation/risk kernels, `references/ppt-visual-spec.md`
- Produces: coherent seven-slide internal research deck and rendered review images

- [ ] **Step 1: Build the combined research kernel**

Keep one fact base for business quality, SOTP/appropriate valuation anchors, and public-disclosure risk checks. Resolve duplicated facts and explain conflicting method outputs rather than averaging them.

- [ ] **Step 2: Write the seven-slide narrative**

Use: cover, research proposition, business/fundamental evidence, valuation coordinates, risk and counter-evidence, tracking/falsification dashboard, sources/disclaimer.

- [ ] **Step 3: Build with Artifact Tool**

Use the project’s adaptive internal-research visual specification. Keep visible copy audience-facing and do not expose production notes.

- [ ] **Step 4: Validate and render**

Run `slides_test.py`, render all slides, inspect every slide at full size, and fix every unintended overlap, clipping, wrapping, footer, and chart/source mismatch.

- [ ] **Step 5: Select review candidates**

Prepare the cover, valuation, and risk/tracking slides as candidate README screenshots without copying them into the repository.

### Task 5: User Review Gate

**Files:**
- Modify only review-area artifacts requested by the user
- Do not modify repository `README.md` or `assets/` in this task

**Interfaces:**
- Consumes: three verified review artifacts and screenshot candidates
- Produces: explicit approve/revise/reject decision per artifact

- [ ] **Step 1: Present all three artifacts for review**

Provide absolute links to the DOCX, HTML/PNG card, PPTX, and compact visual previews. State each artifact’s data cutoff, source coverage, and unresolved gaps.

- [ ] **Step 2: Record decisions**

Treat approval separately for the full artifact, each proposed README screenshot, and any public download link.

- [ ] **Step 3: Stop before publication**

Do not copy, commit, or push any sample until the user explicitly authorizes publication.
