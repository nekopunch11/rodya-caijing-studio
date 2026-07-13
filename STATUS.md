# 财经内容台 状态

最后更新：2026-07-13（Codex；明确 Codex 客户 DOCX 默认直读视觉规范生成）
当前认领：无

## 现状

给券商投顾/个人投资者的财经内容生产 skill 包：父 SKILL + 七子模块（fundamental/earnings/valuation/risk/industry/ipo-a/ipo-hk）+ 共享层 references。产品已从「可辩护的结果式研报」演进为**「分析师级深度研究型报告/初稿」**（结论先行叙述、展示推理过程、去人名、不预设页数、结论式=未完成、详实靠结构不靠字数）。三套视觉（docx 炭黑金 / 卡片墨账本 Swiss / PPT 真 .pptx+HTML 备）全部定稿。北极星与最高不变量已传导至父层+七模块。

DOCX 生成链已统一为 `assets/docx-template.docx` + `references/docx-style-tokens.json` + `scripts/docx_renderer.py`；本轮已修复 literal `\n` 换行和表格自动适配导致的装饰栏变宽，视觉契约审计通过。当前机器缺少 LibreOffice/soffice，PNG 渲染门禁仍待本机补齐。

旗舰样张：**宁德时代基本面深度研究样张 V8** 已获用户批准，作为**首个公开样张**发布到 `docs/samples/catl/`（另有招商银行 `cmb/`、小米集团 `xiaomi/` 两份已批准样张）。

## 待办

- [ ] 小红书素材（唯一剩余产品待办）
- [x] DOCX 模板优先渲染链与视觉契约审计已落地；后续模块直接复用公共 renderer
- [ ] 其余六模块整份样张属大工程，建议真实调用时逐个验证（非阻塞）
- [x] 贵州茅台基本面研究：研究内核与专业版 DOCX 已落地至 `01_Inbox/贵州茅台_基本面研究内核与报告底稿_2026-07-13.md`、`01_Inbox/贵州茅台_基本面深度研究报告_2026-07-13.docx`；结构化 QA 通过，视觉渲染因本机缺少 LibreOffice/soffice 未完成

## ⚠️ 待本机操作

- [ ] 本机跑一条 `git status` 复核工作区（沙箱挂载曾把截断视图误报为 19 个改动；实测远端 HEAD=本地 HEAD=`5e1aeb9` 已同步，工作区很可能本就干净）——确认干净后此条删除

## 相关文件

- 唯一事实源：本目录（`02_资料库/02_Skills/rodya-caijing-studio/`，即 git 仓 github.com/nekopunch11/rodya-caijing-studio）；Codex 运行副本 `~/.codex/skills/rodya-caijing-studio/`
- 决策史：[[DECISIONS]]
- 方法论事实源：各模块 `SKILL.md` + `references/`
- 历史交接：`90_Archive/Handoffs/`（6 份，2026-07-09～07-12，已办结）
