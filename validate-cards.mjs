// 财经内容台 · 卡片校验脚本
// 基于 Playwright 真实渲染测量，检查每个 .card 的硬规则：
//   R1 溢出   — 内容超出 1080×1440 会被裁切
//   R2 招牌带 — .masthead 含标的名/模块名/数据截至时点
//   R3 footer 固定件 — 含 slogan/免责简注 + 来源简注
//   R4 数据截至日 — 卡面出现 YYYY-MM-DD
//   R5 配色纪律 — 招牌带内不得出现红/绿（红绿只给涨跌数据）
// 用法：node validate-cards.mjs [输入.html]（默认 assets/template-card.html）
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const input = process.argv[2] || 'assets/template-card.html';
if (!fs.existsSync(input)) {
  console.error(`找不到输入文件：${input}`);
  process.exit(1);
}
const url = pathToFileURL(path.resolve(input)).href;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1120, height: 1500 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(200);

const results = await page.$$eval('.card', (cards) => {
  const UP = 'rgb(192, 57, 43)';    // #C0392B 涨红
  const DOWN = 'rgb(30, 158, 90)';  // #1E9E5A 跌绿
  return cards.map((card, idx) => {
    const errs = [], warns = [];

    // R1 溢出
    if (card.scrollHeight - card.clientHeight > 2) errs.push(`R1 内容溢出高度 +${card.scrollHeight - card.clientHeight}px（会被裁切）`);
    if (card.scrollWidth - card.clientWidth > 2) errs.push(`R1 内容溢出宽度 +${card.scrollWidth - card.clientWidth}px`);

    // R2 招牌带
    const mh = card.querySelector('.masthead');
    if (!mh) errs.push('R2 缺招牌带 .masthead');
    else {
      if (!mh.querySelector('.name')) errs.push('R2 招牌带缺标的名 .name');
      if (!mh.querySelector('.module')) errs.push('R2 招牌带缺模块名 .module');
      const meta = mh.querySelector('.meta')?.textContent || '';
      if (!/数据截至|截至|申购|招股/.test(meta)) warns.push('R2 招牌带 meta 未见数据截至/时点');
    }

    // R3 footer 固定件
    const ft = card.querySelector('.footer');
    if (!ft) errs.push('R3 缺 footer 固定件');
    else {
      const t = ft.textContent || '';
      if (!/不含买卖建议|不含申购建议|不构成|公开信息提示|统计参考/.test(t)) errs.push('R3 footer 缺 slogan/免责简注');
      if (!/来源|招股书|公告|交易所|年报|季报|Wind/.test(t)) warns.push('R3 footer 未见来源简注');
    }

    // R4 数据截至日
    if (!/\d{4}-\d{2}-\d{2}/.test(card.textContent)) warns.push('R4 卡面未见 YYYY-MM-DD 数据截至日');

    // R5 招牌带配色纪律：红/绿不得进招牌带
    if (mh) {
      const bad = [...mh.querySelectorAll('*')].some(el => {
        const c = getComputedStyle(el).color;
        return c === UP || c === DOWN;
      });
      if (bad) errs.push('R5 招牌带出现红/绿（红绿只给涨跌数据，不得进招牌带）');
    }

    const label = (mh?.querySelector('.name')?.textContent || '').trim() + ' · ' + (mh?.querySelector('.module')?.textContent || '').trim();
    return { idx: idx + 1, label, errs, warns };
  });
});

let fail = 0, warn = 0;
for (const r of results) {
  const status = r.errs.length ? '✗' : (r.warns.length ? '△' : '✓');
  console.log(`${status} #${r.idx} ${r.label}`);
  r.errs.forEach(e => { console.log('   ✗ ' + e); fail++; });
  r.warns.forEach(w => { console.log('   △ ' + w); warn++; });
}
await browser.close();
console.log(`\n${results.length} 张卡片 · ${fail} 错误 · ${warn} 警告`);
process.exit(fail ? 1 : 0);
