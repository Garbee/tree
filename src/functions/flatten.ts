import {TreeItem} from '../item/TreeItem.js';

interface CanHaveChildren<T = unknown> {
  children?: Array<T>;
}

/* eslint max-lines-per-function: ['error', {max: 40}], @typescript-eslint/max-params: ['error', {max: 4}] */
const flatten = function flatten<
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
};

export {
  flatten,
  type CanHaveChildren,
};
