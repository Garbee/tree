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

test('it does nothing when focus is on the first item', async({page}) => {
  const firstItem = page
    .locator(firstTreeItemSelector);

  await firstItem.focus();
  await firstItem.press('ArrowUp');

  await expect(firstItem).toBeFocused();
  await expect(firstItem).toHaveAttribute('tabindex', '0');
});

test('it moves focus to the previous visible element', async({page}) => {
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
  await firstItem.press('End');

  await expect(firstItem).toHaveAttribute('tabindex', '-1');
  await expect(firstItem).not.toBeFocused();
  await expect(thirdItem).toHaveAttribute('tabindex', '0');
  await expect(thirdItem).toBeFocused();

  await thirdItem.press('ArrowUp');

  await expect(thirdItem).toHaveAttribute('tabindex', '-1');
  await expect(thirdItem).not.toBeFocused();
  await expect(secondItem).toHaveAttribute('tabindex', '0');
  await expect(secondItem).toBeFocused();

  await secondItem.press('ArrowUp');

  await expect(secondItem).toHaveAttribute('tabindex', '-1');
  await expect(secondItem).not.toBeFocused();
  await expect(firstItem).toHaveAttribute('tabindex', '0');
  await expect(firstItem).toBeFocused();
});
