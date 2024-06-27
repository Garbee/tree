import {
  computed,
  signal,
  type Signal,
} from '@lit-labs/preact-signals';

const isValidHtmlId = function(
  identifier: string,
): boolean {
  const idRegex = /^[a-zA-Z][\w\-_]*$/u;
  return idRegex.test(identifier);
};

interface TreeItemMetadata {
  level: number;
  size: number;
  inset: number;
  hasChildren: boolean;
  expanded?: boolean;
}

class TreeItem<DataType = unknown> {
  public readonly data: DataType;

  public readonly parent?: TreeItem<DataType>;

  /**
   * Determine the current tabindex of the tree item.
   * This is used to apply roving focus so large trees
   * don't interrupt a user's ability to navigate the full
   * application.
   */
  public readonly tabIndex: Signal<-1 | 0> = signal(-1);

  /**
   * Determine if the item is currently the selected entry.
   */
  public readonly selected: Signal<boolean> = signal(false);

  /**
   * Determine the current state of expansion. This returns
   * undefined when there are no children therefore
   * expansion has no meaning.
   */
  public expanded: Signal<boolean | undefined> = computed(
    () => {
      if (!this.#hasChildren) {
        return undefined;
      }

      return this.#expanded.value;
    },
  );

  readonly #hasChildren: boolean = false;

  readonly #identifier: string;

  readonly #level: number;

  readonly #size: number;

  readonly #inset: number;

  readonly #expanded: Signal<boolean> = signal(true);

  /* eslint @typescript-eslint/max-params: ["error", {max: 4}], max-lines-per-function: ['error', {max: 45}], max-statements: ['error', {max: 20}], complexity: ['error', {max: 11}] */
  public constructor(
    data: DataType,
    treeContent: TreeItemMetadata,
    parent: undefined | TreeItem<DataType> = undefined,
    identifier = `item-${crypto.randomUUID()}`,
  ) {
    this.data = data;
    this.#level = treeContent.level;
    this.#size = treeContent.size;
    this.#inset = treeContent.inset;
    this.#identifier = identifier;
    this.#hasChildren = treeContent.hasChildren;
    if (parent) {
      this.parent = parent;
    }

    if (
      treeContent.expanded !== undefined &&
      typeof treeContent.expanded === 'boolean'
    ) {
      this.#expanded.value = treeContent.expanded;
    }

    if (!isValidHtmlId(this.#identifier)) {
      console.error(
        'A potentially invalid identifier has been provided for a tree item.',
        'Identifiers must be a valid HTML id attribute value.',
        `The provided value is: ${this.#identifier}`,
      );
    }

    if (this.#level < 1) {
      console.error('A tree\'s level count starts at 1.');
    }
    if (this.#size < 1) {
      console.error('A tree item\'s size starts counting at 1.');
    }
    if (this.#inset > this.#size) {
      console.error('A tree item\'s inset must be less than or equal to the size.');
    }
    if (this.#inset < 1) {
      console.error('A tree item\'s inset must be 1 or higher.');
    }
  }

  /**
   * Determine if the item is currently visible.
   * All root items are always visible.
   * Any children look up the parent chain and if any are
   * not expanded, it is hidden.
   */
  public get isVisible(): boolean {
    let {parent} = this;

    while (parent) {
      if (parent.expanded.value === false) {
        return false;
      }

      ({parent} = parent);
    }

    return true;
  }

  public get hasChildren(): boolean {
    return this.#hasChildren;
  }

  public get identifier(): string {
    return this.#identifier;
  }

  /**
   * Defines the position of the current item in its branch.
   * Counting is one-based.
   */
  public get inset(): number {
    return this.#inset;
  }

  /**
   * Defines the total number of items in the same branch
   * of the tree.
   */
  public get size(): number {
    return this.#size;
  }

  /**
   * The level of the tree item in the hierarchical tree
   * structure.
   * Counting starts at 1 which are the items at the root of
   * the tree.
   */
  public get level(): number {
    return this.#level;
  }

  /**
   * Make this tree item focusable with navigation keys.
   */
  public enableFocus(): void {
    this.tabIndex.value = 0;
  }

  /**
   * Remove this tree item from focusing with navigation
   * keys.
   */
  public disableFocus(): void {
    this.tabIndex.value = -1;
  }

  /**
   * If the item has children, show them. Otherwise, do
   * nothing.
   */
  public expand(): void {
    if (!this.#hasChildren) {
      return;
    }

    this.#expanded.value = true;
  }

  /**
   * If the item has children, hide them. Otherwise, do
   * nothing.
   */
  public collapse(): void {
    if (!this.#hasChildren) {
      return;
    }

    this.#expanded.value = false;
  }

  public toggleExpansion(): void {
    if (!this.#hasChildren) {
      return;
    }

    this.#expanded.value = !this.#expanded.value;
  }

  /**
   * Make this tree item a currently selected one.
   */
  public select(): void {
    this.selected.value = true;
  }

  /**
   * Remove selection of the item from the tree.
   */
  public deselect(): void {
    this.selected.value = false;
  }

  /**
   * Select the item if it is currently not, or deselect it
   * if it is currently selected.
   */
  public toggleSelection(): void {
    this.selected.value = !this.selected.value;
  }
}

export {
  TreeItem,
  type TreeItemMetadata,
};
