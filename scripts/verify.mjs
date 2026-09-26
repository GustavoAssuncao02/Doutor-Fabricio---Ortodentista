import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chromium' });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await mkdir('test-results', { recursive: true });
for (const width of [1440, 768, 390, 320]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => {
    image.loading = 'eager';
    return image.decode();
  })));
  const overflowing = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflowing) throw new Error(`Horizontal overflow at ${width}px`);
  const broken = await page.locator('img').evaluateAll(images => images.filter(image => !image.complete || !image.naturalWidth).length);
  if (broken) throw new Error(`Broken images at ${width}px`);
  await page.screenshot({ path: `test-results/site-${width}.png`, fullPage: true });
  console.log(`PASS: ${width}px, no overflow or broken images`);
}
await page.getByRole('button', { name: 'Abrir menu' }).click();
await page.locator('#navigation').getByRole('link', { name: 'Tratamentos', exact: true }).click();
if (await page.getByRole('button', { name: 'Abrir menu' }).getAttribute('aria-expanded') !== 'false') throw new Error('Menu did not close');
const faq = page.getByRole('button', { name: 'Como agendar uma avaliação?' });
await faq.click();
if (!await page.locator('#faq-answer-0').isVisible()) throw new Error('FAQ did not open');
await faq.click();
if (await page.locator('#faq-answer-0').isVisible()) throw new Error('FAQ did not close');
const whatsappLinks = await page.locator('a[href*="wa.me"]').evaluateAll(links => links.map(link => link.href));
if (!whatsappLinks.length || whatsappLinks.some(href => !href.startsWith('https://wa.me/5571999075367?text='))) throw new Error('Wrong WhatsApp destination');
await page.emulateMedia({ reducedMotion: 'reduce' });
if (await page.locator('.floating-spark').evaluate(element => getComputedStyle(element).animationName) !== 'none') throw new Error('Reduced motion ignored');
if (errors.length) throw new Error(errors.join('\n'));
console.log('PASS: mobile navigation, FAQ, WhatsApp destinations, reduced motion, no runtime errors');
await browser.close();
