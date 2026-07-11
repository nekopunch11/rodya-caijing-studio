# references 共享层说明

`references/` 是财经内容台的共享规则层。它不是给用户阅读的营销文案，而是各模块在执行时按需读取的统一口径。所有子模块都应优先服从 `SKILL.md` 的路由，再按需要读取这里的具体规则文件。

## 文件一览

| 文件 | 作用 | 什么时候读 |
|---|---|---|
| `research-safety-gate.md` | 行动安全 gate：只约束具体资金、仓位、杠杆、个性化申购、模型概率与机构复核 | 涉及具体动作时必读；普通研究不做身份分流 |
| `fundamental-proof-chain.md` | 基本面结论证明协议：判断识别、完整推导、断链 Gate、框架外扫描、重要性 Gate 和正文/附录分工 | 执行 `caijing-fundamental` 时必读 |
| `compliance.md` | 合规底线：研究判断与交易动作边界、免责声明、客户版 checklist | 每次输出前必读 |
| `compliance-rendering.md` | 客户合规渲染：保留证据化研究判断，删除交易动作和个性化资金内容 | 生成任一客户版形态时必读 |
| `data-sourcing.md` | 数据源优先级、来源标注、确定性分级、口径纪律 | 取数时必读 |
| `data-fallback.md` | 联网失败、缺一手材料、数据冲突、样本不足时的数据档次、受限结论与补充提示规则 | 关键数据缺失或冲突时必读 |
| `freshness-gate.md` | 时效核验 gate：财报最新期、招股期状态、孖展/统计/费率时间窗，超窗重取或提示时效存疑 | 每次取数前必读（earnings/ipo-a/ipo-hk 有模块专属 gate） |
| `output-spec.md` | 统一专业内核、受众口径、docx/卡片/PPT 形态、证据完整度与按需触发 | 产出内核和交付物时必读 |
| `docx-visual-spec.md` | docx 专业版视觉规范（唯一视觉事实源）：炭黑金配色、思源宋体/MiSans 字体、首页版式、数字四件套、编号图表来源纪律、风险章节渲染要求 | 渲染专业版 docx 时必读 |
| `research-methods.md` | A股/港股研究方法论：逻辑支柱、管理层与资本配置、预期/调整项桥、正常化估值、模型误报控制、产业暴露、IPO 滚动复盘等 | 涉及基本面、财报、估值、产业链、排雷、打新方法论时读 |
| `formulas-and-thresholds.md` | ROIC/WACC、反向 DCF、M-Score、Z-Score、Wilson 置信区间、红黄绿扫描、IPO 分档等公式阈值 | 涉及计算、评分、分档时必读 |
| `sector-adapters.md` | 银行、保险、券商、地产、周期、18A/18C、平台型公司等行业适配 | 个股基本面或估值分析前必读 |
| `card-components.md` | 客户版卡片视觉规范（定稿）：墨账本 Swiss、墨黑招牌带、红绿只给涨跌数据、3:4、模块签名图形 | 生成客户版卡片时读 |

## 设计原则

- `SKILL.md` 负责模块路由和主流程。
- `references/` 负责统一规则，避免七个模块重复维护。
- 详细规则只写一处，模块只引用，不复制。
- 取数、公式、合规、行业适配一旦冲突，以更严格的规则为准。

## 合规优先级

遇到冲突时按以下顺序处理：

1. `research-safety-gate.md`
2. `compliance.md`
3. `compliance-rendering.md`
4. `data-fallback.md`
5. `freshness-gate.md`
6. `data-sourcing.md`
7. `fundamental-proof-chain.md`（仅基本面场景强制）
8. `formulas-and-thresholds.md`
9. `research-methods.md`
10. `sector-adapters.md`
11. 各模块 `SKILL.md`

这个顺序的意思是：先确认场景与授权边界，再做合规、证据和方法判断。宁可标注受限结论，也不要输出伪精确概率或无证据资金指令；专业版仍需完成规定分析块，但不设机械字数下限。

## 执行事实源

本文件只解释 `references/` 的职责分工，不替代任何具体规则。实际执行以各引用文件正文和对应模块 `SKILL.md` 为准。
