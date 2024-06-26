import {test, expect} from '@playwright/test';
import {TreeElement} from '@garbee/tree/tree.js';

test('renders tree component', async ({ page }) => {
  await page.goto('/');

  const node = await page.$('garbee-tree');
  const virtualizerNode = await node?.evaluate(async (shadowHost: TreeElement) => {
    const {shadowRoot} = shadowHost;

    shadowHost.requestUpdate();
    await shadowHost.updateComplete;

    return shadowRoot?.querySelector('lit-virtualizer');
  });

  expect(virtualizerNode).toBeDefined();
});
