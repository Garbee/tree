import {test, expect} from '@playwright/test';

test('renders tree component', async ({ page }) => {
  await page.goto('/');

  const node = page.locator('garbee-tree lit-virtualizer demo-content-item:first-child');
  await node.waitFor({
    state: 'visible',
  });

  expect(node).toHaveText('Projects');
});
