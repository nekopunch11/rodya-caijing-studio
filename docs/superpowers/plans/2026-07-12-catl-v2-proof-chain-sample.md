# CATL V2 Proof-Chain Sample Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 用升级后的基本面证明协议重做宁德时代专业版样张，验证 Skill 能从结果表升级为可复算、可反驳、可发现框架外事项的权威研究报告。

**Architecture:** 样张先建立独立的结构化证明底稿，再由该底稿生成 DOCX；正文只放关键推导，附录保留原始数据、完整同业池和断裂链。样张始终位于 Inbox 审核区，作者批准前不进入项目 README 或 GitHub。

**Tech Stack:** 官方公司/交易所披露、Markdown/JSON 研究底稿、Python `python-docx`、Microsoft Word PDF 导出、Poppler 页面渲染、Node/Python 内容检查。

## Global Constraints

- 必须先完成生产 Skill 升级计划并通过全部测试。
- 财务实际数据优先采用公司年报、季报和交易所公告；同业比较优先采用同口径官方披露。
- 外部预测只能作为预期坐标，不能补成公司实际数据。
- 无法完成的量价成本、同业或单位经济链必须标记断裂并停止相关定性。
- 不输出目标价、买卖建议或缺少同日数据支持的贵/便宜判断。
- 不覆盖当前 V1 文件；V2 使用独立文件名。
- 作者明确批准前，不复制到项目、README 或 GitHub。

---

## File Map

- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\sources-v2.md` — V2 来源、页码、口径和同业池。
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\catl-proof-chain-v2.json` — 唯一研究内核。
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\build_catl_report_v2.py` — 从内核生成 DOCX。
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\宁德时代_基本面研究样张_V2.docx` — 待审核成品。
- Create: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\catl\render-v2\` — PDF 与逐页 PNG。
- Modify after approval only: sample review `README.md` status; do not modify project README before author approval.

---

### Task 1: Build the V2 Source Ledger and Comparable-Company Policy

**Files:**
- Create: `catl/sources-v2.md`

**Interfaces:**
- Consumes: official CATL 2025 annual report, 2026Q1 report and subsequent material announcements; official peer filings.
- Produces: every source URI, page number, period, accounting currency, evidence grade and intended use.

- [ ] **Step 1: Preserve the already verified CATL facts**

Record these actuals with their official report page references:

```text
2021–2025 revenue: RMB 130.356 / 328.594 / 400.917 / 362.013 / 423.702 bn
2021–2025 parent net profit: RMB 15.931 / 30.729 / 44.121 / 50.745 / 72.201 bn
2021–2025 R&D expense: RMB 7.691 / 15.510 / 18.356 / 18.607 / 22.147 bn
2025 operating cash flow: RMB 133.220 bn; 2024: RMB 96.990 bn
2025 assets / liabilities / attributable equity: RMB 974.828 / 603.801 / 337.108 bn
2025 weighted ROE: 24.91%
2025 battery sales: 661 GWh; power-battery share: 39.2%
2025 capacity / under construction: 772 / 321 GWh
2026Q1 revenue / parent profit / operating cash flow: RMB 129.131 / 20.738 / 33.681 bn
2026Q1 YoY: revenue +52.45%, parent profit +48.52%, operating cash flow +2.47%
```

- [ ] **Step 2: Define the peer pool before collecting metrics**

Use CATL, BYD battery-related operations, LG Energy Solution and Samsung SDI as the initial pool. For each peer, record inclusion rationale, accounting currency, fiscal period and whether the metric is consolidated-company or battery-segment level. Exclude any metric that cannot be reconciled to a comparable business scope; do not mix consolidated BYD auto margins with pure battery-company margins.

- [ ] **Step 3: Collect only the comparable metrics needed for conclusions**

Required metrics:

```text
global power-battery share
battery shipment or installed capacity
battery/energy segment gross or operating margin when disclosed
R&D intensity
operating cash conversion or closest available operating-cash metric
capacity and disclosed expansion
```

If fewer than four comparable observations exist, show raw ranking and values rather than pseudo-precise quartiles.

- [ ] **Step 4: Record data attempts and broken links**

For every unavailable metric, list the official pages searched and the reason it is unusable. A missing unit-cost curve must be recorded as a broken chain, not inferred from consolidated margins.

---

### Task 2: Create the Single Proof-Chain Research Kernel

**Files:**
- Create: `catl/catl-proof-chain-v2.json`

**Interfaces:**
- Consumes: `sources-v2.md`.
- Produces: the only data source used by the DOCX builder.

- [ ] **Step 1: Create the JSON root with fixed sections**

```json
{
  "公司": "宁德时代",
  "代码": ["300750.SZ", "03750.HK"],
  "财务截至": "2026-03-31",
  "增量信息截至": "2026-07-10",
  "研究问题": [],
  "结论证明": [],
  "框架外发现": [],
  "首页结论": [],
  "数据缺口": [],
  "来源": []
}
```

- [ ] **Step 2: Add the four required decisive chains**

Use these exact research questions:

```text
P-01：2025 年利润增速显著高于收入增速，主要由什么驱动，能否视为主业经营改善？
P-02：销量、产品结构、价格和成本如何共同解释收入与毛利变化？
P-03：全球份额、研发、认证和规模是否构成相对同业可验证的护城河？
P-04：大规模扩产是否已经转化为可验证的现金回报和资本效率？
```

Each chain must contain the exact schema from `references/fundamental-proof-chain.md`. If price/unit-cost or peer segment data is unavailable, set `状态` to `断裂`, leave `研究判断` empty, and list `缺失数据`.

- [ ] **Step 3: Add framework-outside scanning results**

At minimum evaluate:

```text
A/H dual listing and liquidity/currency differences
overseas localization, trade and regulatory exposure
large fixed assets, construction in progress and impairment
non-operating/other income contribution to profit growth
new chemistry routes and battery-recycling ecosystem
```

Only items passing the importance Gate become body sections.

- [ ] **Step 4: Gate every headline conclusion**

Each item in `首页结论` must reference one or more complete `证明链编号`. No conclusion may reference only a broken chain.

---

### Task 3: Build the V2 DOCX From the Kernel

**Files:**
- Create: `catl/build_catl_report_v2.py`
- Create: `catl/宁德时代_基本面研究样张_V2.docx`

**Interfaces:**
- Consumes: `catl-proof-chain-v2.json` only.
- Produces: an editable DOCX using the project charcoal/gold visual specification.

- [ ] **Step 1: Reuse only visual helpers from V1**

Copy font, margin, header/footer, table, callout and source-line helpers from `build_catl_report.py`. Do not hard-code research numbers in the V2 builder; load all content from `catl-proof-chain-v2.json`.

- [ ] **Step 2: Generate this exact report sequence**

```text
1. 一页概要：仅列能够反查完整证明链的研究结论
2. 研究问题地图：P-01 至 P-04、状态和结论影响
3. 公司与行业关键指标
4. P-01 利润来源桥
5. P-02 量价成本/可得替代经营桥
6. P-03 同业坐标与护城河逐分推导
7. P-04 扩产、现金流与资本回报
8. 成长、管理层和资本配置
9. 框架外重大事项
10. 投资逻辑支柱、反面证据与证伪链
11. 估值与风险简版
12. 附录：原始数据、口径、完整同业池、计算底稿、断裂链、来源和免责声明
```

- [ ] **Step 3: Render proof-chain blocks consistently**

Each decisive body block must visibly show:

```text
[P-ID] 研究问题
原始数据与口径
计算/拆解
历史坐标｜同业坐标
研究判断（only if complete）
反面证据｜证伪条件
来源与截至日
```

Broken chains must show `未完成推导` and omit the research-judgment row.

- [ ] **Step 4: Generate the DOCX**

Run:

```powershell
& 'C:\Users\Administrator.DESKTOP-OPKAITA\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' '.\build_catl_report_v2.py'
```

Expected: `宁德时代_基本面研究样张_V2.docx` exists and opens as a valid ZIP package.

---

### Task 4: Validate Content Before Visual Review

**Files:**
- Verify: `catl-proof-chain-v2.json`
- Verify: `宁德时代_基本面研究样张_V2.docx`

**Interfaces:**
- Produces: machine-checkable evidence that the document obeys the protocol.

- [ ] **Step 1: Check JSON gates**

Run a Python validation that asserts:

```python
assert all(c["状态"] in {"完整", "断裂"} for c in data["结论证明"])
assert all(not c.get("研究判断") for c in data["结论证明"] if c["状态"] == "断裂")
assert all(item["证明链编号"] for item in data["首页结论"])
by_id = {c["编号"]: c for c in data["结论证明"]}
assert all(all(by_id[x]["状态"] == "完整" for x in item["证明链编号"]) for item in data["首页结论"])
assert data["框架外发现"]
```

Expected: all assertions pass.

- [ ] **Step 2: Check DOCX package integrity and required headings**

Use Python `zipfile.ZipFile(...).testzip()` and `python-docx` paragraph extraction. Assert that the document contains `利润来源桥`, `量价成本`, `同业坐标`, `框架外重大事项`, `未完成推导`, `反面证据`, `证伪条件`, and `完整同业池`.

- [ ] **Step 3: Check forbidden authority shortcuts**

Fail if the report contains an unsupported strong conclusion attached to a broken proof ID, or phrases such as `数据不足但整体仍偏强`, `预计必然`, `显然领先` without a complete chain reference.

---

### Task 5: Render and Inspect Every Page

**Files:**
- Create: `catl/render-v2/宁德时代_基本面研究样张_V2.pdf`
- Create: `catl/render-v2/page-*.png`

**Interfaces:**
- Consumes: final DOCX.
- Produces: visual QA evidence.

- [ ] **Step 1: Export with Microsoft Word in the background**

Use Word COM `ExportAsFixedFormat(..., 17)` with `Visible = $false`; always close the document and quit Word in `finally`.

- [ ] **Step 2: Rasterize at 120 DPI**

```powershell
& 'C:\Users\Administrator.DESKTOP-OPKAITA\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe' -png -r 120 '.\render-v2\宁德时代_基本面研究样张_V2.pdf' '.\render-v2\page'
```

Expected: one PNG per PDF page.

- [ ] **Step 3: Inspect every page individually**

Reject and regenerate if any page has a blank page, orphaned heading, split key table, clipped source line, unreadable footnote, excessive half-empty page, or a proof-chain block separated from its conclusion.

- [ ] **Step 4: Compare V1 and V2 authority signals**

Record a short checklist in the sample review README:

```text
V2 shows how conclusions were derived: yes/no
V2 separates complete and broken chains: yes/no
V2 provides historical and peer coordinates: yes/no
V2 exposes counter-evidence and falsification: yes/no
V2 records framework-outside scanning: yes/no
```

All must be `yes` before presenting V2 for author review.

---

### Task 6: Author Review Gate

**Files:**
- Modify: sample review `README.md` only to add V2 as “待作者审核”.

**Interfaces:**
- Consumes: passing content and visual checks.
- Produces: one explicit approval decision; no automatic publication.

- [ ] **Step 1: Present only the V2 DOCX and review summary**

Do not replace V1, do not modify the project README, and do not copy V2 into the git repository.

- [ ] **Step 2: Wait for explicit approval**

Only the exact user decision “批准宁德时代 V2 作为公开样张” authorizes replacement or publication.

- [ ] **Step 3: If approved, create a separate publication plan**

That plan must cover repository placement, README link, sample size implications, source licensing, commit, test and push. Approval of V2 does not itself authorize a GitHub push.

---

## Completion Evidence

- Proof-chain JSON passes all gate assertions.
- DOCX package integrity and required-heading checks pass.
- Every rendered page has been individually inspected.
- V2 authority checklist is all `yes`.
- V2 remains in the Inbox review area until explicit author approval.
