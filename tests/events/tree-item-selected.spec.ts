import {
  test,
  expect,
} from '@playwright/test';
import type {
  TreeElement,
} from '@garbee/tree/tree.js';

const treeItemSelector = ' garbee-tree demo-content-item';
const firstTreeItemSelector = `${treeItemSelector}:first-child`;

test.beforeEach(async({page}) => {
  await page.goto('/');

  const node = page.locator(firstTreeItemSelector);
  await node.waitFor({
    state: 'visible',
    timeout: 750,
  });
});

test('fires when an item is selected', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  const customEventPromise = page.evaluate(async() => {
    return new Promise((resolve) => {
      document.addEventListener('garbee-tree-item-selection-changed', (event) => {
        resolve(event.selectedItems);
      });
    });
  });

  await firstItem.press('Enter');

  expect(await customEventPromise).toHaveLength(1);
});

test('fires when an item is deselected', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  await firstItem.press('Enter');

  const customEventPromise = page.evaluate(async() => {
    return new Promise((resolve) => {
      document.addEventListener('garbee-tree-item-selection-changed', (event) => {
        resolve(event.selectedItems);
      });
    });
  });

  await firstItem.press('Enter');

  expect(await customEventPromise).toHaveLength(0);
});

test('fires when multiple items are selected', async({page}) => {
  const tree = page.locator('garbee-tree');

  await expect(tree).not.toHaveAttribute('aria-multiselectable', {
    timeout: 50,
  });

  await tree.evaluate((treeElement: TreeElement) => {
    treeElement.ariaMultiSelectable = 'true';
  });

  await expect(tree).toHaveAttribute('aria-multiselectable', 'true', {
    timeout: 50,
  });

  const firstItem = page.locator(firstTreeItemSelector);
  const lastItem = page.locator(treeItemSelector).last();

  await firstItem.press('Enter');

  const customEventPromise = page.evaluate(async() => {
    return new Promise((resolve) => {
      document.addEventListener('garbee-tree-item-selection-changed', (event) => {
        resolve(event.selectedItems);
      });
    });
  });

  await firstItem.press('End');
  await lastItem.press('Enter');

  expect(await customEventPromise).toHaveLength(2);
});
