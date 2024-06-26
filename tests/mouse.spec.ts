import {test, expect} from '@playwright/test';

const treeItemSelector = 'garbee-tree lit-virtualizer [role="treeitem"]';
const firstTreeItemSelector = `${treeItemSelector}:first-child`;

test.beforeEach(async ({page}) => {
  await page.goto('/');

  const node = page.locator(firstTreeItemSelector);
  await node.waitFor({
    state: 'visible',
    timeout: 500,
  });
});

test('expansion', async ({ page }) => {
  const node = page.locator(firstTreeItemSelector);
  const childNode = page.locator('garbee-tree lit-virtualizer demo-content-item:nth-child(4)');

  await test.step('opens a closed node on click', async () => {
    expect(node).toHaveAttribute('aria-expanded', 'false');

    await node.click();

    await childNode.waitFor({
      state: 'visible',
      timeout: 500,
    });

    expect(node).toHaveAttribute('aria-expanded', 'true');
    expect(childNode).toHaveText('project-3');
  });

  await test.step('closes an opened node on click', async () => {
    expect(node).toHaveAttribute('aria-expanded', 'true');

    await node.click();
    await childNode.waitFor({
      state: 'detached',
      timeout: 500,
    });

    expect(node).toHaveAttribute('aria-expanded', 'false');
  });
});

test('selection', async ({page}) => {
  const node = page.locator(firstTreeItemSelector);

  await test.step('Selects an element when it is unselected', async () => {
    expect(node).toHaveAttribute('aria-selected', 'false');

    await node.click();

    expect(node).toHaveAttribute('aria-selected', 'true');
  });

  await test.step('deselects a selected item', async () => {
    expect(node).toHaveAttribute('aria-selected', 'true');

    await node.click();

    expect(node).toHaveAttribute('aria-selected', 'false');
  });
});

test('tabindex moves with click', async ({page}) => {
  const firstItemNode = page.locator(firstTreeItemSelector);

  await test.step('tabindex remains if already 0', async () => {
    expect(firstItemNode).toHaveAttribute('tabindex', '0');

    await firstItemNode.click();

    expect(firstItemNode).toHaveAttribute('tabindex', '0');

    const treeItemNodes = await page.locator(treeItemSelector).all();
    const treeItems = {
      '0': [],
      '-1': [],
    };

    for (const item of treeItemNodes) {
      const tabIndex = (await item.getAttribute('tabindex') as string);

      treeItems[tabIndex].push(item);
    }

    expect(treeItems['0'].length).toEqual(1);
    expect(treeItems['-1'].length).toBeGreaterThan(3);
  });

  await test.step('tabindex moves to node if at -1', async () => {
    expect(firstItemNode).toHaveAttribute('tabindex', '0');

    const childNode = page.locator('garbee-tree lit-virtualizer demo-content-item:nth-child(4)');

    expect(childNode).toHaveAttribute('tabindex', '-1');

    await childNode.click();

    expect(childNode).toHaveAttribute('tabindex', '0');
    expect(firstItemNode).toHaveAttribute('tabindex', '-1');
  });
});