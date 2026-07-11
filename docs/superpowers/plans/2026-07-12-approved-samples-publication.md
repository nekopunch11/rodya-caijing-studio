# Approved CMB and Xiaomi Samples Publication Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 正确记录招商银行与小米集团样张已通过作者内容审核，并在不混入宁德时代 V1 的前提下，为仓库 README 准备可验证的真实样张展示。

**Architecture:** 审核状态先在 Inbox 审核台账中分拆；对外仓库只复制已批准的最终成品、来源台账和经过验证的预览，不复制构建脚本或失真截图。README 用明确链接展示两份已批准样张，并继续把宁德时代标为 V2 待审。

**Tech Stack:** Markdown、HTML、PNG、PPTX、Artifact Tool 预览、Node 合同测试、Git。

## Global Constraints

- 用户已于本次对话确认“小米集团和招商没问题”，视为内容审核通过。
- 内容审核通过不等于授权自动执行 `git push`；推送仍需用户明确执行或授权。
- 招商银行失真的 `.jpg/.png` 不得进入仓库，也不得作为 README 预览。
- 宁德时代 V1 未获批准，不得进入仓库；只有 V2 明确获批后另立发布计划。
- 公开样张必须保留来源、数据截至日和“不构成投资建议”。
- GitHub About 由用户自行修改，本计划不触碰。

---

## File Map

- Modify: `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\README.md` — 分拆已批准与待审核状态。
- Create: `docs/samples/cmb/招商银行_估值客户合规卡.html` — 已批准卡片。
- Create: `docs/samples/cmb/招商银行_估值客户合规卡.png` — 重新生成且通过尺寸/视觉检查的预览。
- Create: `docs/samples/cmb/招商银行_估值客户文案.md` — 已批准文案。
- Create: `docs/samples/cmb/sources.md` — 来源台账。
- Create: `docs/samples/xiaomi/小米集团_基本面估值排雷研究样张.pptx` — 已批准 PPTX。
- Create: `docs/samples/xiaomi/小米集团_研究样张预览.png` — 真实七页 montage。
- Create: `docs/samples/xiaomi/sources.md` — 来源台账。
- Modify: `README.md` — 展示两份已批准样张，宁德时代继续显示 V2 待审核。
- Modify: `tests/readme-contract.test.mjs` — 验证链接、文件存在和审核状态。

---

### Task 1: Correct the Review Ledger

**Files:**
- Modify: sample review `README.md`.

- [ ] **Step 1: Replace the global pending statement**

Use these statuses:

```markdown
## 已通过作者内容审核

- 招商银行估值客户合规卡、配套文案与来源台账：已批准内容；有效截图待补。
- 小米集团基本面 + 估值 + 排雷组合 PPT：已批准内容与版式。

## 待作者审核

- 宁德时代 V1 不作为公开样张；等待证明链协议生成的 V2。
```

- [ ] **Step 2: Preserve publication discipline**

State explicitly that content approval permits preparing repository integration, while `git push` remains a separate user-authorized action.

---

### Task 2: Generate One Valid CMB Preview

**Files:**
- Read: approved CMB HTML.
- Create: a new temporary preview outside the repository before copying.

- [ ] **Step 1: Render at a true 1080 × 1440 CSS viewport**

Use a browser context with `viewport: { width: 1080, height: 1440 }` and `deviceScaleFactor: 1`. Serve the review directory from `127.0.0.1`; do not use a Windows desktop screenshot. Save the result as `D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\cmb\招商银行_估值客户合规卡-public.png`.

- [ ] **Step 2: Validate the binary and dimensions**

Use Pillow:

```python
from PIL import Image
img = Image.open("招商银行_估值客户合规卡-public.png")
assert img.format == "PNG"
assert img.size == (1080, 1440)
```

- [ ] **Step 3: Inspect the PNG visually**

Reject it if text repeats, any edge is cropped, fonts shift, the bottom disclaimer is missing, or the HTML and PNG values differ.

- [ ] **Step 4: Do not delete old distorted captures in this task**

They remain excluded from publication. Their deletion is a separate filesystem cleanup requiring the applicable vault deletion approval.

---

### Task 3: Build the Xiaomi Seven-Slide Montage

**Files:**
- Read: `xiaomi/output/slide-01.png` through `slide-07.png`.
- Create: `docs/samples/xiaomi/小米集团_研究样张预览.png`.

- [ ] **Step 1: Generate a real montage from all seven slide PNGs**

Run:

```powershell
& 'C:\Users\Administrator.DESKTOP-OPKAITA\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' 'C:\Users\Administrator.DESKTOP-OPKAITA\.codex\plugins\cache\openai-primary-runtime\presentations\26.709.11516\skills\presentations\container_tools\create_montage.py' --input_dir 'D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\xiaomi\montage-input' --output_file 'D:\AI\RodyaVault\01_Inbox\rodya-caijing-studio-sample-review\xiaomi\小米集团_研究样张预览-public.png' --num_col 2 --cell_width 640 --cell_height 360 --gap 20 --label_mode filename --fail_on_image_error
```

Before running, create `xiaomi/montage-input/` and copy only `slide-01.png` through `slide-07.png` into it so `deck-montage.webp` is not included. Do not reuse the existing `deck-montage.webp`, which currently contains only the cover.

- [ ] **Step 2: Verify montage membership**

Confirm the montage visibly contains slide numbers 01–07 exactly once and preserves the 16:9 aspect ratio of each tile.

---

### Task 4: Copy Only Approved Public Artifacts

**Files:**
- Create the `docs/samples/cmb/` and `docs/samples/xiaomi/` files listed in File Map.

- [ ] **Step 1: Copy CMB artifacts**

Copy only the approved HTML, valid new PNG, approved copy and `sources.md`. Do not copy any `-fresh`, `-full`, JPEG-disguised PNG or builder file.

- [ ] **Step 2: Copy Xiaomi artifacts**

Copy the approved PPTX, real seven-slide montage and `sources.md`. Do not copy the build script, inspect NDJSON, layout JSON or individual render working files.

- [ ] **Step 3: Verify public artifact integrity**

Check:

```text
CMB PNG = true PNG, 1080×1440
CMB HTML contains the approved data cutoff and disclaimer
Xiaomi PPTX zip test passes
Xiaomi montage contains seven slides
all source links remain present
```

---

### Task 5: Update README With Approved and Pending Samples

**Files:**
- Modify: `README.md`.
- Modify: `tests/readme-contract.test.mjs`.

- [ ] **Step 1: Write the failing publication test**

Add:

```js
test("README publishes only author-approved samples", () => {
  const readme = read("README.md");
  assert.match(readme, /招商银行.*docs\/samples\/cmb/s);
  assert.match(readme, /小米集团.*docs\/samples\/xiaomi/s);
  assert.match(readme, /宁德时代.*V2.*待审核/s);
  assert.ok(fs.existsSync(path.join(ROOT, "docs/samples/cmb/招商银行_估值客户合规卡.png")));
  assert.ok(fs.existsSync(path.join(ROOT, "docs/samples/xiaomi/小米集团_研究样张预览.png")));
  assert.doesNotMatch(readme, /宁德时代_基本面研究样张\.docx/);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/readme-contract.test.mjs`

Expected: the new test fails before README and public assets are added.

- [ ] **Step 3: Replace the audit-only sample section**

The section must contain:

```markdown
## 🖼️ 真实成果样张

### 招商银行｜估值客户合规卡

链接：HTML 卡片、PNG 预览、配套文案、来源台账。

### 小米集团｜基本面 + 估值 + 排雷 PPT

链接：PPTX、七页预览、来源台账。

### 宁德时代｜基本面专业研报

V2 正按完整证明链重做，待作者审核后再公开；不使用当前 V1 占位。
```

Every public sample entry must display its data cutoff and disclaimer.

- [ ] **Step 4: Run README tests**

Run: `node --test tests/readme-contract.test.mjs`

Expected: all README tests pass.

---

### Task 6: Full Verification and Local Commit

- [ ] **Step 1: Run all repository tests**

```powershell
$tests = Get-ChildItem -LiteralPath '.\tests' -Filter '*.test.mjs' | Sort-Object Name | Select-Object -ExpandProperty FullName
node --test $tests
```

Expected: 0 failures.

- [ ] **Step 2: Run artifact checks again**

Repeat PNG dimensions, PPTX zip integrity, montage membership and source-link checks using the files inside `docs/samples/`, not the Inbox originals.

- [ ] **Step 3: Commit locally**

```powershell
git add README.md tests/readme-contract.test.mjs docs/samples/cmb docs/samples/xiaomi
git commit -m "docs: publish approved real-company samples"
```

- [ ] **Step 4: Stop before push**

Report the commit hash and provide `git push origin main`. Do not push unless the user explicitly authorizes it or runs the command.

---

### Task 7: Update Cross-Session Status

**Files:**
- Modify: `D:\AI\RodyaVault\00_System\Current_Status.md`.

- [ ] **Step 1: Record the publication result**

Add a dated entry stating that CMB and Xiaomi were author-approved, which files were added under `docs/samples/`, the test result, the local commit hash, CATL V2 remains pending, GitHub About remains user-owned, and remote push was not performed automatically.

- [ ] **Step 2: Verify the status is not overstated**

If the local commit has not been pushed, use “本地已提交、待用户推送”; do not write “GitHub 已更新”.

---

## Completion Evidence

- Review ledger distinguishes two approved samples from CATL V2 pending review.
- CMB preview is a true 1080×1440 PNG and visually matches the HTML.
- Xiaomi preview contains all seven slides exactly once.
- README links only to approved artifacts and does not expose CATL V1.
- All repository tests pass.
- Local commit exists; remote push remains user-controlled.
- Current_Status distinguishes local commit state from remote publication state.
