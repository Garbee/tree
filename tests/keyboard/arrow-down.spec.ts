import {
  test,
  expect,
} from '@playwright/test';

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

test('it moves focus to the next visible element', async({page}) => {
  const items = await page.locator(treeItemSelector).all();
  const [
    firstItem,
    secondItem,
    thirdItem,
  ] = items;

  if (!firstItem || !secondItem || !thirdItem) {
    throw new Error('All tree items not hydrated');
  }

  await firstItem.focus();
  await firstItem.press('ArrowDown');

  await expect(firstItem).toHaveAttribute('tabindex', '-1');
  await expect(firstItem).not.toBeFocused();
  await expect(secondItem).toHaveAttribute('tabindex', '0');
  await expect(secondItem).toBeFocused();

  await secondItem.press('ArrowDown');

  await expect(secondItem).toHaveAttribute('tabindex', '-1');
  await expect(secondItem).not.toBeFocused();
  await expect(thirdItem).toHaveAttribute('tabindex', '0');
  await expect(thirdItem).toBeFocused();
});

test('it does nothing when on last item', async({page}) => {
  const firstItem = page
    .locator(firstTreeItemSelector);
  const lastItem = page
    .locator(treeItemSelector)
    .last();

  await firstItem.focus();
  await firstItem.press('End');

  await expect(lastItem).toHaveAttribute('tabindex', '0');
  await expect(lastItem).toBeFocused();

  await lastItem.press('ArrowDown');

  await expect(lastItem).toHaveAttribute('tabindex', '0');
  await expect(lastItem).toBeFocused();
});
