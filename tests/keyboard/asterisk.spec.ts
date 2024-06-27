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

  const currItems = treeNode.evaluate((
    tree: TreeElement,
  ) => {
    return tree.content.map((item) => {
      return [item.level, item.expanded.value];
    });
  }, undefined, {timeout: 1500});

  for (const [level, expanded] of await currItems) {
    if (level === 1) {
      expect(expanded).toBe(true);
      continue;
    }

    expect(expanded).toBeFalsy();
  }

  await expect(firstItem).toBeFocused();
});
