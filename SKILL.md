---
name: rodya-caijing-studio
description: 财经内容台——给券商投顾/客户经理的财经内容生产工具包（A股+港股）。当用户要求分析个股/新股/题材并产出对客或自用内容时使用：全面分析某公司（基本面）、点评财报、判断估值贵不贵、排查财务风险/红旗、梳理题材产业链、体检A股/港股新股；默认产出专业版（研报级 docx）；客户版（卡片图+文案）按需转客户时再出；仅用户点名汇报/PPT/deck/幻灯时生成汇报 PPT。触发词：基本面、财报点评、估值、贵不贵、排雷、红旗、产业链、受益标的、打新、新股体检、怎么打、打多少手、客户版、专业版、投顾内容；稳定命令 /caijing:fundamental、/caijing:earnings、/caijing:valuation、/caijing:risk、/caijing:industry、/caijing:ipo-a、/caijing:ipo-hk 直达对应模块。核心原则：对客内容只做客观数据体检、判断权交还客户、不荐股；例外——港股打新模块含自用计算模式，可给申购方案与建议。
---

# 财经内容台（rodya-caijing-studio）

给券商投顾/客户经理的财经内容生产工具包：把对一只股票/新股/题材的研究，产出**两口径**内容——专业版（投顾自己看，研报级，**默认产出**）+ 客户版（转客户，一张图+一段文案，**按需产出**：要转客户时再出）；多模块组合按需出汇报 PPT。市场范围：**A股 + 港股**。

## 灵魂（任何环节不可破）

**对客内容只做客观数据体检、把判断权交还客户、不荐股。**客户版严禁买卖建议、目标价、操作指令、收益承诺。每次输出前必须对照 [references/compliance.md](references/compliance.md) 逐条检查。这是整套工具的合规护城河，破了这条整套就没意义。

**唯一例外（2026-07-09 经用户批准，队列留痕）**：`caijing-ipo-hk` 含自用计算模式，默认对使用者本人给出申购方案与明确建议；其对客输出（客户版卡片/文案）仍全量走合规降级，不受例外影响。

## 模块路由

| 模块 | 目录 | 只咬这一个问题 | 典型触发 |
|---|---|---|---|
| 财经·基本面 | `caijing-fundamental/` | 这公司好不好 | "全面分析XX""XX基本面怎么样" |
| 财经·财报 | `caijing-earnings/` | 这季财报行不行 | "XX出财报了""点评一下XX年报" |
| 财经·估值 | `caijing-valuation/` | 现在贵不贵 | "XX贵不贵""现在什么位置" |
| 财经·排雷 | `caijing-risk/` | 有没有雷 | "XX有没有雷""帮我排查风险" |
| 财经·产业链 | `caijing-industry/` | 题材链条怎么分、代表公司有哪些 | "XX题材梳理""产业链图谱" |
| 财经·A股打新 | `caijing-ipo-a/` | A股新股破发统计风险多大 | "XX明天申购""科创板新股分析" |
| 财经·港股打新 | `caijing-ipo-hk/` | 港股新股怎么打、打多少 + 破发统计风险（自用给建议；对客只体检） | "分析这个新股""XX招股了""怎么打""打多少手" |

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

1. **定模块、场景与口径**：识别单模块/组合；先按 [references/research-safety-gate.md](references/research-safety-gate.md) 判断个人自用 / 机构内部研究 / 对客材料，再确认听众（**默认只出专业版**；客户版卡片+文案按需，仅用户要转客户或明确要客户版时才出）。
2. **取数**：按 [references/data-sourcing.md](references/data-sourcing.md)；取数前先过 [references/freshness-gate.md](references/freshness-gate.md) 时效核验（财报是否最新期、招股是否在期内、孖展/统计/费率是否超窗），超窗先重取，不可得再按 [references/data-fallback.md](references/data-fallback.md) 标注数据档次、结论边界和补充要求。
3. **产内核**：生成该模块的「结构化分析内核」（通用 schema 见 [references/output-spec.md](references/output-spec.md)，各模块字段见其 SKILL.md）。
   ⚠️ **一份内核、三形态渲染**：docx/卡片/PPT 全部从这一份内核渲染，绝不各写各的分析——否则三处不一致、改一处漏两处。
4. **计算与适配**：涉及公式、评分、分档时按 [references/formulas-and-thresholds.md](references/formulas-and-thresholds.md)；涉及行业特殊口径时按 [references/sector-adapters.md](references/sector-adapters.md)；涉及三情景、逻辑支柱、同业四分位、利润池、竞争分类、瓶颈点、证伪链、排雷恶化因子时按 [references/research-methods.md](references/research-methods.md)。
5. **渲染**：按下方默认产出规则；单模块专业版默认生成 `.docx`（按 [references/docx-visual-spec.md](references/docx-visual-spec.md)）。**客户版仅在用户要求时渲染**；三形态视觉均已定稿（docx→docx-visual-spec.md、卡片→card-components.md、PPT→[ppt-visual-spec.md](references/ppt-visual-spec.md)）；不得因数据档次把专业版降成短评。PPT 默认面向投顾内部研究，颜色自适应；Codex 可生图增强，Claude 无图时使用完整纯排版回退。
6. **合规检查**：对照 compliance.md 过一遍；客户版再按 [references/compliance-rendering.md](references/compliance-rendering.md) 降级逐句检查。
7. **交付**：每份输出标注数据截至日 + 确定性分级 + 免责声明。**交付专业版后主动提醒使用者：如需转客户，可再让我出客户版（卡片图+文案）。**

## 默认产出规则

| 场景 | 产出 | 不产出 |
|---|---|---|
| 单模块 | 专业版 docx（客户版按需，见下） | 客户版默认不出、PPT（杀鸡不用牛刀） |
| 多模块组合 | 逐模块专业版 docx（或合并摘要） | **PPT 不自动出**——仅用户点名"汇报/PPT/deck"时才出（默认 .pptx，见 output-spec §三③） |

**客户版按需规则**：单模块默认只出专业版 docx；客户版（卡片图+文案）仅在用户要转客户或明确要客户版时才渲染，届时全量走合规降级（compliance-rendering.md）。交付专业版后必须主动提醒使用者可另出客户版。（`caijing-ipo-hk` 的对客模式同理，已内建按需触发。）

## 共享层（references/，改一处全生效）

| 文件 | 职责 |
|---|---|
| [compliance.md](references/compliance.md) | 合规层：两口径分层规则、措辞红线、免责声明、客户版 checklist |
| [compliance-rendering.md](references/compliance-rendering.md) | 客户版渲染降级：评级/档位/受益标的/打新表述统一降级 |
| [output-spec.md](references/output-spec.md) | 双版本输出层：内核 schema、docx/卡片/PPT 三形态规范、口径切换 |
| [docx-visual-spec.md](references/docx-visual-spec.md) | docx 专业版视觉规范（唯一视觉事实源）：配色/字体/首页版式/编号图表来源纪律；渲染 docx 时必读 |
| [ppt-visual-spec.md](references/ppt-visual-spec.md) | PPT 唯一执行视觉事实源：投顾内部研究口径、自适应主题、七类版式、图片比例、有图/无图双路径与 QA；生成 PPT 时必读 |
| [data-sourcing.md](references/data-sourcing.md) | 取数规范：数据源优先级、口径纪律、确定性分级 |
| [data-fallback.md](references/data-fallback.md) | 数据档次与补充提示规则：缺关键材料时不硬出强结论，但不降档交付物 |
| [freshness-gate.md](references/freshness-gate.md) | 时效核验 gate：财报最新期/招股期状态/孖展/统计/费率时间窗，超窗提示并限制结论强度 |
| [research-methods.md](references/research-methods.md) | 研究方法论库：三情景、逻辑支柱、同业四分位、行业关键指标、利润池、竞争分类、瓶颈点、证伪链、排雷恶化因子 |
| [research-safety-gate.md](references/research-safety-gate.md) | 研究与投顾安全 gate：自用/内部/对客场景、具体资金建议前置条件、模型边界与机构复核 |
| [formulas-and-thresholds.md](references/formulas-and-thresholds.md) | 公式、阈值、评分与 IPO 分档的统一口径 |
| [sector-adapters.md](references/sector-adapters.md) | 银行/保险/地产/周期/未盈利科技等行业适配规则 |
| [card-components.md](references/card-components.md) | 客户卡片唯一视觉事实源：墨账本 Swiss、数据台密度、七模块签名图形与 HTML+截图交付规则 |

## 模块方法论

各模块的分析框架、内核字段、docx 大纲与客户版模板，唯一事实源在各自 `SKILL.md`——路由后必读，父层不重复维护。
