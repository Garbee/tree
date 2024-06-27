import type {TreeItem} from '@garbee/tree/tree-item.js';

class ItemSelectionEvent extends Event {
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
