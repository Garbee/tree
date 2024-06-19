import { test, expect } from '@playwright/test';

test('has tree component', async ({ page }) => {
  await page.goto('/');

  await expect(await page.$('garbee-tree')).toBeDefined();
});

test('renders tree component', async ({ page }) => {
  await page.goto('/');

  const node = await page.$('garbee-tree');
  const virtualizerNode = await node?.evaluate((shadowHost) => {
    const {shadowRoot} = shadowHost;

    return shadowRoot?.querySelector('lit-virtualizer');
  });

  await expect(virtualizerNode).toBeDefined();
});
