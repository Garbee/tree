import {test, expect} from '@playwright/test';

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

test('focuses first visible item in the tree', async({page}) => {
  const firstElement = page.locator(firstTreeItemSelector);
  const treeItems = page.locator(treeItemSelector);
  const lastItem = treeItems.last();

  await lastItem.click();
  await lastItem.press('Home');

  await expect(firstElement).toHaveAttribute('tabindex', '0');
  await expect(lastItem).toHaveAttribute('tabindex', '-1');
  await expect(firstElement).toBeFocused();
});

test('does nothing when the first item is already focused', async({page}) => {
  const firstElement = page.locator(firstTreeItemSelector);

  await firstElement.focus();
  await firstElement.press('Home');

  await expect(firstElement).toHaveAttribute('tabindex', '0');
  await expect(firstElement).toBeFocused();
});
