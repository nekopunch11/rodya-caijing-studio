---
name: rodya-caijing-studio
description: 财经内容台——给券商投顾/客户经理的财经内容生产工具包（A股+港股）。当用户要求分析个股/新股/题材并产出对客或自用内容时使用：全面分析某公司（基本面）、点评财报、判断估值贵不贵、排查财务风险/红旗、梳理题材产业链、体检A股/港股新股；产出专业版（研报级 docx）+ 客户版（卡片图+文案），多模块组合出汇报 PPT。触发词：基本面、财报点评、估值、贵不贵、排雷、红旗、产业链、受益标的、打新、新股体检、怎么打、打多少手、客户版、专业版、投顾内容；稳定命令 /caijing:fundamental、/caijing:earnings、/caijing:valuation、/caijing:risk、/caijing:industry、/caijing:ipo-a、/caijing:ipo-hk 直达对应模块。核心原则：对客内容只做客观数据体检、判断权交还客户、不荐股；例外——港股打新模块含自用计算模式，可给申购方案与建议。
---

# 财经内容台（rodya-caijing-studio）

给券商投顾/客户经理的财经内容生产工具包：把对一只股票/新股/题材的研究，一键产出**两口径**内容——专业版（投顾自己看，研报级）+ 客户版（转客户，一张图+一段文案）；多模块组合时产出汇报 PPT。市场范围：**A股 + 港股**。

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
- 涉及多个问题 → 逐模块产内核，组合输出 PPT。
- **接力关系**：基本面里估值/风险只做简版；用户要深挖时接力到估值/排雷模块增量分析，不重复劳动。

## 通用工作流（七步，所有模块共用）

1. **定模块与口径**：识别单模块/组合；确认听众（默认专业版+客户版都出）。
2. **取数**：按 [references/data-sourcing.md](references/data-sourcing.md)；取数前先过 [references/freshness-gate.md](references/freshness-gate.md) 时效核验（财报是否最新期、招股是否在期内、孖展/统计/费率是否超窗），超窗先重取，不可得再按 [references/data-fallback.md](references/data-fallback.md) 降级。
3. **产内核**：生成该模块的「结构化分析内核」（通用 schema 见 [references/output-spec.md](references/output-spec.md)，各模块字段见其 SKILL.md）。
   ⚠️ **一份内核、三形态渲染**：docx/卡片/PPT 全部从这一份内核渲染，绝不各写各的分析——否则三处不一致、改一处漏两处。
4. **计算与适配**：涉及公式、评分、分档时按 [references/formulas-and-thresholds.md](references/formulas-and-thresholds.md)；涉及行业特殊口径时按 [references/sector-adapters.md](references/sector-adapters.md)；涉及三情景、逻辑支柱、同业四分位、利润池、竞争分类、瓶颈点、证伪链、排雷恶化因子时按 [references/research-methods.md](references/research-methods.md)。
5. **渲染**：按下方默认产出规则；视觉模板未完成前，卡片/PPT 先交付结构稿或 Markdown 版。
6. **合规检查**：对照 compliance.md 过一遍；客户版再按 [references/compliance-rendering.md](references/compliance-rendering.md) 降级逐句检查。
7. **交付**：每份输出标注数据截至日 + 确定性分级 + 免责声明。

## 默认产出规则

| 场景 | 产出 | 不产出 |
|---|---|---|
| 单模块 | 专业版 docx + 客户版（卡片图+文案） | PPT（杀鸡不用牛刀） |
| 多模块组合 | 汇报 PPT（默认专业口径，可指定客户口径） | 需要文字稿时再附 docx |

## 共享层（references/，改一处全生效）

| 文件 | 职责 |
|---|---|
| [compliance.md](references/compliance.md) | 合规层：两口径分层规则、措辞红线、免责声明、客户版 checklist |
| [compliance-rendering.md](references/compliance-rendering.md) | 客户版渲染降级：评级/档位/受益标的/打新表述统一降级 |
| [output-spec.md](references/output-spec.md) | 双版本输出层：内核 schema、docx/卡片/PPT 三形态规范、口径切换 |
| [data-sourcing.md](references/data-sourcing.md) | 取数规范：数据源优先级、口径纪律、确定性分级 |
| [data-fallback.md](references/data-fallback.md) | 取数失败与数据缺口降级规则：缺关键材料时不硬出结论 |
| [freshness-gate.md](references/freshness-gate.md) | 时效核验 gate：财报最新期/招股期状态/孖展/统计/费率时间窗，超窗自动降级 |
| [research-methods.md](references/research-methods.md) | 研究方法论库：三情景、逻辑支柱、同业四分位、行业关键指标、利润池、竞争分类、瓶颈点、证伪链、排雷恶化因子 |
| [formulas-and-thresholds.md](references/formulas-and-thresholds.md) | 公式、阈值、评分与 IPO 分档的统一口径 |
| [sector-adapters.md](references/sector-adapters.md) | 银行/保险/地产/周期/未盈利科技等行业适配规则 |
| [card-components.md](references/card-components.md) | 数据卡片层：已锁硬点、固定件、字段功能位（视觉待定稿） |

## 模块方法论

各模块的分析框架、内核字段、docx 大纲与客户版模板，唯一事实源在各自 `SKILL.md`——路由后必读，父层不重复维护。
