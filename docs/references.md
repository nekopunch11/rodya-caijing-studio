# references 共享层说明

`references/` 是财经内容台的共享规则层。它不是给用户阅读的营销文案，而是各模块在执行时按需读取的统一口径。所有子模块都应优先服从 `SKILL.md` 的路由，再按需要读取这里的具体规则文件。

## 文件一览

| 文件 | 作用 | 什么时候读 |
|---|---|---|
| `compliance.md` | 合规底线：禁用词、两口径分层、免责声明、客户版 checklist | 每次输出前必读 |
| `compliance-rendering.md` | 客户版渲染降级：把评级、档位、受益、打新表达改成客观信息 | 生成客户版卡片或文案时必读 |
| `data-sourcing.md` | 数据源优先级、来源标注、确定性分级、口径纪律 | 取数时必读 |
| `data-fallback.md` | 联网失败、缺一手材料、数据冲突、样本不足时的数据档次、受限结论与补充提示规则 | 关键数据缺失或冲突时必读 |
| `freshness-gate.md` | 时效核验 gate：财报最新期、招股期状态、孖展/统计/费率时间窗，超窗重取或提示时效存疑 | 每次取数前必读（earnings/ipo-a/ipo-hk 有模块专属 gate） |
| `output-spec.md` | 结构化分析内核、docx/卡片/PPT 的渲染规则、专业版文件与篇幅底线、客户版按需规则 | 产出内核和交付物时必读 |
| `docx-visual-spec.md` | docx 专业版视觉规范（唯一视觉事实源）：炭黑金配色、思源宋体/MiSans 字体、首页版式、数字四件套、编号图表来源纪律、风险章节渲染要求 | 渲染专业版 docx 时必读 |
| `research-methods.md` | A股/港股研究方法论：三情景、逻辑支柱、同业四分位、行业关键指标、利润池五因子、竞争分类、瓶颈点、证伪链、排雷恶化因子 | 涉及基本面、财报、估值、产业链、排雷、打新方法论时读 |
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
4. `freshness-gate.md`
5. `data-sourcing.md`
6. `formulas-and-thresholds.md`
7. `research-methods.md`
8. `sector-adapters.md`
9. 各模块 `SKILL.md`

这个顺序的意思是：宁可少说、标注受限结论、留白，也不要为了完整性输出不可靠或有建议感的内容；但不得因数据档次把专业版文件降成短评或空框架。

## 执行事实源

本文件只解释 `references/` 的职责分工，不替代任何具体规则。实际执行以各引用文件正文和对应模块 `SKILL.md` 为准。
