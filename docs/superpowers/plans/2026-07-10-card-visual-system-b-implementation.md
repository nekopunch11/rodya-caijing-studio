# Unified Card Visual System B Implementation Plan

> **状态：已被 2026-07-10 三形态视觉终稿替代，禁止继续执行本计划。** Claude 后续实现已提交至 `16b9ac3`、`670acbd`、`09c9780`；当前只按最新交接做一致性修复、验收、运行副本同步和状态收尾。本文件保留为历史计划记录。

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将客户卡片统一升级为方案 B「机构主视觉 + 墨账本数据系统」，落地六种版式、七模块映射和 Claude/Codex 双路径，同时保持合规、客户版按需和零依赖 HTML 交付。

**Architecture:** 结构化分析内核继续作为唯一内容源；`references/card-components.md` 定义通用视觉契约，`references/codex-image-visuals.md` 只定义 Codex 主视觉能力，七个子模块只声明默认版式映射，`assets/template-card.html` 实现 B1-B6 六种渲染视图。图片是可降级输入，文字、数字、来源和合规内容始终由 HTML 渲染。

**Tech Stack:** Agent Skills Markdown、单文件 HTML/CSS、可选 OpenAI ImageGen 主视觉、PowerShell/`rg` 契约检查、浏览器人工视觉验收；Skill 运行时零 Node 依赖、零打包依赖。

## Global Constraints

- 客户版仍为按需生成；单模块默认仍只交付专业版 docx。
- 客户卡片统一采用方案 B，不保留 A/B 运行时切换。
- 信息优先级：核心结论 > 关键数字 > 对照坐标 > 风险与证伪 > 来源与截至日 > 图片。
- 内容覆盖至少 75%；默认无信息留白控制在 10%-16%。
- 内容超量时按「缩小图片、取消图片、拆页」处理，禁止缩字硬塞。
- 1080×1440 卡片正文建议不小于 28px；元数据和来源不小于 20px。
- 涨红 `#C0392B`、跌绿 `#1E9E5A` 只表达涨跌方向；不得用于品牌装饰。
- Codex 生图只生成无文字主视觉；标题、数字、图表、来源和免责声明必须由 HTML 渲染。
- 没有合格图片时使用 B2/B3/B5/B6 纯数据版式，不用低质量图片凑数。
- 不修改研究方法论、公式阈值、数据源、时效门、合规事实源或 docx 视觉。
- 默认交付填好数据的 HTML + 提醒截图，不恢复 Node/Playwright 渲染管线。
- 参考第三方视觉只借思想，不复制 AGPL 模板、CSS 或代码。

---

## File Structure

### Create

- `references/codex-image-visuals.md`：Codex 主视觉适用场景、提示词骨架、质量门和禁用清单。
- `assets/example-b1-hero.jpg`：B1 模板的无文字机构级示例主视觉，明确标注为视觉示例而非事实证据。

### Modify

- `references/card-components.md`：客户卡片唯一视觉事实源，定义 B1-B6、令牌、密度与降级。
- `references/output-spec.md`：客户卡片路由和 Claude/Codex 双路径。
- `SKILL.md`：共享层索引、渲染步骤和已完成视觉状态。
- `caijing-fundamental/SKILL.md`：默认 B1，可选 B2/B3/B5。
- `caijing-earnings/SKILL.md`：默认 B1，可选 B2/B3/B4。
- `caijing-valuation/SKILL.md`：默认 B2，可选 B3。
- `caijing-risk/SKILL.md`：默认 B5，可选 B4。
- `caijing-industry/SKILL.md`：默认 B6，可选 B1/B3。
- `caijing-ipo-a/SKILL.md`：默认 B2，可选 B3/B5/B4。
- `caijing-ipo-hk/SKILL.md`：默认 B2，可选 B3/B5/B4。
- `assets/template-card.html`：从七张单构图卡升级为 B1-B6 六版式示例。
- `assets/README.md`：模板、图片槽与运行规则。
- `README.md`：视觉系统和跨模型能力说明。
- `docs/references.md`：新增视觉事实源职责说明。
- `docs/modules/*.md`：七模块客户版版式说明。
- `agents/openai.yaml`：只在描述需要同步视觉能力时修改，保持现有图标与品牌色。
- `00_System/Current_Status.md`：实施完成后的快变状态。
- `00_System/AI_Change_Queue.md`、`90_Archive/AI_Change_Queue_Archive.md`：完成后归档批准条目。

---

### Task 1: 重写共享视觉契约与 Codex 主视觉规范

**Files:**
- Modify: `references/card-components.md:1-70`
- Create: `references/codex-image-visuals.md`
- Modify: `references/output-spec.md:64-100`
- Modify: `SKILL.md:47-85`

**Interfaces:**
- Consumes: `docs/superpowers/specs/2026-07-10-card-visual-system-b-design.md`
- Produces: 版式标识 `B1`-`B6`、函数式路由规则「任务类型 + 字段量 + 图片质量 -> 版式」、Codex 主视觉质量门。

- [ ] **Step 1: 运行旧规则契约检查，确认新契约尚未存在**

Run:

```powershell
$repo = 'D:\AI\RodyaVault\02_资料库\02_Skills\rodya-caijing-studio'
rg -n 'B1 主视觉结论页|信息优先级|codex-image-visuals' "$repo\references\card-components.md" "$repo\references\output-spec.md" "$repo\SKILL.md"
```

Expected: 无匹配，`rg` 返回 1。

- [ ] **Step 2: 用完整 B 契约替换 `card-components.md`**

文件必须按以下固定章节组织：

```markdown
# 数据卡片层 · 方案 B 视觉规范

## 一、唯一视觉身份
## 二、品牌令牌
## 三、字体与字号底线
## 四、信息优先级与留白纪律
## 五、图片占比与降级
## 六、B1-B6 六种版式
## 七、七模块默认映射
## 八、通用固定件
## 九、交付与生成
## 十、发布前视觉 checklist
```

其中版式名称必须逐字为：`B1 主视觉结论页`、`B2 超级数字页`、`B3 横向对比页`、`B4 证据墙页`、`B5 风险账本页`、`B6 产业链地图页`。

- [ ] **Step 3: 新建 `codex-image-visuals.md`**

必须包含以下接口与提示词骨架：

```markdown
## 触发条件
- 仅 B1 或 B4 需要图片时触发。
- 先检查用户素材；没有合格素材才使用 Codex 生图。

## 输出契约
- 只生成无文字位图。
- 画面必须给标题保留低细节安全区。
- 生成图不得作为数据证据。

## 提示词骨架
Use case: ads-marketing
Asset type: premium editorial hero image for a finance research card
Scene/backdrop: {与行业直接相关的真实空间或物体}
Subject: {主对象}
Composition/framing: wide 16:9; subject on the right; quiet zone on the upper-left
Lighting/mood: restrained institutional confidence
Constraints: no typography, numbers, logo, watermark, fake screens or embedded charts
Avoid: neon candlestick charts, cyberpunk city, handshakes, money, purple glow, generic SaaS glass
```

- [ ] **Step 4: 更新输出层与父 Skill**

`output-spec.md` 必须明确：

```markdown
- 客户版卡片统一走方案 B。
- 先排不可降级信息，再决定图片面积。
- Claude 使用用户素材或纯数据版式；Codex 可按 codex-image-visuals.md 生成无文字主视觉。
- 默认仍交付 HTML；PNG 仅按需使用环境截图能力，不向 Skill 加入渲染依赖。
```

父 `SKILL.md` 的共享层表新增 `codex-image-visuals.md`，工作流渲染步骤移除“卡片模板未完成”旧表述。

- [ ] **Step 5: 运行共享契约检查**

Run:

```powershell
$repo = 'D:\AI\RodyaVault\02_资料库\02_Skills\rodya-caijing-studio'
rg -n 'B1 主视觉结论页|B6 产业链地图页|10%-16%|缩小图片、取消图片、拆页' "$repo\references\card-components.md"
rg -n '只生成无文字位图|neon candlestick charts|生成图不得作为数据证据' "$repo\references\codex-image-visuals.md"
rg -n '客户版卡片统一走方案 B|codex-image-visuals.md' "$repo\references\output-spec.md" "$repo\SKILL.md"
git -C $repo diff --check
```

Expected: 每个关键短语至少命中 1 次；`git diff --check` 无输出且退出 0。

- [ ] **Step 6: 提交共享契约**

```powershell
git -C $repo add references/card-components.md references/codex-image-visuals.md references/output-spec.md SKILL.md
git -C $repo commit -m "feat: define unified card visual system B"
```

---

### Task 2: 将七个模块映射到 B1-B6

**Files:**
- Modify: `caijing-fundamental/SKILL.md:120-142`
- Modify: `caijing-earnings/SKILL.md:126-150`
- Modify: `caijing-valuation/SKILL.md:98-124`
- Modify: `caijing-risk/SKILL.md:94-118`
- Modify: `caijing-industry/SKILL.md:96-120`
- Modify: `caijing-ipo-a/SKILL.md:79-103`
- Modify: `caijing-ipo-hk/SKILL.md:355-408`

**Interfaces:**
- Consumes: `B1`-`B6` definitions from `references/card-components.md`.
- Produces: 每个模块的 `默认版式`、`可选版式`、`字段到版式功能位`映射。

- [ ] **Step 1: 检查旧模块尚无方案 B 映射**

Run:

```powershell
$moduleSkills = Get-ChildItem $repo -Directory -Filter 'caijing-*' | ForEach-Object { Join-Path $_.FullName 'SKILL.md' }
rg -l '默认版式：B[1-6]' $moduleSkills
```

Expected: 无文件匹配。

- [ ] **Step 2: 在七个模块的客户版输出章节加入明确映射**

各文件使用以下固定格式，不复制视觉规则正文：

```markdown
#### 客户版方案 B 映射

- 默认版式：B1 主视觉结论页
- 可选版式：B2 超级数字页、B3 横向对比页、B5 风险账本页
- 主数字：{该模块固定主指标}
- 对照坐标：{历史/同业/同比环比}
- 证伪或跟踪：{该模块至少 2 项}
- 图片规则：只有图片通过 codex-image-visuals.md 质量门时使用 B1；否则切 B2/B3/B5。
```

默认映射必须为：基本面 B1、财报 B1、估值 B2、排雷 B5、产业链 B6、A股打新 B2、港股打新 B2。

- [ ] **Step 3: 运行七模块映射检查**

Run:

```powershell
$moduleSkills = Get-ChildItem $repo -Directory -Filter 'caijing-*' | ForEach-Object { Join-Path $_.FullName 'SKILL.md' }
$matches = rg -l '#### 客户版方案 B 映射' $moduleSkills
if (($matches | Measure-Object).Count -ne 7) { throw "expected 7 mapped modules" }
rg -n '默认版式：B1 主视觉结论页' "$repo\caijing-fundamental\SKILL.md" "$repo\caijing-earnings\SKILL.md"
rg -n '默认版式：B2 超级数字页' "$repo\caijing-valuation\SKILL.md" "$repo\caijing-ipo-a\SKILL.md" "$repo\caijing-ipo-hk\SKILL.md"
rg -n '默认版式：B5 风险账本页' "$repo\caijing-risk\SKILL.md"
rg -n '默认版式：B6 产业链地图页' "$repo\caijing-industry\SKILL.md"
git -C $repo diff --check
```

Expected: 7 个模块均命中，所有默认版式与表格一致，差异检查通过。

- [ ] **Step 4: 提交模块映射**

```powershell
git -C $repo add caijing-*/SKILL.md
git -C $repo commit -m "feat: map finance modules to card layouts B1-B6"
```

---

### Task 3: 升级 HTML 模板为六种完整 B 版式

**Files:**
- Modify: `assets/template-card.html:1-180`
- Create: `assets/example-b1-hero.jpg`
- Modify: `assets/README.md:1-9`

**Interfaces:**
- Consumes: `data-layout="B1"` 至 `data-layout="B6"`、共享 CSS 令牌和模块字段。
- Produces: 六个可独立复制的 `.card.layout-bN` 完整示例。

- [ ] **Step 1: 检查旧模板不满足六版式契约**

Run:

```powershell
$html = Get-Content -Raw "$repo\assets\template-card.html"
$count = ([regex]::Matches($html, 'data-layout="B[1-6]"')).Count
if ($count -eq 6) { throw 'template already implements B1-B6' }
Write-Output "current B layout count=$count"
```

Expected: 输出 `current B layout count=0`。

- [ ] **Step 2: 准备 B1 示例主视觉**

使用已批准的无文字机构研究空间图片，压缩为 JPEG：

```powershell
$src = 'C:\Users\Administrator.DESKTOP-OPKAITA\.codex\generated_images\019f4a6e-391b-72e2-a9e5-6fe8e1da7412\exec-6a3da014-b425-4cec-bc9b-8214d6cfa412.png'
$dst = "$repo\assets\example-b1-hero.jpg"
python -c "from PIL import Image; im=Image.open(r'$src').convert('RGB'); im.save(r'$dst','JPEG',quality=88,optimize=True)"
if (-not (Test-Path $dst)) { throw 'JPEG conversion failed' }
```

图片只作版式示例；运行时必须替换成与分析对象相关的合格图片。

- [ ] **Step 3: 重写模板共享 CSS**

模板根令牌必须包含：

```css
:root {
  --ink: #111111;
  --paper: #fdfdfb;
  --surface: #f2f2ef;
  --line: #dededa;
  --up: #c0392b;
  --down: #1e9e5a;
  --muted: #6b6b68;
}
.card { width:1080px; height:1440px; overflow:hidden; }
.num { font-variant-numeric:tabular-nums; }
.up { color:var(--up); }
.down { color:var(--down); }
```

任何布局都不得使用阴影、圆角卡套卡、渐变文字或装饰性色块。

- [ ] **Step 4: 实现六个完整 `<section>`**

每个版式必须使用以下稳定标识：

```html
<section class="card layout-b1" data-layout="B1">...</section>
<section class="card layout-b2" data-layout="B2">...</section>
<section class="card layout-b3" data-layout="B3">...</section>
<section class="card layout-b4" data-layout="B4">...</section>
<section class="card layout-b5" data-layout="B5">...</section>
<section class="card layout-b6" data-layout="B6">...</section>
```

六张卡都必须包含 `.meta-strip`、`.source-line`、`.compliance-foot`；B1 使用 `example-b1-hero.jpg`，B4 使用三个证据槽，其余版式不要求图片。

- [ ] **Step 5: 更新素材说明**

`assets/README.md` 必须说明：

```markdown
- 模板包含 B1-B6 六种方案 B 版式。
- 复制最匹配的一个 `.card`，不要把六张都交付给客户。
- B1 图片不合格时改用 B2/B3/B5/B6，不保留空图片槽。
- `example-b1-hero.jpg` 仅为视觉示例，不得作为任何公司或行业事实证据。
```

- [ ] **Step 6: 运行结构契约检查**

Run:

```powershell
$html = Get-Content -Raw "$repo\assets\template-card.html"
$layouts = [regex]::Matches($html, 'data-layout="(B[1-6])"') | ForEach-Object { $_.Groups[1].Value }
if (($layouts | Sort-Object -Unique).Count -ne 6) { throw "expected six unique layouts" }
foreach ($cls in 'meta-strip','source-line','compliance-foot') {
  if (([regex]::Matches($html, "class=\"[^\"]*$cls")).Count -lt 6) { throw "missing $cls" }
}
if ($html -match '#002FA7|#FFD500|#C5E803|#FF6B35') { throw 'legacy accent found' }
Get-Item "$repo\assets\example-b1-hero.jpg" | Where-Object Length -gt 0
git -C $repo diff --check
```

Expected: 六个唯一布局、每个固定件至少 6 次、无旧强调色、示例图片非空、差异检查通过。

- [ ] **Step 7: 浏览器视觉检查**

Run a temporary local server without adding project dependencies:

```powershell
python -m http.server 8765 --directory "$repo\assets"
```

检查：1080×1440、内容覆盖率、标题与块间距、页脚碰撞、图片裁切、手机缩略图、红绿语义。预期六张卡均完整，无横向滚动和溢出。

- [ ] **Step 8: 提交模板**

```powershell
git -C $repo add assets/template-card.html assets/example-b1-hero.jpg assets/README.md
git -C $repo commit -m "feat: add six card layouts for visual system B"
```

---

### Task 4: 更新 README 与人类说明文档

**Files:**
- Modify: `README.md:1-200`
- Modify: `docs/references.md:1-46`
- Modify: `docs/modules/caijing-fundamental.md`
- Modify: `docs/modules/caijing-earnings.md`
- Modify: `docs/modules/caijing-valuation.md`
- Modify: `docs/modules/caijing-risk.md`
- Modify: `docs/modules/caijing-industry.md`
- Modify: `docs/modules/caijing-ipo-a.md`
- Modify: `docs/modules/caijing-ipo-hk.md`

**Interfaces:**
- Consumes: 已完成的 B1-B6 事实源和模块映射。
- Produces: 面向人类的安装后能力说明，不复制方法论事实源。

- [ ] **Step 1: 更新 README 视觉与交付段落**

README 必须说明：统一方案 B、六版式、Claude/Codex 能力分层、图片可降级、默认 HTML + 截图、客户版按需。

- [ ] **Step 2: 更新共享层说明**

`docs/references.md` 新增 `codex-image-visuals.md`，并把 `card-components.md` 描述改为方案 B 唯一视觉事实源。

- [ ] **Step 3: 更新七模块说明页**

每页仅加入一行默认版式和可选版式，不复制 CSS、颜色或提示词规则。

- [ ] **Step 4: 运行文档一致性检查**

Run:

```powershell
rg -n '方案 B|B1-B6|Claude|Codex|默认.*HTML' "$repo\README.md" "$repo\docs\references.md"
$moduleDocs = Get-ChildItem "$repo\docs\modules" -File -Filter '*.md' | Select-Object -ExpandProperty FullName
$docs = rg -l '默认版式：B[1-6]' $moduleDocs
if (($docs | Measure-Object).Count -ne 7) { throw 'expected 7 module docs mappings' }
rg -n '墨账本 Swiss|视觉待定稿|模板未完成' "$repo\README.md" "$repo\docs" "$repo\SKILL.md" "$repo\references"
```

Expected: 新规则命中；七页均有映射；旧状态短语无命中，若命中必须逐条判断并删除过时表述。

- [ ] **Step 5: 提交说明文档**

```powershell
git -C $repo add README.md docs/references.md docs/modules
git -C $repo commit -m "docs: explain unified client card layouts"
```

---

### Task 5: 全量契约、视觉和合规验收

**Files:**
- Verify only: all files in repository

**Interfaces:**
- Consumes: Tasks 1-4 完成物。
- Produces: 可复核的验收结果和未完成项清单。

- [ ] **Step 1: 运行全量静态契约检查**

Run:

```powershell
rg -n 'B1 主视觉结论页|B2 超级数字页|B3 横向对比页|B4 证据墙页|B5 风险账本页|B6 产业链地图页' "$repo\references\card-components.md"
$moduleSkills = Get-ChildItem $repo -Directory -Filter 'caijing-*' | ForEach-Object { Join-Path $_.FullName 'SKILL.md' }
$moduleDocs = Get-ChildItem "$repo\docs\modules" -File -Filter '*.md' | Select-Object -ExpandProperty FullName
if ((rg -l '#### 客户版方案 B 映射' $moduleSkills | Measure-Object).Count -ne 7) { throw 'module mapping count failed' }
if ((rg -l '默认版式：B[1-6]' $moduleDocs | Measure-Object).Count -ne 7) { throw 'docs mapping count failed' }
rg -n '目标价|买入|卖出|闭眼打|稳赚' "$repo\assets\template-card.html"
git -C $repo diff --check
```

Expected: 六版式命中；两个计数均为 7；模板禁语无命中；差异检查通过。

- [ ] **Step 2: 检查零依赖属性**

Run:

```powershell
Get-ChildItem $repo -File | Where-Object Name -in 'package.json','package-lock.json','render-cards.mjs','validate-cards.mjs'
```

Expected: 无输出。

- [ ] **Step 3: 浏览器检查六版式桌面和手机缩略图**

对每个 `.card` 截取完整 1080×1440 图，再以 360px 宽查看。记录：标题可读、主数字可读、来源可读、无裁切、无页脚碰撞、无超过 16% 的无理由空白。

- [ ] **Step 4: 做 Claude 路径模拟**

从模板复制一个无图 B2 卡，填入估值示例数据。确认不依赖生图、Node 或外部资源，HTML 仍完整。

- [ ] **Step 5: 做 Codex 路径模拟**

使用 `example-b1-hero.jpg` 填一个 B1 基本面示例。确认图片无文字、标题安全区正确、数据仍在 HTML、图片不作为事实来源。

- [ ] **Step 6: 复核 Git 状态**

Run:

```powershell
git -C $repo status --short --branch
git -C $repo log --oneline -6
```

Expected: 只剩计划中明确保留的状态文件改动，或工作树干净；最近提交与 Tasks 1-4 对应。

---

### Task 6: 同步运行副本、状态与远端

**Files:**
- Sync target: `C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\rodya-caijing-studio\`
- Modify: `D:\AI\RodyaVault\00_System\Current_Status.md`
- Modify: `D:\AI\RodyaVault\00_System\AI_Change_Queue.md`
- Modify: `D:\AI\RodyaVault\90_Archive\AI_Change_Queue_Archive.md`

**Interfaces:**
- Consumes: 已通过 Task 5 的项目目录。
- Produces: 唯一运行副本、完成状态、已归档队列条目、远端同步提交。

- [ ] **Step 1: 同步 Codex 运行副本**

同步前检查 `~/.codex/skills/` 下只存在一个 `rodya-caijing-studio`。使用 Windows 原生 `robocopy` 或等价工具同步项目目录，排除 `.git` 和 `docs/superpowers`；不得在 `~/.codex/skills/` 内创建含 `SKILL.md` 的备份目录。

- [ ] **Step 2: 校验源目录与运行副本关键文件哈希**

Run:

```powershell
$src = "$repo\references\card-components.md"
$dst = "$env:USERPROFILE\.codex\skills\rodya-caijing-studio\references\card-components.md"
if ((Get-FileHash $src).Hash -ne (Get-FileHash $dst).Hash) { throw 'runtime copy mismatch' }
```

Expected: 无异常。

- [ ] **Step 3: 更新 Current_Status**

在财经内容台条目追加 2026-07-10 Codex 完成记录：统一方案 B、六版式、七模块映射、Claude/Codex 双路径、信息优先和留白规则、验收结果、提交哈希。

- [ ] **Step 4: 归档变更队列条目**

把「财经内容台客户卡片统一升级为方案 B」从待处理队列移入 `90_Archive/AI_Change_Queue_Archive.md`，状态改为已完成并记录提交。

- [ ] **Step 5: 最终验证并提交状态**

Run:

```powershell
git -C $repo status --short --branch
git -C $repo diff --check
```

如项目工作树存在计划内文档收尾改动，提交：

```powershell
git -C $repo add -A
git -C $repo commit -m "chore: finalize card visual system B"
```

- [ ] **Step 6: 推送项目仓库**

```powershell
git -C $repo push origin main
```

Expected: `main -> main` 成功，随后 `git status --short --branch` 显示 `main...origin/main` 且工作树干净。
