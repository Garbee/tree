import { test, expect } from '@playwright/test';

test('has tree component', async ({ page }) => {
  await page.goto('/');

  await expect(await page.$('garbee-tree')).toBeDefined();
});

test('renders tree component', async ({ page }) => {
  await page.goto('/');

  const node = await page.$('garbee-tree');
  const textContent = await node?.evaluate((shadowHost) => {
    const {shadowRoot} = shadowHost;

    const paragraph = shadowRoot?.querySelector('p');
    return paragraph?.textContent?.trim();
  });

  await expect(textContent).toEqual("I'll be a tree");
});
