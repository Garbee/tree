import {
  test,
  expect,
} from '@playwright/test';
import type {TreeElement} from '@garbee/tree/tree.js';

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

test('fires when an item is selected', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  const customEventPromise = page.evaluate(async() => {
    return new Promise((resolve) => {
      // @ts-expect-error Have not yet typed the event.
      document.addEventListener('tree-item-selected', (event: CustomEvent) => {
        resolve(event.detail);
      });
    });
  });

  await firstItem.press('Enter');

  const eventDetail: {
    selectedItems: Array<unknown>;
  } = await customEventPromise as {
    selectedItems: Array<unknown>;
  };

  expect(eventDetail.selectedItems).toHaveLength(1);
});

test('fires when an item is deselected', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  await firstItem.press('Enter');

  const customEventPromise = page.evaluate(async() => {
    return new Promise((resolve) => {
      // @ts-expect-error Have not yet typed the event.
      document.addEventListener('tree-item-selected', (event: CustomEvent) => {
        resolve(event.detail);
      });
    });
  });

  await firstItem.press('Enter');

  const eventDetail: {
    selectedItems: Array<unknown>;
  } = await customEventPromise as {
    selectedItems: Array<unknown>;
  };

  expect(eventDetail.selectedItems).toHaveLength(0);
});

test('fires when multiple items are selected', async({page}) => {
  const tree = page.locator('garbee-tree');
  const virtualizer = page.locator('garbee-tree lit-virtualizer');

  await expect(virtualizer).toHaveAttribute('aria-multiselectable', 'false');

  await tree.evaluate((treeElement: TreeElement) => {
    treeElement.multiple = true;
  });

  await expect(virtualizer).toHaveAttribute('aria-multiselectable', 'true');

  const firstItem = page.locator(firstTreeItemSelector);
  const lastItem = page.locator(treeItemSelector).last();

  await firstItem.press('Enter');

  const customEventPromise = page.evaluate(async() => {
    return new Promise((resolve) => {
      // @ts-expect-error Have not yet typed the event.
      document.addEventListener('tree-item-selected', (event: CustomEvent) => {
        resolve(event.detail);
      });
    });
  });

  await firstItem.press('End');
  await lastItem.press('Enter');

  const eventDetail: {
    selectedItems: Array<unknown>;
  } = await customEventPromise as {
    selectedItems: Array<unknown>;
  };

  expect(eventDetail.selectedItems).toHaveLength(2);
});
