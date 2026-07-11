# PPT Adaptive Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将财经内容台按需 PPT 正式升级为通用高级的「投顾内部研究汇报」系统，并保证真 `.pptx`、HTML deck、有图与无图路径使用同一结构化输入。

**Architecture:** `references/ppt-visual-spec.md` 是唯一执行视觉事实源；`SKILL.md` 与 `references/output-spec.md` 只负责触发和接线。`assets/deck-template.mjs` 导出纯数据规范化、主题解析、版式选择与 pptxgenjs renderer；`assets/template-deck.html` 内置同名 schema 和版式类型，作为零依赖 HTML/PDF renderer。`docs/` 仅保存人类设计与实施记录，不被运行时引用。

**Tech Stack:** Markdown、JavaScript ES modules、Node.js built-in test runner、pptxgenjs、单文件 HTML/CSS/JavaScript、PowerPoint/LibreOffice 渲染工具。

## Global Constraints

- PPT 仅在用户明确点名“汇报/PPT/deck/幻灯”时生成。
- 默认受众为 A：投顾内部研究汇报；本轮不实现 B 客户路演版。
- 高级感来自排版、字体、留白、密度、版式与图片配比，不固定任何行业色或冷银主题。
- 字体采用 MiSans + IBM Plex Mono；HTML 提供系统字体回退，PPT 缺字时允许 PowerPoint 字体替换。
- 每套 deck 只有一个 `accent`；`up/down` 只表达真实方向数据。
- 固定七类版式：`cover`、`overview`、`thesis`、`fundamental`、`valuation`、`risk`、`disclaimer`；`pipeline` 为可选扩展。
- 图片失败、缺失或质量不足时必须切换完整无图版式，不保留空图片槽。
- 不把任何样例公司、样例数字或图片路径硬编码进 renderer。
- 真 `.pptx` 保持项目既有 pptxgenjs 契约；通用 Presentations 技能的 artifact-tool 要求不替换用户已批准的项目 renderer。
- `docs/` 只供人类阅读；执行规则只进入根/子模块 `SKILL.md`、`references/` 与 `assets/`。

---

### Task 1: 建立失败的 PPT 视觉契约测试

**Files:**
- Create: `tests/ppt-visual-contract.test.mjs`

**Interfaces:**
- Consumes: 当前仓库文件树。
- Produces: Node 内建测试，验证视觉事实源、接线、纯函数 API、七类版式、无图降级和 HTML 同构标记。

- [ ] **Step 1: 写入失败测试**

测试必须使用 `node:test`、`node:assert/strict`、`fs`、`path`、`url`，并定义：

```js
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const requiredLayouts = [
  "cover", "overview", "thesis", "fundamental",
  "valuation", "risk", "disclaimer",
];
```

测试用例必须覆盖：

```js
test("execution sources point to references/ppt-visual-spec.md", () => {
  assert.ok(fs.existsSync(path.join(ROOT, "references/ppt-visual-spec.md")));
  assert.match(read("SKILL.md"), /references\/ppt-visual-spec\.md/);
  assert.match(read("references/output-spec.md"), /ppt-visual-spec\.md/);
});

test("docs design record is not an execution dependency", () => {
  for (const rel of ["SKILL.md", "AGENTS.md", "references/output-spec.md"])
    assert.doesNotMatch(read(rel), /docs\/superpowers/);
});

test("pptx renderer exposes adaptive pure functions", async () => {
  const mod = await import(pathToFileURL(path.join(ROOT, "assets/deck-template.mjs")));
  assert.deepEqual(mod.CANONICAL_LAYOUTS, requiredLayouts);
  assert.equal(mod.resolveTheme({ mode: "light", accent: "7A5C3E" }).accent, "7A5C3E");
  assert.equal(mod.chooseVisualVariant({ type: "cover" }), "cover-no-media");
  assert.equal(
    mod.chooseVisualVariant({ type: "cover", visual_asset: { path: "hero.png" } }),
    "cover-media"
  );
});

test("HTML renderer shares schema, tokens and layout types", () => {
  const html = read("assets/template-deck.html");
  for (const token of ["surface", "surface_alt", "ink", "muted", "hairline", "accent", "up", "down", "scrim"])
    assert.match(html, new RegExp(token));
  for (const layout of requiredLayouts)
    assert.match(html, new RegExp(`data-layout=["']${layout}["']|type:\\s*["']${layout}["']`));
  assert.match(html, /visual_asset/);
  assert.match(html, /no-media/);
});

test("renderers contain no fixed sample company", () => {
  for (const rel of ["assets/deck-template.mjs", "assets/template-deck.html"])
    assert.doesNotMatch(read(rel), /宁德时代|300750/);
});
```

- [ ] **Step 2: 运行测试并确认 RED**

Run:

```powershell
$NODE = "C:\Users\Administrator.DESKTOP-OPKAITA\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
& $NODE --test tests/ppt-visual-contract.test.mjs
```

Expected: FAIL，至少报告 `references/ppt-visual-spec.md` 不存在或 `CANONICAL_LAYOUTS` 未导出；失败原因必须来自缺少新功能，而不是语法错误。

---

### Task 2: 建立执行视觉事实源并完成 skill 接线

**Files:**
- Create: `references/ppt-visual-spec.md`
- Modify: `references/output-spec.md`
- Modify: `SKILL.md`

**Interfaces:**
- Consumes: 已批准的人类设计蓝图 `docs/superpowers/specs/2026-07-10-ppt-adaptive-visual-system-design.md`。
- Produces: 运行时唯一 PPT 视觉事实源和明确的触发/渲染接线。

- [ ] **Step 1: 新建 `references/ppt-visual-spec.md`**

正文必须包含以下可执行章节：定位与非范围、十二列网格、字体、主题令牌、颜色纪律、留白与密度、研究命题标题、`1+3` 数据层级、七类版式、图片决策树、Codex/Claude 双路径、共用 schema、失败处理、QA 清单。开头明确：

```markdown
# PPT 视觉规范（唯一执行事实源）

本文件是财经内容台 PPT 的唯一执行视觉事实源。`docs/` 下的设计文档仅供人类阅读，不参与运行时执行。
```

- [ ] **Step 2: 精简并改写 `references/output-spec.md` 的 PPT 段落**

保留按需触发、默认真 `.pptx`、HTML 备选与口径切换；删除墨账本固定配色描述，改为：

```markdown
- **视觉规范唯一事实源见 [ppt-visual-spec.md](ppt-visual-spec.md)**；生成 PPT 前必读。
- 默认受众为投顾内部研究汇报，使用研究命题式标题、自适应主题、七类版式和有图/无图双路径。
- 真 `.pptx` 与 HTML deck 必须消费同一结构化内核，不得各写一份内容。
```

- [ ] **Step 3: 更新 `SKILL.md` 接线**

在渲染步骤与共享层表中加入 `ppt-visual-spec.md`，并把“三形态视觉均已定稿”的 PPT 描述改为引用该事实源。不得引用 `docs/`。

- [ ] **Step 4: 运行契约测试**

Run: `& $NODE --test tests/ppt-visual-contract.test.mjs`

Expected: 执行事实源与接线测试 PASS；renderer 相关测试仍 FAIL。

---

### Task 3: 重构真 `.pptx` renderer

**Files:**
- Modify: `assets/deck-template.mjs`
- Test: `tests/ppt-visual-contract.test.mjs`

**Interfaces:**
- Consumes: `deck` 对象，字段为 `title`、`subject`、`as_of`、`theme`、`slides[]`。
- Produces:
  - `CANONICAL_LAYOUTS: string[]`
  - `OPTIONAL_LAYOUTS: string[]`
  - `resolveTheme(theme): ThemeTokens`
  - `normalizeDeck(input): NormalizedDeck`
  - `chooseVisualVariant(slide): string`
  - `buildPresentation(deck, PptxGenJS): Presentation`
  - `writePresentation({ inputPath, outputPath }): Promise<void>`

- [ ] **Step 1: 扩展失败测试**

新增测试：未知主题回落 `light`；十六进制颜色清洗；七类版式排序稳定；图片文件不存在时 `normalizeDeck` 删除 `visual_asset`；`up/down` 不等于 `accent`；缺少结论时抛出可读错误。

- [ ] **Step 2: 运行扩展测试并确认 RED**

Run: `& $NODE --test tests/ppt-visual-contract.test.mjs`

Expected: FAIL，指出纯函数尚未实现。

- [ ] **Step 3: 实现纯函数与 CLI**

主题默认值必须由模式决定，但允许传入用户/品牌 `accent`：

```js
export const CANONICAL_LAYOUTS = Object.freeze([
  "cover", "overview", "thesis", "fundamental",
  "valuation", "risk", "disclaimer",
]);
export const OPTIONAL_LAYOUTS = Object.freeze(["pipeline"]);

export function chooseVisualVariant(slide) {
  const hasMedia = Boolean(slide?.visual_asset?.path && fs.existsSync(slide.visual_asset.path));
  return `${slide.type}-${hasMedia ? "media" : "no-media"}`;
}
```

CLI 只接受用户 JSON，不内置样例公司：

```powershell
node assets/deck-template.mjs --input deck-data.json --output report.pptx
```

未给 `--input` 时打印用法并退出 1；renderer 内通过 `createRequire(import.meta.url)("pptxgenjs")` 延迟加载依赖。

- [ ] **Step 4: 实现七类 renderer 与可选 Pipeline**

每页固定使用 16:9、十二列坐标、直角和发丝线；封面有图占 35%–50%，无图时标题扩展；总览无图；thesis 图片最多 30%；fundamental 图片 0%–25%；valuation/risk 默认无图；免责声明不引入新题材。图片使用 pptxgenjs `sizing: { type: "cover", w, h }`，不得拉伸。

- [ ] **Step 5: 运行单元测试**

Run: `& $NODE --test tests/ppt-visual-contract.test.mjs`

Expected: PPTX 纯函数与静态契约 PASS。

---

### Task 4: 重构 HTML 同构 renderer

**Files:**
- Modify: `assets/template-deck.html`
- Test: `tests/ppt-visual-contract.test.mjs`

**Interfaces:**
- Consumes: `<script id="deck-data" type="application/json">` 中与 PPTX renderer 相同的 `deck` schema。
- Produces: 单 HTML、七类版式、可选 Pipeline、键盘/滚轮/触屏/圆点导航、打印 PDF、有图/无图切换。

- [ ] **Step 1: 扩展失败测试**

增加断言：CSS 包含九个 `--deck-*` 主题变量；脚本读取 `deck-data`；不存在固定 `#111111` 品牌锁色说明；存在 `renderers` 映射和 `mediaAvailable()`；图片缺失时添加 `no-media` 类。

- [ ] **Step 2: 运行并确认 RED**

Run: `& $NODE --test tests/ppt-visual-contract.test.mjs`

Expected: FAIL，指出 HTML 仍为静态墨账本。

- [ ] **Step 3: 实现同构 HTML**

HTML 只保留通用占位数据，不包含公司名、股票代码和固定图片。初始化顺序：解析 JSON → 解析主题 → 设置 CSS 变量 → 逐页调用 layout renderer → 初始化导航。图片路径不可用时必须返回无图 DOM，不创建空 `<img>`。

- [ ] **Step 4: 运行契约测试**

Run: `& $NODE --test tests/ppt-visual-contract.test.mjs`

Expected: 全部 PASS。

---

### Task 5: 更新资产说明并生成双路径样张

**Files:**
- Modify: `assets/README.md`
- Create in scratch only: `deck-sample-with-media.json`
- Create in scratch only: `deck-sample-no-media.json`
- Create in scratch only: `ppt-a-with-media.pptx`
- Create in scratch only: `ppt-a-no-media.pptx`

**Interfaces:**
- Consumes: 同一份七页样张内容；有图版仅多 `visual_asset`。
- Produces: 两套结构和数据一致的七页 PPTX 及 HTML QA 版本。

- [ ] **Step 1: 更新 `assets/README.md`**

写明模板版本、唯一事实源、JSON schema、CLI、三种主题模式、七类版式、图片比例、Codex 生图增强、Claude 用户供图/纯排版回退，以及 `docs/` 不参与执行。

- [ ] **Step 2: 创建同源样张 JSON**

叙事固定为：研究命题封面 → 综合结论 → 投资逻辑与核心矛盾 → 基本面/财报 → 估值坐标 → 风险证伪 → 免责声明。使用显式“演示数据”标记，不伪装为真实投资研究；两份 JSON 除 `visual_asset` 外完全一致。

- [ ] **Step 3: 生成内容驱动主视觉**

使用 imagegen 生成真实材质、编辑摄影质感、无文字/Logo/数字/图表的 16:9 图片；只保存到 scratch QA 目录，不写入 skill 资产。若生成质量不达标，弃图并保留无图样张。

- [ ] **Step 4: 生成 PPTX**

Run:

```powershell
$env:NODE_PATH = "C:\Users\Administrator.DESKTOP-OPKAITA\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules"
& $NODE assets/deck-template.mjs --input <with-media.json> --output <with-media.pptx>
& $NODE assets/deck-template.mjs --input <no-media.json> --output <no-media.pptx>
```

Expected: 两个文件均生成，均为 7 页。

- [ ] **Step 5: 结构与视觉 QA**

使用 `render_slides.py` 渲染两套 PPTX，使用 `slides_test.py` 检查越界；逐页查看 14 张 PNG，contact sheet 只检查节奏。至少使用 Microsoft PowerPoint 原生导出复核封面、估值、风险三页。任何非预期重叠、裁切、换行、空图槽或页脚不一致都必须修复后重跑。

---

### Task 6: 技能验证、运行副本同步与治理收尾

**Files:**
- Modify: `00_System/Current_Status.md`（外层 Vault）
- Modify: `00_System/AI_Change_Queue.md`（移除已办结条目）
- Modify: `90_Archive/AI_Change_Queue_Archive.md`（归档条目）
- Sync runtime: `C:\Users\Administrator.DESKTOP-OPKAITA\.codex\skills\rodya-caijing-studio\`

**Interfaces:**
- Consumes: 通过 QA 的执行文件。
- Produces: 唯一运行副本、哈希一致性记录、可追溯提交和治理状态。

- [ ] **Step 1: 运行完整验证**

Run:

```powershell
& $NODE --test tests/ppt-visual-contract.test.mjs
git diff --check
git status --short
```

再运行 skill-creator 的 `quick_validate.py`；Expected: 测试 0 失败、无格式错误、skill 验证通过。

- [ ] **Step 2: 同步运行副本**

只同步生产文件：根/子模块 `SKILL.md`、`references/`、`assets/`、`agents/`；不要求同步 `docs/` 和 `tests/`。对本轮关键生产文件逐一做 SHA-256 比对，必须全部一致。

- [ ] **Step 3: 更新治理文件**

在 `Current_Status.md` 增量记录完成状态和提交；将本轮队列条目从 `AI_Change_Queue.md` 移入归档，保留验证结果。不得覆盖外层 Vault 已存在的其他未提交修改。

- [ ] **Step 4: 提交独立 skill 仓库**

```powershell
git add SKILL.md references/ppt-visual-spec.md references/output-spec.md assets/deck-template.mjs assets/template-deck.html assets/README.md tests/ppt-visual-contract.test.mjs docs/superpowers/plans/2026-07-10-ppt-adaptive-visual-system-implementation.md
git diff --cached --check
git commit `
  -m "feat(ppt): 正式落地通用高级内部研究视觉系统" `
  -m "新增 PPT 唯一执行视觉事实源、自适应主题与七类版式；升级 PPTX/HTML 同构 renderer；加入有图/无图降级和自动契约测试，并完成运行副本同步与双路径样张 QA。"
```

- [ ] **Step 5: 提交后核验并向用户提供 push 命令**

Run: `git log -1 --format=fuller; git status --short`

Expected: 最新提交标题和正文完整、独立 skill 工作树干净。向用户提供含 `cd`、`git push origin main`、`git fetch origin`、`git rev-parse HEAD`、`git rev-parse origin/main` 的命令；只有两个 SHA 相同时才宣称 GitHub 同步完成。
