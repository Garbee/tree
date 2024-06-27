import {
  test,
  expect,
} from '@playwright/test';
import {
  TreeItem,
  type TreeItemMetadata,
} from '../../src/item/TreeItem.js';
import sinon from 'sinon';

interface TestTreeItemData {
  name: string;
}

const treeItemData = {
  name: 'Test Item',
};

const treeMetadata: TreeItemMetadata = {
  level: 1,
  inset: 1,
  size: 1,
  hasChildren: false,
};

const makeItem = function(
  identifier?: string,
): TreeItem<TestTreeItemData> {
  return new TreeItem<TestTreeItemData>(
    treeItemData,
    treeMetadata,
    undefined,
    identifier,
  );
};

test.describe('TreeItem', () => {
  test('can be made with a custom identifier', () => {
    const item = makeItem('test');

    expect(item.identifier).toStrictEqual('test');
  });

  test.describe('focusable state can be managed', () => {
    test('can be enabled', () => {
      const item = makeItem('test');

      expect(item.tabIndex.value).toStrictEqual(-1);

      item.enableFocus();

      expect(item.tabIndex.value).toStrictEqual(0);
    });

    test('can be disabled', () => {
      const item = makeItem('test');

      item.enableFocus();
      item.disableFocus();

      expect(item.tabIndex.value).toStrictEqual(-1);
    });
  });

  test.describe('expansion state can be managed', () => {
    test.describe('when it has children', () => {
      test('defaults to expanded', () => {
        const item = new TreeItem({name: 'Test Item'}, {
          level: 1,
          inset: 1,
          size: 1,
          hasChildren: true,
        });

        expect(item.expanded.value).toStrictEqual(true);
      });

      test('it can be defaulted to false', () => {
        const item = new TreeItem({name: 'Test Item'}, {
          level: 1,
          inset: 1,
          size: 1,
          hasChildren: true,
          expanded: false,
        });

        expect(item.expanded.value).toStrictEqual(false);
      });

      test('it can be collapsed', () => {
        const item = new TreeItem({name: 'Test Item'}, {
          level: 1,
          inset: 1,
          size: 1,
          hasChildren: true,
        });

        item.collapse();

        expect(item.expanded.value).toStrictEqual(false);
      });

      test('it can be expanded', () => {
        const item = new TreeItem({name: 'Test Item'}, {
          level: 1,
          inset: 1,
          size: 1,
          hasChildren: true,
          expanded: false,
        });

        item.expand();

        expect(item.expanded.value).toStrictEqual(true);
      });

      test('it can be toggled', () => {
        const item = new TreeItem({name: 'Test Item'}, {
          level: 1,
          inset: 1,
          size: 1,
          hasChildren: true,
        });

        expect(item.expanded.value).toStrictEqual(true);

        item.toggleExpansion();

        expect(item.expanded.value).toStrictEqual(false);

        item.toggleExpansion();

        expect(item.expanded.value).toStrictEqual(true);
      });
    });

    test.describe('when it has no children', () => {
      test('is undefined', () => {
        const item = makeItem();

        expect(item.expanded.value).toBeUndefined();
      });

      test('toggle methods make no state changes', () => {
        const item = makeItem();

        expect(item.expanded.value).toBeUndefined();

        item.expand();

        expect(item.expanded.value).toBeUndefined();

        item.collapse();

        expect(item.expanded.value).toBeUndefined();

        item.toggleExpansion();

        expect(item.expanded.value).toBeUndefined();
      });
    });
  });

  test.describe('selected state can be managed', () => {
    test('defaults to unselected state', () => {
      const item = makeItem();

      expect(item.selected.value).toStrictEqual(false);
    });

    test('can be selected using select()', () => {
      const item = makeItem();

      expect(item.selected.value).toStrictEqual(false);

      item.select();

      expect(item.selected.value).toStrictEqual(true);
    });

    test('can be deselected using deselect()', () => {
      const item = makeItem();

      expect(item.selected.value).toStrictEqual(false);

      item.select();

      expect(item.selected.value).toStrictEqual(true);

      item.deselect();

      expect(item.selected.value).toStrictEqual(false);
    });

    test('can be toggled using toggleSelection()', () => {
      const item = makeItem();

      expect(item.selected.value).toStrictEqual(false);

      item.toggleSelection();

      expect(item.selected.value).toStrictEqual(true);

      item.toggleSelection();

      expect(item.selected.value).toStrictEqual(false);
    });
  });

  test.describe('logs an error when given invalid identifiers', () => {
    let consoleErrorStub: sinon.SinonStub<[
      message?: unknown,
      ...optionalParams: Array<unknown>,
    ], void>;

    test.beforeEach(() => {
      consoleErrorStub = sinon.stub(console, 'error').callsFake((...args) => {
        throw new Error(`console.error was called with arguments: ${args.join(' ')}`);
      });
    });

    test.afterEach(() => {
      consoleErrorStub.restore();
    });

    test('starts with a number', () => {
      expect(() => {
        void makeItem('2three');
      }).toThrow();
    });

    test('has a period', () => {
      expect(() => {
        void makeItem('three.two');
      }).toThrow();
    });

    test('has a colon', () => {
      expect(() => {
        void makeItem('three:two');
      }).toThrow();
    });

    test('has a space', () => {
      expect(() => {
        void makeItem('three two');
      }).toThrow();
    });

    test('has a tab', () => {
      expect(() => {
        void makeItem('three\ttwo');
      }).toThrow();
    });
  });
});
