import {TreeItem} from '@garbee/tree/tree-item.js';

/**
 * Interface for anything that needs to be flattened.
 */
export interface CanHaveChildren<T = unknown> {
  id?: string;
  children?: Array<T>;
}

/**
 * A helper function to take a nested set of data elements
 * and flatten them down into a single tree. This requires
 * that children be in a property called `children`. It also
 * looks for existing identifiers on `id` if present to use.
 *
 * Should either of these be an issue, copy the source and
 * modify to your needs. Pull requests welcome to make this
 * function more configurable while still being type-safe.
 *
 * @argument source {Array<SourceType>} The nested data that
 * needs to be flattened.
 *
 * @returns {Array<TreeItem<SourceType>>} An array of data
 * that has been flattened into TreeItems. These objects
 * keep track of their position within the tree along with
 * the parent, if any, they are associated with.
 */
/* eslint max-lines-per-function: ['error', {max: 70}] */
export function flatten
<SourceType extends CanHaveChildren>(
  source: Array<SourceType>,
): Array<TreeItem<SourceType>> {
  interface PendingItem {
    node: SourceType;
    level: number;
    siblingCount: number;
    inset: number;
    parent?: TreeItem<SourceType>;
  }

  const result: Array<TreeItem<SourceType>> = [];
  const stack: Array<PendingItem> = [];

  for (const node of source.toReversed()) {
    stack.push({
      node,
      level: 1,
      siblingCount: source.length,
      inset: source.indexOf(node) + 1,
    });
  }

  while (stack.length > 0) {
    const {
      node,
      level,
      siblingCount,
      inset,
      parent,
    } = stack.pop()!;

    const children = node.children ?? [];

    const item = new TreeItem(
      node,
      {
        level,
        inset,
        size: siblingCount,
        expanded: false,
        hasChildren: children.length > 0,
      },
      parent,
      node.id ?? `item-${crypto.randomUUID()}`,
    );

    result.push(item);

    for (
      const child of
      children.toReversed() as Array<SourceType>
    ) {
      stack.push({
        node: child,
        parent: item,
        inset: children.indexOf(child) + 1,
        siblingCount: children.length,
        level: level + 1,
      });
    }
  }

  return result;
}
