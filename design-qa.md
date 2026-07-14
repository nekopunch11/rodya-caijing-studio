# Design QA｜招商银行估值客户合规卡高密度正式样张

- Source visual truth：`docs/samples/cmb/招商银行_估值客户合规卡.png`
- Implementation：`docs/samples/cmb/招商银行_估值客户合规卡.html`
- Target viewport：1080 × 1440 px static card
- State：默认静态首屏

## Evidence

- 高密度 HTML 已替换原正式样张；用户已将当前正式样张实际截图保存为同名 PNG，README 嵌入该 PNG 并保留 HTML 源文件入口。
- 已目检保存的 PNG：含中性制作来源“由 Rodya-caijing-studio 制作”，不含“作者已审核”或任何个人背书；正文、数据栅格、双证据及跟踪区均可读。
- 受控浏览器仍受 `file://` URL 安全策略限制，未绕过该策略。PNG 的视觉事实源为用户从本机页面保存的实际截图，而非生成式图片或历史旧图。

## Required fidelity surfaces

- Typography：沿用现有中文无衬线 + 等宽数字的双字体规则；小字号元信息维持低对比层级。
- Spacing and layout rhythm：移除各区块均分留白，重组为估值结论、PB 分位、关键数据、双证据、跟踪事项。
- Colors and visual tokens：沿用炭黑、暖白、灰线，新增单一朱砂红表达负向变化与未确认状态。
- Image quality and asset fidelity：无新增图像资产；页面为数据卡静态排版。
- Copy and content：仅使用原样张及配套文案中已有数据和合规口径。

## Findings

- 无 P0/P1/P2 问题。PNG 为本机实际截图；后续如更改 HTML 内容、字体或画布高度，须重新截图替换同名 PNG，避免 README 预览与源文件漂移。

## Implementation checklist

1. 修改卡片 HTML 后，在本机重新导出同尺寸 PNG。
2. 替换 `docs/samples/cmb/招商银行_估值客户合规卡.png` 后，运行 README 合约检查。

## Comparison history

- Iteration 1：实现已完成；浏览器 URL 安全策略阻断本地渲染，未进行视觉比对。
- Iteration 2：用户确认高密度方向后，HTML 升格为正式样张；静态检查通过。
- Iteration 3：用户保存当前页面的实际 PNG；README 改为嵌入该 PNG，HTML 继续作为可检查的源文件。

final result: passed（基于用户保存的实际 PNG 与静态合约检查）
