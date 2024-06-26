import {test, expect} from '@playwright/test';

const treeItemSelector = ' garbee-tree demo-content-item';
const notSelectedItemSelector = ' garbee-tree demo-content-item[aria-selected="false"]:first-child';
const selectedItemSelector = ' garbee-tree demo-content-item[aria-selected="true"]:first-child';
const firstTreeItemSelector = `${treeItemSelector}:first-child`;

test.beforeEach(async({page}) => {
  await page.goto('/');

  const node = page.locator(firstTreeItemSelector);
  await node.waitFor({
    state: 'visible',
    timeout: 750,
  });
});

test('it selects an unselected node', async({page}) => {
  const node = page.locator(firstTreeItemSelector);

  await expect(node).toHaveAttribute('aria-selected', 'false');

  await node.press(' ');
  await page.locator(selectedItemSelector).waitFor({
    timeout: 500,
  });

  await expect(node).toHaveAttribute('aria-selected', 'true');
});

test('it deselects a selected node', async({page}) => {
  const node = page.locator(firstTreeItemSelector);

  await expect(node).toHaveAttribute('aria-selected', 'false');

  await node.press(' ');
  await page.locator(selectedItemSelector).waitFor({
    timeout: 500,
  });

  await expect(node).toHaveAttribute('aria-selected', 'true');

  await node.press(' ');
  await page.locator(notSelectedItemSelector).waitFor({
    timeout: 500,
  });

  await expect(node).toHaveAttribute('aria-selected', 'false');
});
