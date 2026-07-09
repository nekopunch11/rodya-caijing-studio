# references 共享层说明

`references/` 是财经内容台的共享规则层。它不是给用户阅读的营销文案，而是各模块在执行时按需读取的统一口径。所有子模块都应优先服从 `SKILL.md` 的路由，再按需要读取这里的具体规则文件。

## 文件一览

| 文件 | 作用 | 什么时候读 |
|---|---|---|
| `compliance.md` | 合规底线：禁用词、两口径分层、免责声明、客户版 checklist | 每次输出前必读 |
| `compliance-rendering.md` | 客户版渲染降级：把评级、档位、受益、打新表达改成客观信息 | 生成客户版卡片或文案时必读 |
| `data-sourcing.md` | 数据源优先级、来源标注、确定性分级、口径纪律 | 取数时必读 |
| `data-fallback.md` | 联网失败、缺一手材料、数据冲突、样本不足时的降级规则 | 关键数据缺失或冲突时必读 |
| `output-spec.md` | 结构化分析内核、docx/卡片/PPT 的渲染规则、视觉模板未完成前的交付降级 | 产出内核和交付物时必读 |
| `formulas-and-thresholds.md` | ROIC/WACC、反向 DCF、M-Score、Z-Score、红黄绿扫描、IPO 分档等公式阈值 | 涉及计算、评分、分档时必读 |
| `sector-adapters.md` | 银行、保险、券商、地产、周期、18A/18C、平台型公司等行业适配 | 个股基本面或估值分析前必读 |
| `card-components.md` | 卡片结构硬点、功能位、模块签名图形建议、视觉 token 占位 | 生成卡片结构稿或未来视觉模板时读 |

## 设计原则

- `SKILL.md` 负责模块路由和主流程。
- `references/` 负责统一规则，避免七个模块重复维护。
- 详细规则只写一处，模块只引用，不复制。
- 取数、公式、合规、行业适配一旦冲突，以更严格的规则为准。

## 合规优先级

遇到冲突时按以下顺序处理：

1. `compliance.md`
2. `compliance-rendering.md`
3. `data-fallback.md`
4. `data-sourcing.md`
5. `formulas-and-thresholds.md`
6. `sector-adapters.md`
7. 各模块 `SKILL.md`

这个顺序的意思是：宁可少说、降级、留白，也不要为了完整性输出不可靠或有建议感的内容。

## 执行事实源

本文件只解释 `references/` 的职责分工，不替代任何具体规则。实际执行以各引用文件正文和对应模块 `SKILL.md` 为准。
