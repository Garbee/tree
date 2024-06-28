import {TreeItem} from '@garbee/tree/tree-item.js';

/**
 * Interface for anything that needs to be flattened.
 */
export interface CanHaveChildren<T = unknown> {
  children?: Array<T>;
}

/**
 * A helper function to take a nested set of data elements
 * and flatten them down into a single tree.
 *
 * Only provide the <b>first</b> argument when using this
 * function. The rest are for internal use only as this
 * works recursively.
 *
 *
 * @argument source {Array<SourceType>} The nested data that
 * needs to be flattened.
 *
 * @returns {Array<TreeItem<SourceType>>} An array of data
 * that has been flattened into TreeItems. These objects
 * keep track of their position within the tree along with
 * the parent, if any, they are associated with.
 */
/* eslint max-lines-per-function: ['error', {max: 40}], @typescript-eslint/max-params: ['error', {max: 4}] */
export function flatten<
  SourceType extends CanHaveChildren,
>(
  source: Array<SourceType>,
  level = 1,
  parent?: TreeItem<SourceType>,
  finalData: Array<
    TreeItem<
      Omit<SourceType, keyof CanHaveChildren>>> = [],
): Array<
    TreeItem<Omit<SourceType, keyof CanHaveChildren>>> {
  for (const data of source) {
    const item = new TreeItem<
      Omit<SourceType, keyof CanHaveChildren>>(
      data,
      {
        level,
        size: source.length,
        inset: source.indexOf(data) + 1,
        expanded: false,
        hasChildren: Boolean(data.children?.length ?? 0),
      },
      parent,
    );

    finalData.push(item);

    if (data.children) {
      flatten(
        data.children as Array<SourceType>,
        level + 1,
        item,
        finalData,
      );
    }
  }

  return finalData;
}
