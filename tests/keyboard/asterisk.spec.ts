import type {
  TreeElement,
} from '@garbee/tree/tree.js';
import {
  test,
  expect,
} from '@playwright/test';

const treeItemSelector = 'garbee-tree lit-virtualizer [role="treeitem"]';
const firstTreeItemSelector = `${treeItemSelector}:first-child`;

test.beforeEach(async({page}) => {
  await page.goto('/');

  const node = page.locator(firstTreeItemSelector);
  await node.waitFor({
    state: 'visible',
    timeout: 750,
  });
});

test('it expands each item at the current level', async({page}) => {
  const treeNode = page.locator('garbee-tree');
  const firstItem = page.locator(firstTreeItemSelector);

  await firstItem.focus();
  await firstItem.press('*');

  const currItems = await treeNode.evaluate((
    tree: TreeElement,
  ) => {
    return tree.content;
  });

  for (const item of currItems) {
    if (item.level === 1) {
      expect(item.expanded.value).toBe(true);
      continue;
    }

    expect(item.expanded.value).toBeFalsy();
  }

  await expect(firstItem).toBeFocused();
});
