// 财经内容台 · 汇报 PPT 生成器（墨账本 Swiss · pptxgenjs）参考母版 v0.1
// 规范：references/output-spec.md §三③ ；视觉参照：assets/template-deck.html
// PPT 为按需件（仅用户明确要"汇报/PPT/deck"时才出）。默认 .pptx（本文件）；用户要浏览器演示/PDF 用 template-deck.html。
// 用法：把下方示例数据换成真实内核 → `npm i pptxgenjs && node deck-template.mjs` → 用 pptx skill 的 rezip.py 重压 → 出 deck.pptx。
// 铁律：配色只用 P 常量；红/绿只标涨跌方向数据、不进招牌带；排雷/统计一律墨色；对客口径去「专业判断/三情景」。
import pptxgen from "pptxgenjs";
const P={ink:"111111",paper:"FFFFFF",muted:"888888",hair:"EDEDED",empty:"DCDCDC",up:"C0392B",down:"1E9E5A",dg:"6B6B6B",lg:"BDBDBD"};
const SANS="Microsoft YaHei", MONO="Courier New";
const pres=new pptxgen(); pres.layout="LAYOUT_16x9"; pres.author="财经内容台"; pres.title="宁德时代 综合体检";

// 招牌带（功能性页眉，非装饰条：承载标的/代码/模块/数据截至）
function header(s,name,code,module,meta){
  s.addShape(pres.shapes.RECTANGLE,{x:0,y:0,w:10,h:0.82,fill:{color:P.ink},line:{type:"none"}});
  s.addText(name,{x:0.4,y:0.12,w:3,h:0.42,fontFace:SANS,fontSize:20,bold:true,color:"FFFFFF",valign:"middle",margin:0});
  if(code) s.addText(code,{x:2.35,y:0.16,w:1.6,h:0.36,fontFace:MONO,fontSize:12,color:P.lg,valign:"middle",margin:0});
  s.addText(module,{x:5.4,y:0.12,w:4.2,h:0.42,fontFace:SANS,fontSize:13,color:"FFFFFF",align:"right",valign:"middle",charSpacing:3,margin:0});
  s.addText(meta,{x:0.4,y:0.5,w:6,h:0.26,fontFace:MONO,fontSize:9.5,color:P.muted,valign:"middle",margin:0});
}
// footer 固定件（slogan + 来源，纯文本无装饰线）
function footer(s,src,dark){
  const c=dark?"777777":P.muted;
  s.addText("客观体检 · 不含买卖建议",{x:0.4,y:5.28,w:5,h:0.25,fontFace:MONO,fontSize:8,color:c,valign:"middle",margin:0});
  s.addText(src,{x:5,y:5.28,w:4.6,h:0.25,fontFace:MONO,fontSize:8,color:c,align:"right",valign:"middle",margin:0});
}
function stat(s,x,y,w,label,val,valColor){
  s.addText(label,{x,y,w,h:0.28,fontFace:SANS,fontSize:10,color:P.muted,margin:0});
  s.addText(val,{x,y:y+0.26,w,h:0.5,fontFace:MONO,fontSize:26,color:valColor||P.ink,margin:0});
}

// 1 封面（深底，标题/结论页用深色）
let s1=pres.addSlide(); s1.background={color:P.ink};
s1.addShape(pres.shapes.RECTANGLE,{x:0.55,y:0.55,w:0.09,h:0.5,fill:{color:P.up},line:{type:"none"}});
s1.addShape(pres.shapes.RECTANGLE,{x:0.72,y:0.62,w:0.09,h:0.38,fill:{color:P.lg},line:{type:"none"}});
s1.addShape(pres.shapes.RECTANGLE,{x:0.89,y:0.5,w:0.09,h:0.58,fill:{color:P.down},line:{type:"none"}});
s1.addText("财经内容台",{x:1.15,y:0.6,w:3,h:0.35,fontFace:MONO,fontSize:11,color:P.muted,charSpacing:3,valign:"middle",margin:0});
s1.addText("宁德时代 综合体检",{x:0.55,y:2.15,w:9,h:0.9,fontFace:SANS,fontSize:42,bold:true,color:"FFFFFF",margin:0});
s1.addText("基本面 · 估值 · 排雷",{x:0.57,y:3.15,w:8,h:0.5,fontFace:SANS,fontSize:20,color:"CFCFCF",charSpacing:2,margin:0});
s1.addText("300750 · A股 · 数据截至 2026-07-10",{x:0.57,y:3.75,w:8,h:0.35,fontFace:MONO,fontSize:12,color:P.muted,margin:0});
footer(s1,"汇报 PPT · 专业口径",true);

// 2 总览（账本表）
let s2=pres.addSlide(); s2.background={color:P.paper};
header(s2,"综合结论总览","","汇报总览","A股 · 数据截至 2026-07-10");
const hd=(t,a)=>({text:t,options:{fill:{color:P.ink},color:"FFFFFF",bold:true,fontFace:MONO,fontSize:12,align:a||"left",valign:"middle"}});
s2.addTable([
 [hd("模块"),hd("客观概括"),hd("关键数字","right"),hd("确定性","center")],
 [{text:"基本面",options:{bold:true,fontFace:SANS,fontSize:13}},{text:"护城河 7/10，现金流扎实",options:{fontFace:SANS,fontSize:12,color:"444444"}},{text:"ROE 18.5%",options:{fontFace:MONO,fontSize:12,align:"right"}},{text:"B",options:{fontFace:MONO,fontSize:12,align:"center"}}],
 [{text:"估值",options:{bold:true,fontFace:SANS,fontSize:13}},{text:"PE 处近 5 年 78% 分位",options:{fontFace:SANS,fontSize:12,color:"444444"}},{text:"PE 27.3×",options:{fontFace:MONO,fontSize:12,align:"right"}},{text:"B",options:{fontFace:MONO,fontSize:12,align:"center"}}],
 [{text:"排雷",options:{bold:true,fontFace:SANS,fontSize:13}},{text:"财务维度 1 项重点关注",options:{fontFace:SANS,fontSize:12,color:"444444"}},{text:"商誉/净资 32%",options:{fontFace:MONO,fontSize:12,align:"right"}},{text:"B",options:{fontFace:MONO,fontSize:12,align:"center"}}],
],{x:0.4,y:1.2,w:9.2,colW:[1.5,4.5,2.2,1.0],rowH:[0.5,0.62,0.62,0.62],border:{type:"solid",pt:0.5,color:P.hair},valign:"middle",margin:4});
s2.addText("来源：Wind、公司年报，截至 2026-07-10",{x:0.4,y:3.9,w:9,h:0.3,fontFace:MONO,fontSize:9,color:P.muted,margin:0});
footer(s2,"财经内容台 · 2 / 6");

// 3 模块页 · 基本面（左大数+五源 / 右概括+关键数字+风险）
let s3=pres.addSlide(); s3.background={color:P.paper};
header(s3,"宁德时代","300750","基本面体检","A股 · 数据截至 2026-07-10");
s3.addText("近 5 年平均 ROE",{x:0.4,y:1.1,w:4,h:0.3,fontFace:SANS,fontSize:11,color:P.muted,charSpacing:2,margin:0});
s3.addText([{text:"18.5",options:{fontFace:"Arial",fontSize:60}},{text:"%",options:{fontFace:"Arial",fontSize:26}}],{x:0.38,y:1.35,w:4,h:1.0,color:P.ink,margin:0});
s3.addText("护城河五源  7 / 10",{x:0.4,y:2.55,w:4,h:0.3,fontFace:SANS,fontSize:11,color:P.muted,margin:0});
s3.addText([
 {text:"无形资产            ■■",options:{breakLine:true}},
 {text:"成本优势            ■■",options:{breakLine:true}},
 {text:"规模效应            ■□",options:{breakLine:true}},
 {text:"网络效应            □□"},
],{x:0.4,y:2.85,w:4.2,h:1.8,fontFace:MONO,fontSize:14,color:P.ink,lineSpacingMultiple:1.4,margin:0});
s3.addText("客观概括",{x:5.2,y:1.1,w:4.4,h:0.3,fontFace:SANS,fontSize:11,color:P.muted,charSpacing:2,margin:0});
s3.addText("近五年平均 ROE 18.5%，经营现金流对净利润覆盖 1.15 倍，护城河评分 7/10。",{x:5.2,y:1.4,w:4.4,h:0.9,fontFace:SANS,fontSize:14,color:"333333",lineSpacingMultiple:1.3,margin:0});
stat(s3,5.2,2.6,2.1,"现金流/净利","1.15×");
stat(s3,7.5,2.6,2.1,"营收 5Y CAGR","32% ▲",P.up); // 涨=红，唯一用红处
s3.addText("风险",{x:5.2,y:3.9,w:4.4,h:0.28,fontFace:SANS,fontSize:11,color:P.muted,margin:0});
s3.addText("公开信息提示 2 项，重点关注 1 项",{x:5.2,y:4.15,w:4.4,h:0.4,fontFace:SANS,fontSize:14,color:P.ink,margin:0});
footer(s3,"来源 Wind · 公司年报 · 3 / 6");

// 4 数据大字报 · 估值（hero + 分位 band，当前点墨色非涨跌）
let s4=pres.addSlide(); s4.background={color:P.paper};
header(s4,"宁德时代","300750","估值体检","A股 · 数据截至 2026-07-10");
s4.addText("当前 PE-TTM · 近 5 年分位",{x:0.4,y:1.1,w:6,h:0.3,fontFace:SANS,fontSize:11,color:P.muted,charSpacing:2,margin:0});
s4.addText([{text:"78",options:{fontFace:"Arial",fontSize:72}},{text:"%",options:{fontFace:"Arial",fontSize:30}}],{x:0.38,y:1.35,w:5,h:1.2,color:P.ink,margin:0});
s4.addShape(pres.shapes.RECTANGLE,{x:0.4,y:3.0,w:9.2,h:0.14,fill:{color:P.hair},line:{type:"none"}});
s4.addShape(pres.shapes.RECTANGLE,{x:0.4,y:3.0,w:7.18,h:0.14,fill:{color:P.ink},line:{type:"none"}});
s4.addShape(pres.shapes.OVAL,{x:7.44,y:2.92,w:0.3,h:0.3,fill:{color:P.ink},line:{type:"none"}});
[0.27,0.5,0.73].forEach(f=>s4.addShape(pres.shapes.RECTANGLE,{x:0.4+9.2*f,y:2.94,w:0.02,h:0.26,fill:{color:P.empty},line:{type:"none"}}));
s4.addText([{text:"P25",options:{align:"left"}},{text:"中位",options:{align:"center"}},{text:"P75",options:{align:"right"}}],{x:0.4,y:3.25,w:9.2,h:0.3,fontFace:MONO,fontSize:10,color:P.muted,margin:0});
s4.addText("当前估值处近 5 年偏高区间；PE-TTM 27.3×、股息率 2.1%。（客观呈现，非买卖信号）",{x:0.4,y:3.95,w:9.2,h:0.5,fontFace:SANS,fontSize:14,color:"444444",margin:0});
footer(s4,"来源 Wind · 4 / 6");

// 5 Pipeline · 产业链（利润池墨阶）
let s5=pres.addSlide(); s5.background={color:P.paper};
header(s5,"固态电池","题材","产业链图谱","A股 · 数据截至 2026-07-10");
s5.addText("利润池图谱 · 上中下游",{x:0.4,y:1.1,w:6,h:0.3,fontFace:SANS,fontSize:11,color:P.muted,charSpacing:2,margin:0});
const seg=[["上游 · 材料","25%",P.lg,1.1],["中游 · 电芯","45%",P.ink,1.7],["下游 · 应用","30%",P.dg,1.4]];
seg.forEach((g,idx)=>{const [lab,pc,col,h]=g; const bx=0.9+idx*2.9;
  s5.addShape(pres.shapes.RECTANGLE,{x:bx,y:3.5-h,w:2.2,h:h,fill:{color:col},line:{type:"none"}});
  s5.addText(lab,{x:bx-0.2,y:3.6,w:2.6,h:0.3,fontFace:MONO,fontSize:13,color:P.ink,align:"center",margin:0});
  s5.addText(pc,{x:bx-0.2,y:3.9,w:2.6,h:0.4,fontFace:"Arial",fontSize:22,color:P.ink,align:"center",margin:0});
  if(idx<2) s5.addText("→",{x:bx+2.15,y:2.85,w:0.55,h:0.5,fontFace:SANS,fontSize:24,color:P.lg,align:"center",margin:0});
});
s5.addText("墨色越深＝利润池越集中（中游电芯）。代表公司按相关度客观列示，不构成推荐。",{x:0.4,y:4.5,w:9.2,h:0.35,fontFace:MONO,fontSize:10,color:P.muted,margin:0});
footer(s5,"来源 行业公开资料 · 5 / 6");

// 6 免责（深底）
let s6=pres.addSlide(); s6.background={color:P.ink};
s6.addText("免责声明",{x:0.6,y:1.7,w:8,h:0.4,fontFace:SANS,fontSize:16,color:P.lg,charSpacing:3,margin:0});
s6.addText("本材料由「财经内容台」基于公开信息整理，仅作客观数据体检与信息呈现，不构成任何证券的买卖建议、目标价或收益承诺，判断权归投资者本人。数据截至 2026-07-10，来源见各页脚注。市场有风险，决策需谨慎。",{x:0.6,y:2.2,w:8.5,h:1.8,fontFace:SANS,fontSize:15,color:"DDDDDD",lineSpacingMultiple:1.5,margin:0});
footer(s6,"财经内容台 · 6 / 6",true);

pres.writeFile({fileName:"deck.pptx"}).then(()=>console.log("written deck.pptx"));
