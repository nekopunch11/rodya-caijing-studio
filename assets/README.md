# assets/

卡片与视觉素材目录。

- `template-card.html` — 客户版卡片模板（墨账本 Swiss，3:4 / 1080×1440）。v0.2：七个模块（基本面/财报/估值/排雷/产业链/A股打新/港股打新）各一张完整卡片，复制对应 `.card` 填数即用。规范唯一事实源见 [`../references/card-components.md`](../references/card-components.md)。
- `template-deck.html` — 汇报 PPT 模板（墨账本 Swiss · HTML 翻页 deck，16:9）。v0.1：封面/总览/模块页/数据大字报/Pipeline/风险汇总/免责 七版式；浏览器打开翻页演示，`Ctrl/Cmd+P` 打印成 PDF。零依赖。规范见 [`../references/output-spec.md`](../references/output-spec.md) §三③。
- `deck-template.mjs` — 汇报 PPT 生成器（pptxgenjs 墨账本，出真 .pptx 参考母版）。PPT 默认形态，见 output-spec §三③；示例数据换成真实内核即用。
- `logo.svg` — skill 图标（墨黑瓦片 + 招牌带 + 红涨绿跌蜡烛），openai.yaml 引用。
- `qrcode-wechat.jpg` — 公众号二维码素材。

待补：字体子集（可选）。
