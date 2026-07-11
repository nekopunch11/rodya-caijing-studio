# assets/

卡片与实际输出模板目录。`docs/` 只供人类阅读；运行时视觉规则位于 `references/`。

- `template-card.html` — 客户版卡片模板（墨账本 Swiss，3:4 / 1080×1440）。v0.4：七模块各一张完整数据台卡片，每卡含 6 项指标 + 3 项跟踪/证伪指标；规范唯一事实源见 [`../references/card-components.md`](../references/card-components.md)。
- `deck-template.mjs` — 真 `.pptx` renderer（pptxgenjs）。v1.0：接受结构化 deck JSON，自适应 `light / dark / media-led` 主题，支持 `cover / overview / thesis / fundamental / valuation / risk / disclaimer` 七类固定版式与可选 `pipeline`；图片不存在时自动切换完整无图布局。
- `template-deck.html` — 零依赖 HTML/PDF renderer。v1.0：与真 `.pptx` 使用同名 schema、主题令牌和版式；支持键盘、圆点、滚轮、触屏翻页与 `Ctrl/Cmd+P` 打印 PDF；图片加载失败时移除媒体区域，不保留空槽。
- `logo.svg` — skill 图标，供 `agents/openai.yaml` 使用。
- `qrcode-wechat.jpg` — 公众号二维码素材。

PPT 唯一执行视觉事实源见 [`../references/ppt-visual-spec.md`](../references/ppt-visual-spec.md)。PPT 仅在用户明确点名时生成，默认受众为投顾内部研究；颜色不固定，一套 deck 只有一个 `accent`，`up/down` 只表达真实方向数据。

## 真 `.pptx` 用法

```powershell
npm install pptxgenjs
node assets/deck-template.mjs --input deck-data.json --output report.pptx
```

`deck-data.json` 最小结构：

```json
{
  "title": "研究命题",
  "subject": "标的 / 代码 / 市场",
  "as_of": "YYYY-MM-DD",
  "theme": { "mode": "light", "accent": "8B6F47" },
  "slides": [
    { "type": "cover", "conclusion": "本页结论" }
  ]
}
```

可选 `visual_asset.path` 必须是已存在的本地图片。Codex 可先用 imagegen 生成资产再传路径；Claude 使用用户供图或省略该字段。renderer 本身不调用生图 API。

待补：字体子集（可选）。
