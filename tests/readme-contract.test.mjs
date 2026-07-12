import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const readmeUrl = new URL('../README.md', import.meta.url);

test('README presents capability, evidence, and installation in the approved order', async () => {
  const readme = await readFile(readmeUrl, 'utf8');

  assert.match(readme, /把一句“分析一下”，变成一份专业财经研究报告/);
  assert.match(readme, /专业不是靠语气，是靠约束/);
  assert.match(readme, /npx skills add nekopunch11\/rodya-caijing-studio/);

  const capabilities = readme.indexOf('七种能力');
  const evidence = readme.indexOf('专业不是靠语气');
  const install = readme.indexOf('安装');
  const audience = readme.indexOf('适合谁');

  assert.ok(capabilities >= 0, 'missing 七种能力 section');
  assert.ok(evidence >= 0, 'missing authority-evidence section');
  assert.ok(install >= 0, 'missing installation section');
  assert.ok(audience >= 0, 'missing audience section');
  assert.ok(capabilities < evidence, 'capabilities must precede authority evidence');
  assert.ok(evidence < install, 'authority evidence must precede installation');
  assert.ok(install < audience, 'installation must precede audience labels');
});

test('README keeps unapproved samples behind a review gate', async () => {
  const readme = await readFile(readmeUrl, 'utf8');

  assert.match(readme, /宁德时代/);
  assert.match(readme, /招商银行/);
  assert.match(readme, /小米集团/);
  assert.match(readme, /样张[^\n]*审核|审核[^\n]*样张/);
  assert.doesNotMatch(readme, /assets\/samples\//);
});

test('README places the WeChat callout after the audience section', async () => {
  const readme = await readFile(readmeUrl, 'utf8');
  const audience = readme.indexOf('适合谁');
  const wechat = readme.indexOf('微信公众号「风骨」');

  assert.ok(wechat >= 0, 'missing WeChat callout');
  assert.ok(audience < wechat, 'WeChat callout must follow the audience section');
});

test('README explains why fundamental conclusions are reproducible', async () => {
  const readme = await readFile(readmeUrl, 'utf8');

  assert.match(readme, /原始数据.*口径.*计算.*历史.*同业.*反面证据.*证伪/s);
  assert.match(readme, /断裂.*三角测算.*估算区间|估算区间.*绝不留空/s);
  assert.match(readme, /十四段.*全面框架|框架外扫描/s);
});

test('README publishes only author-approved samples', async () => {
  const readme = await readFile(readmeUrl, 'utf8');
  const cmbPreview = new URL('../docs/samples/cmb/招商银行_估值客户合规卡.png', import.meta.url);
  const xiaomiPreview = new URL('../docs/samples/xiaomi/小米集团_研究样张预览.png', import.meta.url);

  assert.match(readme, /招商银行.*docs\/samples\/cmb/s);
  assert.match(readme, /小米集团.*docs\/samples\/xiaomi/s);
  assert.match(readme, /宁德时代.*深度研究/s);
  await access(cmbPreview);
  await access(xiaomiPreview);
  assert.doesNotMatch(readme, /宁德时代_基本面研究样张\.docx/);
});
