import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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
  assert.match(readme, /推导链.*断裂.*停止.*定性/s);
  assert.match(readme, /十个分析块.*最低覆盖|框架外扫描/s);
});
