# Unified Professional Response Implementation Plan

> **For agentic workers:** Implement inline in the current session. The user explicitly requested lightweight verification, no RED phase, and completion priority; do not dispatch subagents or introduce a heavy test framework.

**Goal:** 让所有使用者默认获得同一专业研究内核，并将客户版改为保留证据化研究判断、只移除交易动作的专业合规版本。

**Architecture:** 运行时分为统一研究层、受众口径层、交付形态层和行动安全层。父 Skill 与共享 references 定义契约，七模块只定义模块专属分析和客户版表达，入口文档与轻量契约测试防止旧身份分流回归。

**Tech Stack:** Markdown Agent Skills、Node.js 内置 `node:test`、现有 Skill 校验脚本。

## Global Constraints

- 不改变七模块研究方法、数据源、公式、时效规则或现有视觉系统。
- 不因个人投资者、投顾、客户经理或研究人员身份改变研究质量。
- 客户版保留有证据支撑的方向性研究判断，但禁止交易指令、目标价、收益承诺、个性化资金与杠杆动作。
- 卡片、文案、docx、PPT 必须消费同一结构化研究内核。
- PPT 仅在用户明确点名时生成。
- 只运行现有 Node 契约测试、全文冲突检索与 Skill 基础校验，不做 RED 或压力测试。

---

### Task 1: 统一共享响应契约

**Files:**
- Modify: `SKILL.md`
- Modify: `references/output-spec.md`
- Modify: `references/compliance.md`
- Modify: `references/compliance-rendering.md`
- Modify: `references/research-safety-gate.md`

- [x] 将身份分流改为研究/受众/形态/行动四层。
- [x] 将内核结论字段改为事实摘要、研究判断、判断依据、适用边界、关键变量、反面证据、行动建议。
- [x] 客户版保留研究判断，逐项排除交易动作。
- [x] 将安全 Gate 收窄到具体资金、仓位、杠杆与个性化申购动作。

### Task 2: 同步七模块运行规则

**Files:**
- Modify: `caijing-fundamental/SKILL.md`
- Modify: `caijing-earnings/SKILL.md`
- Modify: `caijing-valuation/SKILL.md`
- Modify: `caijing-risk/SKILL.md`
- Modify: `caijing-industry/SKILL.md`
- Modify: `caijing-ipo-a/SKILL.md`
- Modify: `caijing-ipo-hk/SKILL.md`

- [x] 将旧 `客观概括/专业判断` 字段映射到新共享结论字段。
- [x] 将客户版“只留事实”改为“保留证据化研究判断，不输出交易动作”。
- [x] 保留模块专属合规边界；港股打新仅在具体动作层要求个人资金输入。

### Task 3: 更新入口与人类说明

**Files:**
- Modify: `AGENTS.md`
- Modify: `README.md`
- Modify: `agents/openai.yaml`
- Modify: `docs/references.md`
- Modify: `docs/modules/*.md`

- [x] 更新产品定位、默认响应和客户版定义。
- [x] 解耦客户版口径与卡片/PPT 形态。
- [x] 修复 README 中多模块自动生成 PPT 的旧描述。

### Task 4: 轻量验证、同步与收尾

**Files:**
- Modify: `tests/research-safety-contract.test.mjs`
- Create: `tests/response-contract.test.mjs`
- Modify: `00_System/Current_Status.md`（仓库外）
- Archive: `00_System/AI_Change_Queue.md` 条目（仓库外）
- Sync: `C:/Users/Administrator.DESKTOP-OPKAITA/.codex/skills/rodya-caijing-studio/`

- [x] 更新契约测试并运行 `node --test tests/*.test.mjs`。
- [x] 全文检索身份降级、客户版丢弃判断和自动 PPT 旧规则。
- [x] 运行 Skill 基础校验（官方脚本缺 PyYAML，改用 8 个 SKILL frontmatter 无依赖检查）。
- [x] 提交项目变更并同步 Codex 运行副本。
- [x] 更新 Current_Status，将队列条目归档为已完成。
