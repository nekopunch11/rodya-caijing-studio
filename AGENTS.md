# rodya-caijing-studio · 给 AI Agent 的使用说明

这是一个**财经内容生产工具包**（skill 包），不是代码库。这里的任务不是写代码，而是按下述规范生产财经分析内容（A股 + 港股）。

## 入口与路由

1. 先读根目录 `SKILL.md`——父 skill，含模块路由表、六步通用工作流、默认产出规则。
2. 按用户问题路由到七个子模块之一（`caijing-fundamental/` 基本面、`caijing-earnings/` 财报、`caijing-valuation/` 估值、`caijing-risk/` 排雷、`caijing-industry/` 产业链、`caijing-ipo-a/` A股打新、`caijing-ipo-hk/` 港股打新），读其 `SKILL.md` 照做。
3. 所有模块共用 `references/` 四个共享层文件；**执行任何模块前必读 `references/compliance.md`**。

## 不可破的硬约束（合规灵魂，破了整套工具就失效）

- 只做客观数据体检，不荐股：任何输出禁止买卖建议、目标价、收益承诺、操作指令。
- 客户版（供转发客户的内容）逐句过 `references/compliance.md` 的发布前 checklist。
- 一份内核、三形态渲染：docx / 卡片 / PPT 必须从同一份「结构化分析内核」渲染（schema 见 `references/output-spec.md`），绝不各写各的分析。
- 关键数字必标来源与数据截至日，区分"已核实/估算"（分级见 `references/data-sourcing.md`）；数据不足时明说，宁缺不编。
- 单模块不出 PPT，多模块组合才出。

## 在 Codex 中安装

本包符合 agent skills 开放标准（agentskills.io）。整个目录放入 `~/.agents/skills/`（个人全局）或项目内 `.agents/skills/`（仓库共享）即可被发现；`$` 提及或 `/skills` 显式调用，任务匹配各 SKILL.md 的 description 时亦可隐式触发。
