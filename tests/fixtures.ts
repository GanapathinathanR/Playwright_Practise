import { test as base, expect } from '@playwright/test';

/**
 * Extended test fixture that automatically captures and attaches
 * a screenshot to the HTML report after every page navigation.
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    let navCount = 0;

    page.on('load', async () => {
      const url = page.url();
      if (!url || url === 'about:blank') return;
      navCount++;
      try {
        const pathname = new URL(url).pathname;
        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach(` Step ${navCount} — ${pathname}`, {
          body: screenshot,
          contentType: 'image/png',
        });
      } catch {
        // page may have already navigated away
      }
    });

    await use(page);

    // Final screenshot at end of every test (pass or fail)
    try {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach(` Final — ${testInfo.title}`, {
        body: screenshot,
        contentType: 'image/png',
      });
    } catch {
      // ignore if browser is already closed
    }
  },
});

export { expect };
