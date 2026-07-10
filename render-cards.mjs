// 财经内容台 · 卡片渲染管线
// 逐张把 HTML 里的每个 .card 截成 2× PNG（墨账本 Swiss，1080×1440 → 2160×2880）。
// 用法：node render-cards.mjs [输入.html] [输出目录]
//   默认：assets/template-card.html → output/
//   环境变量 SCALE 控制倍率（默认 2）。
// 依赖：playwright（首次需 `npx playwright install chromium`）。
import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const input = process.argv[2] || 'assets/template-card.html';
const outDir = process.argv[3] || 'output';
const scale = Number(process.env.SCALE || 2);

if (!fs.existsSync(input)) {
  console.error(`找不到输入文件：${input}`);
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
const url = pathToFileURL(path.resolve(input)).href;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: scale });
await page.setViewportSize({ width: 1120, height: 1500 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(300); // 等字体

const cards = await page.$$('.card');
if (!cards.length) {
  console.error(`未在 ${input} 中找到 .card`);
  await browser.close();
  process.exit(1);
}

let i = 0;
for (const card of cards) {
  i++;
  const name = (await card.$eval('.masthead .name', el => el.textContent).catch(() => '')) || '';
  const module = (await card.$eval('.masthead .module', el => el.textContent).catch(() => '')) || '';
  const raw = `${String(i).padStart(2, '0')}-${(module || name).trim()}`;
  const slug = raw.replace(/[^\w一-龥-]+/g, '');
  const file = path.join(outDir, `${slug}.png`);
  await card.screenshot({ path: file });
  console.log(`✔ ${file}  (${name.trim()} · ${module.trim()})`);
}

await browser.close();
console.log(`\n完成：${i} 张卡片 → ${outDir}/ @ ${scale}×`);
