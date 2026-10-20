import { chromium } from 'playwright';

const URL = process.env.PORTFOLIO_URL || 'http://localhost:5173';

function rgb(hex) {
  const n = hex.replace('#', '');
  const v = n.length === 3 ? n.split('').map((c) => c + c).join('') : n;
  const r = parseInt(v.slice(0, 2), 16);
  const g = parseInt(v.slice(2, 4), 16);
  const b = parseInt(v.slice(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

const lightExpect = {
  skillLabel: rgb('#0F172A'),
  projectTitle: rgb('#0F172A'),
  projectDesc: rgb('#334155'),
  contactText: rgb('#334155'),
  heading: rgb('#0F172A'),
  pageBg: rgb('#F8FAFC'),
};

async function readColor(page, selector, prop = 'color') {
  return page.$eval(selector, (el, p) => getComputedStyle(el)[p], prop);
}

async function setTheme(page, mode) {
  await page.evaluate((m) => {
    document.documentElement.setAttribute('data-theme', m);
    document.body.setAttribute('data-theme', m);
  }, mode);
  await page.waitForTimeout(100);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });

  const failures = [];

  async function checkTheme(mode) {
    await setTheme(page, mode);
    const htmlTheme = await page.getAttribute('html', 'data-theme');
    if (htmlTheme !== mode) failures.push(`html data-theme expected ${mode}, got ${htmlTheme}`);

    if (mode === 'light') {
      const checks = [
        ['.skill-card > span', 'color', lightExpect.skillLabel, 'skill label'],
        ['.project-body h3', 'color', lightExpect.projectTitle, 'project title'],
        ['.project-body p', 'color', lightExpect.projectDesc, 'project description'],
        ['.contact-list li', 'color', lightExpect.contactText, 'contact line'],
        ['.section-title', 'color', lightExpect.heading, 'section heading'],
        ['.hero-line-main', 'color', rgb('#F8FAFC'), 'hero name line'],
        ['.hero-description', 'color', rgb('#E2E8F0'), 'hero description'],
        ['.hero h3', 'color', rgb('#F1F5F9'), 'hero role'],
        ['html', 'backgroundColor', lightExpect.pageBg, 'page background'],
      ];

      for (const [sel, prop, expected, label] of checks) {
        const actual = await readColor(page, sel, prop);
        if (actual !== expected) {
          failures.push(`light ${label}: expected ${expected}, got ${actual}`);
        }
      }

      const brandLetter = await page.textContent('.brand-mark-letter');
      if (brandLetter?.trim() !== 'M') {
        failures.push(`sidebar logo letter: expected "M", got "${brandLetter}"`);
      }
      const brandBoxBg = await readColor(page, '.brand-mark', 'backgroundColor');
      if (!brandBoxBg.startsWith('rgb(15, 23, 42')) {
        failures.push(`sidebar logo box: expected dark navy background, got ${brandBoxBg}`);
      }

      const aboutBg = await readColor(page, '.about-copy', 'backgroundColor');
      const aboutOk = aboutBg.startsWith('rgb(255, 255, 255') || aboutBg.startsWith('rgba(255, 255, 255');
      if (!aboutOk) {
        failures.push(`light about card: expected white/near-white background, got ${aboutBg}`);
      }
    }

    if (mode === 'dark') {
      const darkHeading = await readColor(page, '.section-title', 'color');
      if (darkHeading !== rgb('#F0F8FF')) {
        failures.push(`dark section heading: expected ${rgb('#F0F8FF')}, got ${darkHeading}`);
      }
    }
  }

  await checkTheme('dark');
  await checkTheme('light');
  await checkTheme('dark');

  await browser.close();

  if (failures.length) {
    console.error('Theme verification FAILED:');
    failures.forEach((f) => console.error(` - ${f}`));
    process.exit(1);
  }

  console.log('Theme verification passed (dark → light → dark).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
