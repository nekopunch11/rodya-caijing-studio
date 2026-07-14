# Design QA｜招商银行估值客户合规卡高密度草稿

- Source visual truth：`docs/samples/cmb/招商银行_估值客户合规卡.png`
- Implementation：`docs/samples/cmb/招商银行_估值客户合规卡.html`
- Target viewport：1080 × 1440 px static card
- State：默认静态首屏

## Evidence

- 已确认高密度 HTML 已替换原正式样张，旧 PNG 已删除；README 与样张链接的静态合约检查通过。
- 在受控浏览器中访问本地 `file://` 实现页时，被浏览器 URL 安全策略阻断；未绕过该策略，因此没有浏览器渲染截图。

## Required fidelity surfaces

- Typography：沿用现有中文无衬线 + 等宽数字的双字体规则；小字号元信息维持低对比层级。
- Spacing and layout rhythm：移除各区块均分留白，重组为估值结论、PB 分位、关键数据、双证据、跟踪事项。
- Colors and visual tokens：沿用炭黑、暖白、灰线，新增单一朱砂红表达负向变化与未确认状态。
- Image quality and asset fidelity：无新增图像资产；页面为数据卡静态排版。
- Copy and content：仅使用原样张及配套文案中已有数据和合规口径。

## Findings

- [P1] 自动渲染验证缺失。
  - Evidence：本地实现 URL 被浏览器安全策略阻断。
  - Impact：无法确认最终行高、字体回退和 1440 px 画布内是否溢出。
  - Fix：由本机浏览器打开 HTML 或提供允许访问的本地预览 URL 后，捕获 1080 × 1440 渲染图并进行目检。

## Implementation checklist

1. 在本机打开高密度草稿 HTML。
2. 审核页底与跟踪区在目标导出画布中的高度。
3. 确认后再替换主样张并更新 README 链接。

## Comparison history

- Iteration 1：实现已完成；浏览器 URL 安全策略阻断本地渲染，未进行视觉比对。
- Iteration 2：用户确认高密度方向后，HTML 升格为正式样张；静态检查通过，仍缺浏览器渲染截图。

final result: blocked
