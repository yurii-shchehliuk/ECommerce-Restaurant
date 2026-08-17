/**
 * Client audit. Drives the built bundle through the gateway on :5200 and checks, on
 * every route, at two widths and in both themes:
 *
 *   - exactly one h1
 *   - no horizontal scroll
 *   - every form control has an accessible name
 *   - every button and link has an accessible name
 *   - every img has an alt attribute
 *   - every run of text meets WCAG AA contrast against its own background
 *
 * Writes docs/client-audit.txt.
 */
const puppeteer = require('puppeteer');
const fs = require('fs');

const BASE = process.env.BASE || 'http://localhost:5200';
const API = BASE + '/svc';
const EMAIL = 'bob@test.com';
const PASSWORD = 'Pa$$w0rd';

const WIDTHS = [
  { name: '1360px', width: 1360, height: 900 },
  { name: '360px', width: 360, height: 740 },
];
const THEMES = ['light', 'dark'];

async function api(path, options = {}) {
  const res = await fetch(API + path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${text.slice(0, 200)}`);
  return text ? JSON.parse(text) : null;
}

// ---------------------------------------------------------------- in-page checks
const CHECKS = function () {
  const problems = [];

  const parseColor = (value) => {
    const m = value.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };

  const over = (fg, bg) => {
    const a = fg.a;
    return {
      r: fg.r * a + bg.r * (1 - a),
      g: fg.g * a + bg.g * (1 - a),
      b: fg.b * a + bg.b * (1 - a),
      a: 1,
    };
  };

  const luminance = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };

  const ratio = (a, b) => {
    const la = luminance(a), lb = luminance(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };

  const backgroundOf = (el) => {
    let base = { r: 255, g: 255, b: 255, a: 1 };
    const stack = [];
    for (let node = el; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage && style.backgroundImage !== 'none') return null; // not decidable
      const c = parseColor(style.backgroundColor);
      if (!c) continue;
      if (c.a > 0) stack.push(c);
      if (c.a === 1) { base = c; break; }
    }
    let result = base;
    for (let i = stack.length - 1; i >= 0; i--) result = over(stack[i], result);
    return result;
  };

  const accessibleName = (el) => {
    const aria = (el.getAttribute('aria-label') || '').trim();
    if (aria) return aria;
    const by = el.getAttribute('aria-labelledby');
    if (by) {
      const text = by.split(/\s+/)
        .map((id) => (document.getElementById(id) || {}).textContent || '')
        .join(' ').trim();
      if (text) return text;
    }
    const title = (el.getAttribute('title') || '').trim();
    if (title) return title;
    const text = (el.innerText || el.textContent || '').trim();
    if (text) return text;
    const img = el.querySelector('img[alt]');
    if (img && img.getAttribute('alt').trim()) return img.getAttribute('alt').trim();
    return '';
  };

  const describe = (el) => {
    const id = el.id ? '#' + el.id : '';
    const cls = el.className && typeof el.className === 'string'
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    return el.tagName.toLowerCase() + id + cls;
  };

  const visible = (el) => {
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  };

  // 1. exactly one h1
  const h1s = Array.from(document.querySelectorAll('h1')).filter(visible);
  if (h1s.length !== 1) problems.push(`h1 count is ${h1s.length}, expected 1`);

  // 2. no horizontal scroll
  const doc = document.documentElement;
  if (doc.scrollWidth > window.innerWidth + 1) {
    problems.push(`horizontal scroll: scrollWidth ${doc.scrollWidth} > viewport ${window.innerWidth}`);
  }

  // 3. labelled form controls
  for (const el of document.querySelectorAll('input, select, textarea')) {
    if (el.type === 'hidden' || !visible(el)) continue;
    let name = accessibleName(el);
    if (!name && el.id) {
      const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (label) name = label.textContent.trim();
    }
    if (!name && el.closest('label')) name = el.closest('label').textContent.trim();
    if (!name && el.getAttribute('placeholder')) name = el.getAttribute('placeholder').trim();
    if (!name) problems.push(`form control without an accessible name: ${describe(el)}`);
  }

  // 4. named buttons and links
  for (const el of document.querySelectorAll('button, a[href], [role="button"]')) {
    if (!visible(el)) continue;
    if (!accessibleName(el)) {
      problems.push(`${el.tagName.toLowerCase()} without an accessible name: ${describe(el)}`);
    }
  }

  // 5. images carry alt
  for (const el of document.querySelectorAll('img')) {
    if (!el.hasAttribute('alt')) problems.push(`img without alt: ${el.getAttribute('src')}`);
  }

  // 6. WCAG AA contrast on every visible run of text
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  let node;
  while ((node = walker.nextNode())) {
    const text = node.textContent.trim();
    if (!text) continue;
    const el = node.parentElement;
    if (!el || !visible(el)) continue;
    if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName)) continue;
    const style = getComputedStyle(el);
    const fg = parseColor(style.color);
    const bg = backgroundOf(el);
    if (!fg || !bg) continue;
    const colour = fg.a < 1 ? over(fg, bg) : fg;
    const size = parseFloat(style.fontSize);
    const weight = parseInt(style.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const need = large ? 3 : 4.5;
    const got = ratio(colour, bg);
    if (got < need - 0.005) {
      const key = describe(el) + '|' + text.slice(0, 30);
      if (seen.has(key)) continue;
      seen.add(key);
      problems.push(
        `contrast ${got.toFixed(2)}:1 below ${need}:1 - ${describe(el)} "${text.slice(0, 40)}"`
      );
    }
  }

  return problems;
};

// ---------------------------------------------------------------- driver
(async () => {
  const login = await api('/identity/api/user/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  const token = login.token;
  const auth = { Authorization: 'Bearer ' + token };

  const page1 = await api('/basket/api/products?pageIndex=1&pageSize=3');
  const product = page1.data[0];

  const basketId = 'audit-basket';
  await api('/basket/api/basket', {
    method: 'POST',
    body: JSON.stringify({
      id: basketId,
      deliveryMethodId: 2,
      items: [{
        id: product.id, productName: product.name, price: product.price, quantity: 2,
        pictureUrl: product.pictureUrl, brand: product.productBrand, type: product.productType,
      }],
    }),
  });

  // An order, so /orders and /orders/:id have something to render.
  await api('/basket/api/orders', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      basketId: 'audit-order-basket',
      deliveryMethodId: 2,
      shipToAddress: {
        firstName: 'Bob', lastName: 'Bobbity', street: '10 The Street',
        city: 'New York', state: 'NY', zipcode: '90210',
      },
    }),
  }).catch(() => {});
  await api('/basket/api/basket', {
    method: 'POST',
    body: JSON.stringify({
      id: 'audit-order-basket', deliveryMethodId: 2,
      items: [{
        id: product.id, productName: product.name, price: product.price, quantity: 1,
        pictureUrl: product.pictureUrl, brand: product.productBrand, type: product.productType,
      }],
    }),
  });
  await api('/basket/api/orders', {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({
      basketId: 'audit-order-basket',
      deliveryMethodId: 2,
      shipToAddress: {
        firstName: 'Bob', lastName: 'Bobbity', street: '10 The Street',
        city: 'New York', state: 'NY', zipcode: '90210',
      },
    }),
  });
  const orders = await api('/basket/api/orders', { headers: auth });
  const orderId = orders[0].id;

  const ROUTES = [
    ['/', 'home'],
    ['/shop', 'menu'],
    [`/shop/${product.id}`, 'product details'],
    ['/basket', 'basket'],
    ['/checkout', 'checkout wizard'],
    ['/checkout/success', 'order placed'],
    ['/orders', 'your orders'],
    [`/orders/${orderId}`, 'order detail'],
    ['/account/login', 'sign in'],
    ['/account/register', 'create an account'],
    ['/admin/order-events', 'order events'],
    ['/admin/completed-orders', 'all orders'],
    ['/admin/menu-management', 'catalogue'],
    ['/features/chat', 'chat'],
    ['/server-error', 'server error'],
    ['/no-such-page', 'not found'],
  ];

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const lines = [];
  let failures = 0;

  for (const theme of THEMES) {
    for (const size of WIDTHS) {
      const page = await browser.newPage();
      await page.setViewport({ width: size.width, height: size.height });
      await page.goto(BASE + '/', { waitUntil: 'networkidle0' });
      await page.evaluate((t, tok, basket) => {
        localStorage.setItem('owlet_theme', t);
        localStorage.setItem('token', tok);
        localStorage.setItem('basket_id', basket);
      }, theme, token, basketId);

      for (const [route, label] of ROUTES) {
        await page.goto(BASE + route, { waitUntil: 'networkidle0', timeout: 60000 });
        await new Promise((r) => setTimeout(r, 700));
        const problems = await page.evaluate(CHECKS);
        const head = `${theme.padEnd(5)} ${size.name.padEnd(7)} ${route.padEnd(26)} ${label}`;
        if (problems.length === 0) {
          lines.push(`PASS  ${head}`);
        } else {
          failures += problems.length;
          lines.push(`FAIL  ${head}`);
          for (const p of problems) lines.push(`        ${p}`);
        }
      }
      await page.close();
    }
  }
  await browser.close();

  const header = [
    'Owlet client audit',
    '',
    `Run:      ${new Date().toISOString()}`,
    `Target:   ${BASE} (the Compose stack, gateway on 5200)`,
    `Harness:  build/audit-client.js, puppeteer ${require('puppeteer/package.json').version}`,
    `Routes:   ${ROUTES.length}`,
    `Widths:   ${WIDTHS.map((w) => w.name).join(', ')}`,
    `Themes:   ${THEMES.join(', ')}`,
    `Checks:   one h1 per page; no horizontal scroll; every form control, button and`,
    '          link has an accessible name; every img has alt; every run of text meets',
    '          WCAG AA contrast (4.5:1, or 3:1 for large text) against its own',
    '          computed background',
    '',
    `Result:   ${ROUTES.length * WIDTHS.length * THEMES.length} page checks, ${failures} problems`,
    '',
  ].join('\n');

  fs.writeFileSync(process.env.OUT || 'client-audit.txt', header + lines.join('\n') + '\n');
  console.log(header);
  console.log(lines.filter((l) => l.startsWith('FAIL') || l.startsWith('    ')).join('\n'));
  console.log('problems:', failures);
})();
