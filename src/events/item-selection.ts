import type {TreeItem} from '@garbee/tree/tree-item.js';

/**
 * Fires when the item selection changes. This can be
 * since either an item was selected or deselected.
 */
class ItemSelectionEvent extends Event {
  /**
   * The currently selected items of the tree.
   */
  public selectedItems: Array<TreeItem>;

  public constructor(
    selectedItems: Array<TreeItem>,
  ) {
    super('garbee-tree-item-selection-changed', {
      bubbles: true,
      composed: true,
    });

    this.selectedItems = selectedItems;
  }
}

export {
  ItemSelectionEvent,
};

declare global {
  interface DocumentEventMap {
    'garbee-tree-item-selection-changed': ItemSelectionEvent;
  }
}
