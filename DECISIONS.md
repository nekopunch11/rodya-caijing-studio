# 财经内容台 决策记录

追加式，不改写历史。**新决策加在最上方**（倒序）。每条：背景 / 选定 / 原因 / 影响文件。
从中央 Current_Status 蒸馏迁入（2026-07-12，Claude）；逐日流水与哈希/提交号等留痕见 git 历史与 `90_Archive/`。

---

### 2026-07-13 DOCX 换行与洞察卡列宽契约修复
- 背景：测试成品把 `\n` 显示成普通字符，洞察卡左侧金色装饰栏在自动适配下被拉宽并挤压正文。
- 选定：renderer 统一把转义换行归一为真实 Word 断行；所有表格显式关闭自动适配；洞察卡装饰栏固定为 240 dxa；视觉审计新增 literal 转义换行门禁。
- 原因：生成内容和旧模板可能携带两字符转义序列，Word/WPS 的自动适配会覆盖设计列宽；几何与文本都需在生成层锁定。
- 影响文件：`scripts/docx_renderer.py`、`scripts/docx_spec_renderer.py`、`scripts/audit_docx_visual.py`、`assets/docx-template.docx`。

### 2026-07-13 模板优先 DOCX 渲染链与视觉契约审计
- 背景：现有 DOCX 由单次任务临时脚本生成，硬编码 Letter/蓝色商务样式；旧 QA 验证了错误基线，规范与成品发生漂移。
- 选定：建立 `docx-template.docx` + `docx-style-tokens.json` + 公共 `docx_renderer.py`；模块只提供结构化内容块，生成后统一跑视觉契约审计，再执行 render→PNG 门禁。
- 原因：把脆弱的版式决策从模型提示词移到模板、token 和低自由度脚本；同一 renderer 供七模块复用，减少重复实现和漂移。
- 影响文件：`assets/docx-template.docx`、`references/docx-style-tokens.json`、`scripts/docx_renderer.py`、`scripts/audit_docx_visual.py`、父 `SKILL.md`、`docx-visual-spec.md`；茅台 Inbox 生成/审计脚本已接入。结构化审计通过；LibreOffice 缺失导致 PNG 渲染仍阻塞。

### 2026-07-12 V8 发布为首个公开样张
- 背景：宁德样张经 V2→V8 迭代，V8 段首「结论｜」黑金起头、去人名、问句从 ~20 降到 7。
- 选定：V8 获用户批准，发布到 `docs/samples/catl/`（docx+预览图+sources），README 样张段改可折叠、宁德排第一。
- 原因：达到「深度研究型、结论先行、去人名」标准，可作对外能力证据。
- 影响文件：`docs/samples/catl/`、README。

### 2026-07-12 研究型≠结果式（结论先行、去人名、不预设页数）
- 背景：V6/V7 用户反馈仍是「结果式/结论式」报告，要「深度研究型」展示调查与推理；且不该预设页数、不该为塞页压字号。
- 选定：每子项改「研究问题→数据→拆解→机制→对照→竞争性假设排除→判断带置信度→对论点含义」；叙述结论先行不用先问后答；六视角去人名（张坤/巴菲特→长期质量派等）；正文≥10.5pt 不压字号；结论式=未完成入硬指标。
- 原因：AI 报告的价值在展示推理过程，而非一句话结论；页数/字号服从内容不服从版面。
- 影响文件：`caijing-fundamental/SKILL.md`、`output-spec.md`、`docx-visual-spec.md`。

### 2026-07-12 北极星：输出全面详实、靠结构不靠字数
- 背景：最初 5000 字硬下限删除后，「不按字数」被当成「短也没关系」的挡箭牌，输出退化成每章两段。
- 选定：北极星＝输出全面详细完备文档；用结构（模块×每段必答子项×最低一手证据×胜负手 2-3 倍深度）保证详实；「覆盖但很薄」与「凑字数注水」并列为失败；最高不变量＝任何 gate/合规/时效/数据降级只降置信度或收对客表达边界，永不削成简略或不出。
- 原因：详实是专业底线，但要靠结构而非字数堆砌。
- 影响文件：父 `SKILL.md`、`output-spec.md`、各 gate/合规/data-fallback/freshness、六模块 SKILL。

### 2026-07-12 第一性原理产品重定义为「分析师级前瞻研究引擎/初稿」
- 背景：宁德样张暴露根因——有扎实方法论库却从未执行到深度，证明链闸门「断裂即停止定性」反而推翻「每个判断都要能被证伪」，在最关键胜负手上交白卷。
- 选定：证明链降为幕后 QA、删「断裂停止定性」改「估算+区间+置信度+证伪」；深度压过覆盖（围绕 2-3 个胜负手）；补前瞻引擎（三情景/反向 DCF 隐含预期）；拆研究产品与合规产品、切断胆怯传导；加分歧视角。天花板诚实：AI 无一手调研，目标是可被人接管的前瞻初稿。
- 原因：产品此前优化了可辩护性而非洞察、向后看而非向前看。
- 影响文件：父 `SKILL.md`、`output-spec.md`、`fundamental-proof-chain.md`、`caijing-fundamental/SKILL.md`（原则传导六模块）。

### 2026-07-12 基本面证明链改为幕后工序、正文回归研报叙事
- 背景：宁德 V2 约六成篇幅是暴露的证明链协议机械，读起来像质检作业单。根因＝`proof-chain §八`/`docx-visual-spec §九` 要求把链字段搬进正文。
- 选定：正文只做洞察叙事+句末 [P-0x] 回指，禁链结构词；完整链台账沉附录；取消自述方法论章节；章节只用中文一二三、去英文 kicker。
- 原因：证明链是幕后可复核工序，读者要的是结论与洞察。
- 影响文件：`fundamental-proof-chain.md §八`、`docx-visual-spec.md §九`、`caijing-fundamental/SKILL.md`、契约测试、CATL 生成器。

### 2026-07-11 统一专业响应契约 + P0 研究安全 Gate + PPT 视觉系统 v1.0
- 背景：需统一「一份专业内核、多受众口径、多交付形态」，并把资金/杠杆/个性化动作前置到安全 Gate。
- 选定：统一专业研究内核+受众口径+交付形态+行动安全 Gate（客户版保留研究判断只删交易动作）；新增 `research-safety-gate.md`（自用/机构/对客三场景）；**取消 4000/5000 字硬下限**改六项验收（分析块/证据/来源/公式/证伪/数据缺口）；PPT 视觉系统 v1.0（`ppt-visual-spec.md`）。
- 原因：一致专业 + 合规安全 + 高级视觉三者制度化。
- 影响文件：父 SKILL、`output-spec.md`、`research-safety-gate.md`、`research-methods.md`、`ppt-visual-spec.md`、七模块。

### 2026-07-10 默认只出专业版 docx、客户版按需
- 背景：原默认「专业版+客户版都出」冗余。
- 选定：单模块默认只出专业版 docx；客户版（卡片+文案）按需，仅用户要转客户时才渲染并过合规降级；交付后主动提醒可另出客户版。
- 原因：减少默认产出、按需触发客户版。
- 影响文件：父 SKILL、`output-spec.md §零`、六模块工作流（ipo-hk 原对客未动）。

### 2026-07-10 三套视觉定稿（docx 炭黑金 / 卡片墨账本 Swiss / PPT）
- 背景：需锁定唯一视觉事实源。
- 选定：docx＝本土券商研报骨架+国际图表纪律+炭黑金配色（#1A1A1A/#A8894F）、思源宋体+MiSans；卡片＝Swiss 纪律+墨黑招牌带+红涨绿跌只染数据（弃 IKB 克莱因蓝）；PPT＝按需件、默认真 .pptx（pptxgenjs 墨账本）、HTML deck 备选；确立「数据台密度」原则。卡片默认只交付 HTML+截图，删 Playwright 渲染管线（skill 零依赖）。
- 原因：本土专业感+强识别+零依赖交付。
- 影响文件：`docx-visual-spec.md`、`card-components.md`、`template-*.html`、`deck-template.mjs`、`output-spec.md`。

### 2026-07-10 删发布副本、源目录＝唯一事实源
- 背景：曾在 `01_Inbox/rodya-caijing-studio/` 建 GitHub 发布副本，建了又删走了弯路。
- 选定：删除发布副本；`02_资料库/02_Skills/rodya-caijing-studio/` 即项目本体与 git 仓（remote nekopunch11/rodya-caijing-studio），直接 push，不再建副本。
- 原因：双副本必然漂移；项目目录即发布源。
- 影响文件：整个项目目录定位；`.gitattributes` 补回（LF/binary）。

### 2026-07-09 打新拆 A 股/港股 + 15 个专业升级项内化 + 港股打新双模式
- 背景：打新 A 股与港股规则差异大；需把专业方法论落到各模块；港股打新原有「零个人资金逻辑」铁律限制自用。
- 选定：打新拆 caijing-ipo-a / caijing-ipo-hk 两模块；15 个专业升级项（杜邦/ROIC/护城河五源/超预期三层/M-Score+Z/利润池/破发因子等）内化进各模块；ipo-hk 改双模式（自用完整顾问全量内置、对客走合规降级）。
- 原因：A/H 口径分离、方法论唯一事实源在各模块 SKILL.md、自用与对客分流。
- 影响文件：七模块 SKILL、`research-methods.md`、`freshness-gate.md`、父 SKILL/AGENTS/README。
