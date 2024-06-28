import type {TreeItem} from '../item/TreeItem.js';

/**
 * The multiple data points returned from findVisibleItems.
 *
 * @internal
 */
interface FoundVisibleItems<Type = unknown> {

  /**
   * The currently visible items from the provided content.
   */
  visibleItems: Array<TreeItem<Type>>;

  /**
   * The length of the content that was filtered. This is
   * the starting length.
   */
  contentLength: number;

  /**
   * The length of the resulting array of visible items.
   * This is the final length.
   */
  visibleItemsLength: number;

  /**
   * The difference between the starting and final lengths.
   */
  difference: number;
}

/**
 * Go through the content provided and find all items that
 * are currently visible in it.
 *
 * @returns {FoundVisibleItems<Type>} Items that are
 * currently visible. Along with metadata for triage of
 * performance with larger datasets.
 *
 * @internal
 */
export function findVisibleItems<Type = unknown>(
  content: Array<TreeItem<Type>>,
): FoundVisibleItems<Type> {
  const visibleItems = [];

  for (const item of content) {
    if (item.isVisible) {
      visibleItems.push(item);
    }
  }

  return {
    visibleItems,
    contentLength: content.length,
    visibleItemsLength: visibleItems.length,
    difference: content.length - visibleItems.length,
  };
}
