# rodya-caijing-studio · 给 AI Agent 的使用说明

这是一个**财经内容生产工具包**（skill 包），不是代码库。这里的任务不是写代码，而是按下述规范生产财经分析内容（A股 + 港股）。

## 入口与路由

1. 先读根目录 `SKILL.md`——父 skill，含模块路由表、七步通用工作流、默认产出规则。
2. 按用户问题路由到七个子模块之一（`caijing-fundamental/` 基本面、`caijing-earnings/` 财报、`caijing-valuation/` 估值、`caijing-risk/` 排雷、`caijing-industry/` 产业链、`caijing-ipo-a/` A股打新、`caijing-ipo-hk/` 港股打新），读其 `SKILL.md` 照做。用户输入稳定命令 `/caijing:{模块名}`（如 `/caijing:ipo-hk`）→ 跳过路由判断直达该模块。
3. 所有模块共用 `references/` 共享层；**执行任何模块前必读 `references/research-safety-gate.md` 与 `references/compliance.md`**。遇到客户版渲染、数据缺口、公式评分、行业特殊口径时，按下方硬约束读取对应文件。

## 不可破的硬约束（合规灵魂，破了整套工具就失效）

- **北极星（输出不变量）**：给使用者一份**全面、详细、完备**的研究文档；详实靠结构不靠字数、研究型叙述结论先行（先给结论、再推过程与依据）。任何 gate、合规、时效或数据降级**只降结论置信度或收对客表达边界，永不把专业输出削成简略或不出**（唯一例外：环境无法写文件须报"文件生成阻塞"，或用户明确要摘要/只在聊天里回答）。
- 使用者身份不改变研究质量：个人投资者、研究人员、投顾和客户经理默认获得同一专业研究内核；普通研究不得先追问身份。
- 客户合规版保留有证据支撑的研究判断、依据、边界、反面证据与跟踪指标，但禁止买卖/申购指令、目标价、收益承诺、个性化资金和杠杆动作。
- `references/research-safety-gate.md` 只在具体仓位、金额、融资、杠杆或个性化申购动作时启动；前置输入不齐只给条件性方案和补充清单。
- 客户版逐句过 `references/compliance.md` 与 `references/compliance-rendering.md`；客户版是受众口径，不等同于卡片，可以按需生成 docx、卡片+文案或 PPT。
- 一份内核、三形态渲染：docx / 卡片 / PPT 必须从同一份「结构化分析内核」渲染（schema 见 `references/output-spec.md`），绝不各写各的分析。
- 关键数字必标来源与数据截至日，区分"已核实/估算"（分级见 `references/data-sourcing.md`）；数据不足时按 `references/data-fallback.md` 标注数据档次、结论边界和补充要求，宁缺不编但不降档交付物。
- 取数前过 `references/freshness-gate.md` 时效核验：财报必须为最新披露期、招股资料核对是否仍在招股期（已截止→跟踪/复盘口径）、孖展/破发率统计/券商费率超时间窗必须重取，不可得则显式标注时效存疑并限制结论强度。
- 三情景、逻辑支柱、管理层与资本配置、预期/调整项桥、正常化估值、模型误报、产业暴露、IPO 滚动复盘按 `references/research-methods.md`；客户版保留证据化方向判断，但不得把研究判断翻译为交易动作。
- 公式、评分、分档必须按 `references/formulas-and-thresholds.md`；不满足参数或样本数要求时不硬算。
- 银行、保险、券商、地产、周期、18A/18C、平台型公司等先按 `references/sector-adapters.md` 选指标，禁用不适用指标。
- PPT 仅在用户明确要求汇报/PPT/deck/幻灯时生成；单模块和多模块均不自动出。

## 在 Codex 中安装

本包符合 agent skills 开放标准（agentskills.io）。整个目录放入 `~/.agents/skills/`（个人全局）或项目内 `.agents/skills/`（仓库共享）即可被发现；`$` 提及或 `/skills` 显式调用，任务匹配各 SKILL.md 的 description 时亦可隐式触发。

## 更新卫生

- 更新 `rodya-caijing-studio` 时，不要在 `~/.codex/skills/` 下创建任何包含 `SKILL.md` 的 backup 目录；该目录会被 Codex 扫描，备份会被识别成重复 skill。
- 如需备份，放到 `~/.codex/skill-backups/`，或把备份里的 `SKILL.md` 改名为 `SKILL.md.disabled`。
- 更新后检查 `~/.codex/skills/` 下是否只剩一个 `rodya-caijing-studio` 目录。
