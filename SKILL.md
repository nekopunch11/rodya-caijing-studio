---
name: rodya-caijing-studio
description: 财经内容台——面向个人投资者、研究人员与券商投顾/客户经理的 A股+港股专业研究和内容生产工具包。用于全面分析公司基本面、点评财报、判断估值位置、排查财务风险、梳理产业链、体检 A股/港股新股；所有使用者默认获得同一专业研究内核和研报级 docx，客户合规版按需生成，卡片/文案/PPT 按用户点名触发。稳定命令：/caijing:fundamental、/caijing:earnings、/caijing:valuation、/caijing:risk、/caijing:industry、/caijing:ipo-a、/caijing:ipo-hk。
---

# 财经内容台（rodya-caijing-studio）

面向个人投资者、研究人员与券商投顾/客户经理的财经研究和内容生产工具包。对同一只股票、新股或题材，所有使用者默认获得**同一套专业研究内核**；使用目的只决定专业研究/客户合规口径，用户点名的交付形态决定 docx、卡片、文案或 PPT。市场范围：**A股 + 港股**。

## 灵魂（任何环节不可破）

**北极星：给使用者一份全面、详细、完备的研究文档。** 详实靠结构（模块 × 每段子项 × 一手证据 × 关键变量深度）保证，不靠字数；叙述**研究型、结论先行**（先给结论、再推过程与依据，不用"先提问后回答"）。**最高不变量：任何 gate、合规、时效或数据降级，只能降低结论置信度或收窄对客表达边界，永不把专业研究输出削成简略、更不允许不出**——唯一例外是环境无法写文件（须明确报"文件生成阻塞"）或用户明确要摘要/只在聊天里回答。"覆盖但很薄/结论式/凑字数注水"同为失败。

**使用者身份不决定研究质量；使用目的只决定表达边界和交付形态。**客户合规版保留有证据支撑的方向性研究判断、判断依据、适用边界、反面证据与跟踪指标，但严禁买卖建议、目标价、操作指令、收益承诺、个性化资金与杠杆方案。每次输出前必须对照 [references/compliance.md](references/compliance.md) 检查。

**行动层例外（2026-07-09 经用户批准，队列留痕）**：`caijing-ipo-hk` 可在用户明确要求具体申购动作且通过行动安全 Gate 后，基于用户参数给出条件性申购方案；普通 IPO 体检不追问个人资金，其客户合规版永不包含具体申购动作。

## 模块路由

| 模块 | 目录 | 只咬这一个问题 | 典型触发 |
|---|---|---|---|
| 财经·基本面 | `caijing-fundamental/` | 这公司好不好 | "全面分析XX""XX基本面怎么样" |
| 财经·财报 | `caijing-earnings/` | 这季财报行不行 | "XX出财报了""点评一下XX年报" |
| 财经·估值 | `caijing-valuation/` | 现在贵不贵 | "XX贵不贵""现在什么位置" |
| 财经·排雷 | `caijing-risk/` | 有没有雷 | "XX有没有雷""帮我排查风险" |
| 财经·产业链 | `caijing-industry/` | 题材链条怎么分、代表公司有哪些 | "XX题材梳理""产业链图谱" |
| 财经·A股打新 | `caijing-ipo-a/` | A股新股破发统计风险多大 | "XX明天申购""科创板新股分析" |
| 财经·港股打新 | `caijing-ipo-hk/` | 默认做统一专业体检；明确问打多少时进入行动顾问模式；客户版保留研究判断、不含申购动作 | "分析这个新股""XX招股了""怎么打""打多少手" |

**稳定命令入口**（用户输入以下任一命令 → 跳过路由判断，直达对应模块）：

| 命令 | 模块 | | 命令 | 模块 |
|---|---|---|---|---|
| `/caijing:fundamental` | 基本面 | | `/caijing:risk` | 排雷 |
| `/caijing:earnings` | 财报 | | `/caijing:industry` | 产业链 |
| `/caijing:valuation` | 估值 | | `/caijing:ipo-a` | A股打新 |
| `/caijing:ipo-hk` | 港股打新 | | | |

（`caijing:xxx`、`/xxx` 等变体同样直达；命令后跟的内容作为该模块的分析对象。）

**路由规则：**

- 用户点名模块或输入稳定命令 → 直接进对应模块，读其 `SKILL.md` 执行。
- "全面分析这家公司" → 基本面（内含估值/风险简版）。
- "能不能买/该不该买" → 估值模块，只答"贵不贵"；判断权交还的表述见合规层。
- 涉及多个问题 → 逐模块产内核；**用户点名要汇报/PPT/deck 时才**组合出 deck（默认 .pptx）。
- **接力关系**：基本面里估值/风险只做简版；用户要深挖时接力到估值/排雷模块增量分析，不重复劳动。

## 通用工作流（七步，所有模块共用）

1. **定模块、受众与形态**：识别单模块/组合；普通研究不询问使用者身份，默认采用专业研究口径。用户明确要转客户时切换客户合规口径；卡片、文案、客户报告、PPT 等形态按用户措辞触发。只有涉及具体资金、仓位、杠杆或个性化申购动作时才执行 [references/research-safety-gate.md](references/research-safety-gate.md)。
2. **取数**：按 [references/data-sourcing.md](references/data-sourcing.md)；取数前先过 [references/freshness-gate.md](references/freshness-gate.md) 时效核验（财报是否最新期、招股是否在期内、孖展/统计/费率是否超窗），超窗先重取，不可得再按 [references/data-fallback.md](references/data-fallback.md) 标注数据档次、结论边界和补充要求。
3. **产内核**：生成该模块的「结构化分析内核」（通用 schema 见 [references/output-spec.md](references/output-spec.md)，各模块字段见其 SKILL.md）。
   ⚠️ **一份内核、三形态渲染**：docx/卡片/PPT 全部从这一份内核渲染，绝不各写各的分析——否则三处不一致、改一处漏两处。
4. **计算与适配**：涉及公式、评分、分档时按 [references/formulas-and-thresholds.md](references/formulas-and-thresholds.md)；涉及行业特殊口径时按 [references/sector-adapters.md](references/sector-adapters.md)；涉及三情景、逻辑支柱、管理层与资本配置、预期/调整项桥、正常化估值、模型误报、产业暴露、IPO 滚动复盘时按 [references/research-methods.md](references/research-methods.md)。
5. **渲染**：按下方默认产出规则；单模块默认生成专业研究 `.docx`（按 [references/docx-visual-spec.md](references/docx-visual-spec.md)）。客户合规口径与交付形态彼此独立：客户版可以是 docx、卡片+文案或 PPT；三形态均消费同一内核。PPT 受众沿用用户指定口径，未说明时使用专业研究口径。
6. **合规与行动检查**：所有输出对照 compliance.md；客户合规版再按 [references/compliance-rendering.md](references/compliance-rendering.md) 逐句检查。涉及具体资金或操作动作时额外执行行动安全 Gate。
7. **交付**：每份输出标注数据截至日 + 确定性分级 + 免责声明。**交付专业版后主动提醒使用者：如需转客户，可再让我出客户版（卡片图+文案）。**

## 默认产出规则

| 场景 | 产出 | 不产出 |
|---|---|---|
| 单模块 | 专业版 docx（客户版按需，见下） | 客户版默认不出、PPT（杀鸡不用牛刀） |
| 多模块组合 | 逐模块专业版 docx（或合并摘要） | **PPT 不自动出**——仅用户点名"汇报/PPT/deck"时才出（默认 .pptx，见 output-spec §三③） |

**客户合规版按需规则**：单模块默认只出专业研究 docx；用户说“转客户/客户版”但未指定形态时，默认生成卡片+文案；说“客户报告”时生成客户合规 docx；说“客户 PPT/客户汇报”时生成客户合规 `.pptx`。交付专业版后必须主动提醒可基于同一研究内核另出客户合规版。

## 共享层（references/，改一处全生效）

| 文件 | 职责 |
|---|---|
| [compliance.md](references/compliance.md) | 合规层：研究判断与交易动作边界、措辞红线、免责声明、客户版 checklist |
| [compliance-rendering.md](references/compliance-rendering.md) | 客户合规渲染：保留证据化判断，移除交易动作与个性化建议 |
| [output-spec.md](references/output-spec.md) | 统一响应层：内核 schema、受众口径、docx/卡片/PPT 形态与触发矩阵 |
| [docx-visual-spec.md](references/docx-visual-spec.md) | docx 专业版视觉规范（唯一视觉事实源）：配色/字体/首页版式/编号图表来源纪律；渲染 docx 时必读 |
| [ppt-visual-spec.md](references/ppt-visual-spec.md) | PPT 唯一执行视觉事实源：投顾内部研究口径、自适应主题、七类版式、图片比例、有图/无图双路径与 QA；生成 PPT 时必读 |
| [data-sourcing.md](references/data-sourcing.md) | 取数规范：数据源优先级、口径纪律、确定性分级 |
| [data-fallback.md](references/data-fallback.md) | 数据档次与补充提示规则：缺关键材料时不硬出强结论，但不降档交付物 |
| [freshness-gate.md](references/freshness-gate.md) | 时效核验 gate：财报最新期/招股期状态/孖展/统计/费率时间窗，超窗提示并限制结论强度 |
| [research-methods.md](references/research-methods.md) | 研究方法论库：逻辑支柱、管理层与资本配置、预期/调整项桥、正常化估值、模型误报、产业暴露、IPO 滚动复盘等 |
| [research-safety-gate.md](references/research-safety-gate.md) | 行动安全 gate：具体资金、仓位、杠杆、个性化申购的前置条件与模型边界 |
| [formulas-and-thresholds.md](references/formulas-and-thresholds.md) | 公式、阈值、评分与 IPO 分档的统一口径 |
| [sector-adapters.md](references/sector-adapters.md) | 银行/保险/地产/周期/未盈利科技等行业适配规则 |
| [card-components.md](references/card-components.md) | 客户卡片唯一视觉事实源：墨账本 Swiss、数据台密度、七模块签名图形与 HTML+截图交付规则 |

## 模块方法论

各模块的分析框架、内核字段、docx 大纲与客户版模板，唯一事实源在各自 `SKILL.md`——路由后必读，父层不重复维护。基本面判断的证明规则另见 `references/fundamental-proof-chain.md`（fundamental 专属，正文研究型叙述、证明链台账进附录）。
