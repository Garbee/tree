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

test('when focus is on an open node, closes the node', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  await firstItem.press('ArrowRight');

  await expect(firstItem).toHaveAttribute('aria-expanded', 'true');

  await firstItem.press('ArrowLeft');

  await expect(firstItem).toHaveAttribute('aria-expanded', 'false');
});

test('when focus is on child node that is an end node, moves focus to its parent', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);
  const allItems = page.locator(treeItemSelector);

  await firstItem.press('ArrowRight');
  await firstItem.press('ArrowRight');

  const firstChild = (await allItems.all()).at(1);

  await expect(firstChild!).toBeFocused();

  await firstChild?.press('ArrowLeft');

  await expect(firstItem).toBeFocused();
});

test('when focus is on child node that is a closed node, moves focus to its parent', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);
  const allItems = page.locator(treeItemSelector);

  await firstItem.press('ArrowRight');
  await firstItem.press('ArrowRight');

  const firstChild = (await allItems.all()).at(1);
  const secondChild = (await allItems.all()).at(2);
  const thirdChild = (await allItems.all()).at(3);

  await firstChild?.press('ArrowDown');
  await secondChild?.press('ArrowDown');

  await expect(thirdChild!).toBeFocused();
  await expect(thirdChild!).toHaveAttribute('aria-expanded', 'false');

  await thirdChild?.press('ArrowLeft');

  await expect(firstItem).toBeFocused();
  await expect(firstItem).toHaveAttribute('aria-expanded', 'true');
});

test('when focus is on a closed root node, does nothing', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  await firstItem.focus();

  await expect(firstItem).toBeFocused();
  await expect(firstItem).toHaveAttribute('aria-expanded', 'false');

  await firstItem.press('ArrowLeft');

  await expect(firstItem).toBeFocused();
  await expect(firstItem).toHaveAttribute('aria-expanded', 'false');
});
