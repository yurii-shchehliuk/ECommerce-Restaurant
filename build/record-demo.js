/**
 * Records the demo flow with Chrome's own screencast, headless. What is captured is
 * the page's viewport and nothing else: there is no browser window, no chrome, no
 * desktop, no taskbar and no notification area anywhere in the buffer.
 *
 * Screencast frames arrive only when the page changes, so they are timestamped and
 * resampled to a constant rate afterwards.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:5200';
const OUT = process.env.FRAMES || 'frames';
const W = 1240, H = 740;
const FPS = 10;

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--force-prefers-reduced-motion', '--hide-scrollbars'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('owlet_theme', 'light');
  });

  const hold = (ms) => sleep(ms);

  const clickText = async (tag, text) => {
    await page.waitForFunction((t, x) => Array.from(document.querySelectorAll(t))
      .some((e) => (e.innerText || '').trim().toLowerCase().includes(x.toLowerCase())
        && !e.disabled), { timeout: 30000 }, tag, text);
    const handle = await page.evaluateHandle((t, x) => Array.from(document.querySelectorAll(t))
      .find((e) => (e.innerText || '').trim().toLowerCase().includes(x.toLowerCase())
        && !e.disabled), tag, text);
    const el = handle.asElement();
    if (!el) throw new Error(`no ${tag} containing "${text}"`);
    await el.click();
  };

  const click = async (selector) => {
    await page.waitForSelector(selector, { visible: true, timeout: 30000 });
    await page.click(selector);
  };

  await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await hold(500);

  const client = await page.createCDPSession();
  const shots = [];
  let t0 = null;
  client.on('Page.screencastFrame', async ({ data, sessionId, metadata }) => {
    const at = metadata.timestamp * 1000;
    if (t0 === null) t0 = at;
    shots.push({ at: at - t0, buf: Buffer.from(data, 'base64') });
    try { await client.send('Page.screencastFrameAck', { sessionId }); } catch { /* closing */ }
  });
  await client.send('Page.startScreencast', {
    format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1,
  });

  await hold(1700);                                          // the storefront

  await clickText('a', 'Sign in');
  await page.waitForSelector('input[type="email"]', { visible: true });
  await hold(600);
  await page.type('input[type="email"]', 'bob@test.com', { delay: 55 });
  await page.type('input[type="password"]', 'Pa$$w0rd', { delay: 55 });
  await hold(600);
  await clickText('button', 'Sign in');
  await page.waitForFunction(() => !!localStorage.getItem('token'), { timeout: 20000 });
  await hold(1400);

  await clickText('a', 'Menu');
  await page.waitForSelector('article.product', { visible: true });
  await hold(1900);

  const adds = await page.$$('article.product .btn-accent');
  await adds[0].click();
  await hold(1000);
  await adds[3].click();
  await hold(1400);

  await click('a.basket-link');
  await page.waitForSelector('a.basket__checkout', { visible: true, timeout: 30000 });
  await hold(2000);

  await click('a.basket__checkout');
  await page.waitForSelector('.address-grid', { visible: true, timeout: 30000 });
  await hold(2000);
  await clickText('button', 'Go to delivery');
  await hold(1300);

  await page.waitForSelector('input.option__input', { visible: true });
  const radios = await page.$$('input.option__input');
  await radios[1].click();
  await hold(1100);
  await clickText('button', 'Go to review');
  await hold(1700);

  await page.waitForSelector('.step-actions', { visible: true });
  await clickText('button', 'Go to payment');
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('button'))
      .some((b) => b.innerText.trim().toLowerCase().startsWith('place the order')),
    { timeout: 30000 }
  );
  await hold(2800);                                          // why there is no card step
  await clickText('button', 'Place the order');
  await page.waitForFunction(() => location.pathname.startsWith('/checkout/success'),
    { timeout: 30000 });
  await hold(2300);

  await clickText('a', 'Watch it arrive');
  await page.waitForSelector('table tbody tr', { visible: true, timeout: 30000 });
  await hold(4000);

  await client.send('Page.stopScreencast');
  await sleep(300);
  await browser.close();

  // Resample the change-driven frames onto a constant rate.
  shots.sort((a, b) => a.at - b.at);
  const span = shots[shots.length - 1].at;
  const step = 1000 / FPS;
  let cursor = 0, n = 0;
  for (let t = 0; t <= span; t += step) {
    while (cursor + 1 < shots.length && shots[cursor + 1].at <= t) cursor++;
    fs.writeFileSync(path.join(OUT, String(n).padStart(5, '0') + '.jpg'), shots[cursor].buf);
    n++;
  }
  console.log('screencast frames:', shots.length, '-> resampled', n, 'at', FPS, 'fps =',
    (n / FPS).toFixed(1), 's');
})();
