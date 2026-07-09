# rodya-caijing-studio · 给 AI Agent 的使用说明

这是一个**财经内容生产工具包**（skill 包），不是代码库。这里的任务不是写代码，而是按下述规范生产财经分析内容（A股 + 港股）。

## 入口与路由

1. 先读根目录 `SKILL.md`——父 skill，含模块路由表、七步通用工作流、默认产出规则。
2. 按用户问题路由到七个子模块之一（`caijing-fundamental/` 基本面、`caijing-earnings/` 财报、`caijing-valuation/` 估值、`caijing-risk/` 排雷、`caijing-industry/` 产业链、`caijing-ipo-a/` A股打新、`caijing-ipo-hk/` 港股打新），读其 `SKILL.md` 照做。用户输入稳定命令 `/caijing:{模块名}`（如 `/caijing:ipo-hk`）→ 跳过路由判断直达该模块。
3. 所有模块共用 `references/` 共享层；**执行任何模块前必读 `references/compliance.md`**。遇到客户版渲染、数据缺口、公式评分、行业特殊口径时，按下方硬约束读取对应文件。

## 不可破的硬约束（合规灵魂，破了整套工具就失效）

- 对客内容只做客观数据体检，不荐股：任何对客输出禁止买卖建议、目标价、收益承诺、操作指令。唯一例外：`caijing-ipo-hk` 的自用计算模式（2026-07-09 经用户批准）可对使用者本人给申购方案，其客户版输出仍按本条执行。
- 客户版（供转发客户的内容）逐句过 `references/compliance.md` 的发布前 checklist，并按 `references/compliance-rendering.md` 将评级、档位、受益标的、打新表述降级为客观信息。
- 一份内核、三形态渲染：docx / 卡片 / PPT 必须从同一份「结构化分析内核」渲染（schema 见 `references/output-spec.md`），绝不各写各的分析。
- 关键数字必标来源与数据截至日，区分"已核实/估算"（分级见 `references/data-sourcing.md`）；数据不足时按 `references/data-fallback.md` 标注数据档次、结论边界和补充要求，宁缺不编但不降档交付物。
- 取数前过 `references/freshness-gate.md` 时效核验：财报必须为最新披露期、招股资料核对是否仍在招股期（已截止→跟踪/复盘口径）、孖展/破发率统计/券商费率超时间窗必须重取，不可得则显式标注时效存疑并限制结论强度。
- 三情景、逻辑支柱、同业四分位、行业关键指标、利润池、竞争分类、瓶颈点、证伪链、排雷恶化因子按 `references/research-methods.md`；客户版只能降级为客观变量、公开信息提示和后续关注指标。
- 公式、评分、分档必须按 `references/formulas-and-thresholds.md`；不满足参数或样本数要求时不硬算。
- 银行、保险、券商、地产、周期、18A/18C、平台型公司等先按 `references/sector-adapters.md` 选指标，禁用不适用指标。
- 单模块不出 PPT，多模块组合才出。

## 在 Codex 中安装

本包符合 agent skills 开放标准（agentskills.io）。整个目录放入 `~/.agents/skills/`（个人全局）或项目内 `.agents/skills/`（仓库共享）即可被发现；`$` 提及或 `/skills` 显式调用，任务匹配各 SKILL.md 的 description 时亦可隐式触发。

## 更新卫生

- 更新 `rodya-caijing-studio` 时，不要在 `~/.codex/skills/` 下创建任何包含 `SKILL.md` 的 backup 目录；该目录会被 Codex 扫描，备份会被识别成重复 skill。
- 如需备份，放到 `~/.codex/skill-backups/`，或把备份里的 `SKILL.md` 改名为 `SKILL.md.disabled`。
- 更新后检查 `~/.codex/skills/` 下是否只剩一个 `rodya-caijing-studio` 目录。
