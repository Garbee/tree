import type {TreeItem} from '../item/TreeItem.js';

interface FoundVisibleItems<Type = unknown> {
  visibleItems: Array<TreeItem<Type>>;
  contentLength: number;
  visibleItemsLength: number;
  difference: number;
}

const checkItemVisibility = function(
  item: TreeItem,
): boolean {
  return item.isVisible;
};

const findVisibleItems = function<Type = unknown>(
  content: Array<TreeItem<Type>>,
): FoundVisibleItems {
  const visibleItems = content.filter(checkItemVisibility);

  return {
    visibleItems,
    contentLength: content.length,
    visibleItemsLength: visibleItems.length,
    difference: content.length - visibleItems.length,
  };
};

export {
  findVisibleItems,
  type FoundVisibleItems,
};
