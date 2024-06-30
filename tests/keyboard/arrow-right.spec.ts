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

test('when focus is on a closed node, opens the node; focus does not move.', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);

  await firstItem.focus();
  await expect(firstItem).toHaveAttribute('aria-expanded', 'false');
  await expect(firstItem).toBeFocused();

  await firstItem.press('ArrowRight');

  await expect(firstItem).toHaveAttribute('aria-expanded', 'true');
  await expect(firstItem).toBeFocused();
});

test('when on an open node, move focus to first child', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);
  const allItems = page.locator(treeItemSelector);

  await firstItem.press('ArrowRight');

  await expect(firstItem).toHaveAttribute('aria-expanded', 'true');

  await firstItem.press('ArrowRight');

  await expect(firstItem).not.toBeFocused();
  await expect(firstItem).toHaveAttribute('tabindex', '-1');

  const firstChild = (await allItems.all()).at(1);

  await expect(firstChild!).toBeFocused();
  await expect(firstChild!).toHaveAttribute('tabindex', '0');
});

test('when focus is on an end node, does nothing.', async({page}) => {
  const firstItem = page.locator(firstTreeItemSelector);
  const allItems = page.locator(treeItemSelector);

  await firstItem.press('ArrowRight');
  await firstItem.press('ArrowRight');

  const firstChild = (await allItems.all()).at(1);

  await expect(firstChild!).toBeFocused();
  await expect(firstChild!).toHaveAttribute('tabindex', '0');

  await firstChild?.press('ArrowRight');

  await expect(firstChild!).toBeFocused();
  await expect(firstChild!).toHaveAttribute('tabindex', '0');
});
