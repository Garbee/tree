import {test, expect} from '@playwright/test';

const treeItemSelector = 'garbee-tree lit-virtualizer [role="treeitem"]';
const notSelectedItemSelector = 'garbee-tree lit-virtualizer [role="treeitem"][aria-selected="false"]:first-child';
const selectedItemSelector = 'garbee-tree lit-virtualizer [role="treeitem"][aria-selected="true"]:first-child';
const firstTreeItemSelector = `${treeItemSelector}:first-child`;

test.beforeEach(async ({page}) => {
  await page.goto('/');

  const node = page.locator(firstTreeItemSelector);
  await node.waitFor({
    state: 'visible',
    timeout: 750,
  });
});

test.describe('Enter', () => {
  test('it selects an unselected node', async({page}) => {
    const node = page.locator(firstTreeItemSelector);

    await expect(node).toHaveAttribute('aria-selected', 'false');

    await node.press('Enter');
    await page.locator(selectedItemSelector).waitFor({timeout: 500});

    await expect(node).toHaveAttribute('aria-selected', 'true');
  });

  test('it deselects a selected node', async({page}) => {
    const node = page.locator(firstTreeItemSelector);

    await expect(node).toHaveAttribute('aria-selected', 'false');

    await node.press('Enter');
    await page.locator(selectedItemSelector).waitFor({timeout: 500});


    await expect(node).toHaveAttribute('aria-selected', 'true');

    await node.press('Enter');
    await page.locator(notSelectedItemSelector).waitFor({timeout: 500});

    await expect(node).toHaveAttribute('aria-selected', 'false');
  });
});

test.describe('Space', () => {
  test('it selects an unselected node', async({page}) => {
    const node = page.locator(firstTreeItemSelector);

    await expect(node).toHaveAttribute('aria-selected', 'false');

    await node.press(' ');
    await page.locator(selectedItemSelector).waitFor({timeout: 500});


    await expect(node).toHaveAttribute('aria-selected', 'true');
  });

  test('it deselects a selected node', async({page}) => {
    const node = page.locator(firstTreeItemSelector);

    await expect(node).toHaveAttribute('aria-selected', 'false');

    await node.press(' ');
    await page.locator(selectedItemSelector).waitFor({timeout: 500});


    await expect(node).toHaveAttribute('aria-selected', 'true');

    await node.press(' ');
    await page.locator(notSelectedItemSelector).waitFor({timeout: 500});


    await expect(node).toHaveAttribute('aria-selected', 'false');
  });
});
