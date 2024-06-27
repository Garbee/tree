import {test, expect} from '@playwright/test';

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

test('focuses last visible item in the tree', async({page}) => {
  const firstElement = page.locator(firstTreeItemSelector);
  const treeItems = page.locator(treeItemSelector);
  const lastItem = treeItems.last();

  await firstElement.focus({
    timeout: 100,
  });

  await firstElement.press('End');

  await expect(firstElement).toHaveAttribute('tabindex', '-1');
  await expect(lastItem).toHaveAttribute('tabindex', '0');
  await expect(lastItem).toBeFocused();
});

test('does nothing when last item is already focused', async({page}) => {
  const firstElement = page.locator(firstTreeItemSelector);
  const treeItems = page.locator(treeItemSelector);
  const lastItem = treeItems.last();

  await firstElement.focus({
    timeout: 100,
  });

  await firstElement.press('End');
  await lastItem.press('End');

  await expect(lastItem).toHaveAttribute('tabindex', '0');
  await expect(lastItem).toBeFocused();
});
