import type {
  TreeItem,
} from '@garbee/tree/tree-item.js';
import {
  type Signal,
  computed,
  signal,
  SignalWatcher as signalWatcher,
  effect,
  batch,
} from '@lit-labs/preact-signals';
import type {
  LitVirtualizer,
  VisibilityChangedEvent,
} from '@lit-labs/virtualizer';
import type {
  RenderItemFunction,
} from '@lit-labs/virtualizer/virtualize.js';
import {
  LitElement,
  css,
  html,
  type TemplateResult,
} from 'lit';
import {
  customElement,
  property,
  query,
} from 'lit/decorators.js';
import {
  createRef,
  ref,
} from 'lit/directives/ref.js';
import {
  findVisibleItems,
} from './functions/find-visible-items.js';
import '@lit-labs/virtualizer';

/**
 * The TreeElement is what renders and manages the tree
 * itself. Roving focus of tree items as well as all
 * interaction with the elements. The individual rendering
 * is delegated to a provided <code>renderItem</code> method
 * which renders an element that extends the TreeItemElement
 * class.
 *
 * @part virtualizer - Applies styles to the
 * lit-virtualizer. Primarily used to adjust the height and
 * width of the scrollable area.
 */
@customElement('garbee-tree')
class TreeElement<TreeItemType = unknown>
  extends signalWatcher(LitElement) {
  /**
   * Determines if extra logging and performance marks
   * are enabled while operating.
   */
  public static debugMode = false;

  public static override styles = css`
    :host {
      display: block;
      overflow: auto;
    }
  `;

  /**
   * The function passed to <code>lit-virtualizer</code>
   * that is used to render each individual item.
   */
  @property({
    attribute: false,
  })
  public renderItem!: RenderItemFunction<TreeItem<
    TreeItemType>>;

  public get content(): Array<TreeItem<TreeItemType>> {
    return this.#content.value;
  }

  /**
   * Provide the data that the tree represents. Setting this
   * will override any currently set data. It is a
   * replace operation, not append.
   */
  @property({attribute: false})
  public set content(data: Array<TreeItem<TreeItemType>>) {
    this.#content.value = [...data];
  }

  @query('[role="treeitem"][tabindex]:not([tabindex="-1"])')
  public currentFocusableItemNode!: HTMLElement | null;

  /**
   * Internal state to determine if a click event is being
   * processed still.
   */
  #isHandlingClick = false;

  /**
   * Internal state to determine if a keydown event is being
   * processed still.
   */
  #isHandlingKeydown = false;

  /**
   * The current start and end index of visible items
   * rendered in view for a user.
   *
   * @internal
   */
  readonly #visibleRange = signal({
    first: 0,
    last: 0,
  });

  /**
   * The total available content that could be rendered.
   */
  readonly #content: Signal<
    Array<TreeItem<TreeItemType>>> = signal([]);

  /**
   * Store a reference to the virtualizer node so it's API
   * can be accessed.
   */
  readonly #virtualizerRef = createRef
  <LitVirtualizer<TreeItem<TreeItemType>>>();

  /**
   * The subset of #content that is currently visible to
   * the user. All root items are always visible. Then any
   * children of parents that are expanded are visible.
   */
  readonly #visibleContent = computed(() => {
    const start = 'TreeElement: Calculating visible content';
    const end = 'TreeElement: Calculated visible content';
    const measureName = 'TreeElement: Visible content calculation';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    const {
      visibleItems,
      contentLength,
      visibleItemsLength,
      difference,
    } = findVisibleItems<TreeItemType>(this.#content.value);

    if (TreeElement.debugMode) {
      performance.mark(end);

      performance.measure(
        measureName,
        {
          detail: {
            contentLength,
            visibleItemsLength,
            difference,
          },
          start,
          end,
        },
      );
    }

    return visibleItems;
  });

  /**
   * The items currently being rendered that are visible by
   * the virtualized scroll system.
   */
  readonly #visibleItems = computed(() => {
    const start = 'TreeElement: Calculating rendered items';
    const end = 'TreeElement: Calculated rendered items';
    const measureName = 'TreeElement: Rendered items calculation';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    const {first, last} = this.#visibleRange.value;
    const visibleContent = this.#visibleContent.value;
    const visibleItems = visibleContent.slice(
      first,
      last + 1,
    );

    if (TreeElement.debugMode) {
      const visibleContentLength = visibleContent.length;
      const visibleItemsLength = visibleItems.length;
      const difference = visibleContentLength -
        visibleItemsLength;
      performance.mark(end);
      performance.measure(
        measureName,
        {
          detail: {
            visibleContentLength,
            visibleItemsLength,
            difference,
          },
          start,
          end,
        },
      );
    }

    return visibleItems;
  });

  readonly #currentFocusableItem = computed(() => {
    const start = 'TreeElement: Calculating current focusable item';
    const end = 'TreeElement: Calculated current focusable item';
    const measureName = 'TreeElement: Current focusable item calculation';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    const visibleContent = this.#visibleContent.value;
    const current = visibleContent.find((item) => {
      return item.tabIndex.value === 0;
    });

    if (TreeElement.debugMode) {
      performance.mark(end);
      performance.measure(
        measureName,
        {
          detail: {
            visibleContentLength: visibleContent.length,
            currentId: current?.identifier,
          },
          start,
          end,
        },
      );
    }

    return current;
  });

  /**
   * Determine the previous item to the currently focusable
   * item.
   */
  readonly #previousItem = computed(() => {
    const start = 'TreeElement: Calculating previous item of current focusable item';
    const end = 'TreeElement: Calculated previous item of current focusable item';
    const measureName = 'TreeElement: Previous item of current focusable item calculation';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    let current: TreeItem<TreeItemType> | undefined;
    let previousItem: TreeItem<TreeItemType> | undefined;

    try {
      current = this.#currentFocusableItem.value;

      if (current === undefined) {
        return undefined;
      }

      const visibleContent = this.#visibleContent.value;
      const currentIndex = visibleContent.indexOf(current);
      previousItem = visibleContent[currentIndex - 1];

      return previousItem;
    } finally {
      if (TreeElement.debugMode) {
        performance.mark(end);
        performance.measure(
          measureName,
          {
            detail: {
              currentId: current?.identifier,
              previousItemId: previousItem?.identifier,
            },
            start,
            end,
          },
        );
      }
    }
  });

  /**
   * Determine the next item to the current focusable item.
   */
  readonly #nextItem = computed(() => {
    const start = 'TreeElement: Calculating next item of current focusable item';
    const end = 'TreeElement: Calculated next item of current focusable item';
    const measureName = 'TreeElement: Next item of current focusable item calculation';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    try {
      const current = this.#currentFocusableItem.value;

      if (current === undefined) {
        return undefined;
      }

      const currentIndex = this.#visibleContent
        .value
        .indexOf(current);
      return this.#visibleContent
        .value
        .at(currentIndex + 1);
    } finally {
      if (TreeElement.debugMode) {
        performance.mark(end);
        performance.measure(
          measureName,
          {
            start,
            end,
          },
        );
      }
    }
  });

  /**
   * Find the first child
   */
  readonly #firstChildOfFocusableItem = computed(
    () => {
      const start = 'TreeElement: Calculating first child of current focusable item';
      const end = 'TreeElement: Calculated first child of current focusable item';
      const measureName = 'TreeElement: First child of current focusable item calculation';

      if (TreeElement.debugMode) {
        performance.mark(start);
      }

      const content = this.#content.value;
      const currentItem = this.#currentFocusableItem.value;
      let item: TreeItem<TreeItemType> | undefined;

      try {
        if (currentItem?.hasChildren === false) {
          return;
        }

        item = content.find((contentItem) => {
          return contentItem.parent?.identifier ===
          currentItem?.identifier;
        });

        return item;
      } finally {
        if (TreeElement.debugMode) {
          performance.mark(end);
          performance.measure(
            measureName,
            {
              detail: {
                contentLength: content.length,
                currentId: currentItem?.identifier,
                firstChildId: item?.identifier,
              },
              start,
              end,
            },
          );
        }
      }
    },
  );

  readonly #visibilityChanged = (
    event: VisibilityChangedEvent,
  ): void => {
    const {first, last} = event;

    this.#visibleRange.value = {
      first,
      last,
    };
  };

  readonly #ensureTreeItemIsFocusable = effect(() => {
    const visibleItems = this.#visibleItems.value;

    if (
      this.#isHandlingClick ||
      this.#isHandlingKeydown
    ) {
      return;
    }

    if (visibleItems.find((item) => {
      return item.tabIndex.value === 0;
    })) {
      return;
    }

    this.#roveFocusTo(
      visibleItems.at(0)?.identifier,
    );
  });

  /**
   * Handle click events from tree items.
   */
  readonly #clickHandler = (
    event: MouseEvent,
  ): void => {
    this.#isHandlingClick = true;
    const start = 'TreeElement: Handling click event';
    const end = 'TreeElement: Handled click event';
    const measureName = 'TreeElement: Click event handle';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    const {target} = event;

    const {id} = target as HTMLElement;

    this.#roveFocusTo(id);
    this.#selectItem(id);
    this.#toggleExpansion(id);
    this.#isHandlingClick = false;

    if (TreeElement.debugMode) {
      performance.mark(end);
      performance.measure(
        measureName,
        {
          detail: {},
          start,
          end,
        },
      );
    }
  };

  readonly #keyDownHandler = async(
    event: KeyboardEvent,
  ): Promise<void> => {
    if (this.#isHandlingKeydown) {
      return;
    }

    this.#isHandlingKeydown = true;

    const start = 'TreeElement: Handling keydown event';
    const end = 'TreeElement: Handled keydown event';
    const measureName = 'TreeElement: Keydown event handle';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    const {target} = event;

    const {id} = target as HTMLElement;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.#selectItem(id);
        break;
      case 'ArrowUp':
        event.preventDefault();
        await this.#moveFocusToPreviousNode();
        break;
      case 'ArrowDown':
        event.preventDefault();
        await this.#moveFocusToNextNode();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        break;
      case 'ArrowRight':
        event.preventDefault();
        await this.#handleArrowRight();
        break;
      case 'Home':
        event.preventDefault();
        await this.#moveFocusToStart();
        break;
      case 'End':
        event.preventDefault();
        await this.#moveFocusToEnd();
        break;
      case '*':
        event.preventDefault();
        this.#expandSiblingsOfFocused();
        break;
      default:
        break;
    }

    this.#isHandlingKeydown = false;

    if (TreeElement.debugMode) {
      performance.mark(end);
      performance.measure(
        measureName,
        {
          start,
          end,
        },
      );
    }
  };

  private constructor() {
    super();
  }

  /**
   * Move focus from the current item in the DOM to the
   * target item.
   */
  #roveFocusTo(identifier?: string): void {
    const start = 'TreeElement: Roving focus';
    const end = 'TreeElement: Roved focus';
    const measureName = 'TreeElement: Focus rove';

    if (TreeElement.debugMode) {
      performance.mark(start);
    }

    const visibleContent = this.#visibleContent.value;
    const currentItem = this.#currentFocusableItem.value;

    if (identifier === undefined) {
      return;
    }

    const item = visibleContent.find((visibleItem) => {
      return visibleItem.identifier === identifier;
    });

    if (!item) {
      return;
    }

    batch(() => {
      if (currentItem) {
        currentItem.disableFocus();
      }

      item.enableFocus();
    });

    if (TreeElement.debugMode) {
      performance.mark(end);
      performance.measure(
        measureName,
        {
          detail: {
            visibleContentLength: visibleContent.length,
          },
          start,
          end,
        },
      );
    }
  }

  /**
   * Moves focus to first node without opening or closing a node.
   */
  async #moveFocusToStart(): Promise<void> {
    const first = this.#visibleContent
      .value
      .at(0)!;

    this.#roveFocusTo(first.identifier);

    await this.updateComplete;

    this.#virtualizerRef.value?.scrollToIndex(
      this.#visibleContent.value.indexOf(first),
      'nearest',
    );

    this.currentFocusableItemNode?.focus();
  }

  /**
   * Moves focus to the last node that can be focused
   * without expanding any nodes that are closed.
   */
  async #moveFocusToEnd(): Promise<void> {
    const last = this.#visibleContent
      .value
      .at(-1)!;

    this.#roveFocusTo(last.identifier);
    await this.updateComplete;

    this.#virtualizerRef.value?.scrollToIndex(
      this.#visibleContent.value.indexOf(last),
      'nearest',
    );

    this.currentFocusableItemNode?.focus();
  }

  /**
   * Expands all closed sibling nodes that are at the same
   * level as the focused node. Focus does not move.
   */
  #expandSiblingsOfFocused(): void {
    const current = this.#currentFocusableItem.value;

    if (!current) {
      return;
    }

    for (const item of this.#visibleContent.value) {
      if (item.level !== current.level) {
        continue;
      }

      item.expand();
    }
  }

  /**
   * Moves focus to the previous node that is focusable
   * without opening or closing a node. If focus is on first
   * node, do nothing
   */
  async #moveFocusToPreviousNode(): Promise<void> {
    const previousItem = this.#previousItem.value;

    if (!previousItem) {
      return;
    }

    this.#roveFocusTo(previousItem.identifier);

    await this.updateComplete;

    this.currentFocusableItemNode?.focus();
  }

  /**
   * Moves focus to the next node that is focusable
   * without opening or closing a node. If focus is on last
   * node, do nothing
   */
  async #moveFocusToNextNode(): Promise<void> {
    const nextItem = this.#nextItem.value;

    if (!nextItem) {
      return;
    }

    this.#roveFocusTo(nextItem.identifier);

    await this.updateComplete;

    this.currentFocusableItemNode?.focus();
  }

  /**
   * When focus is on a closed node, opens the node; focus does not move.
   * When focus is on a open node, moves focus to the first child node.
   * When focus is on an end node, does nothing.
   */
  async #handleArrowRight(): Promise<void> {
    const current = this.#currentFocusableItem.value;

    if (!current) {
      return;
    }

    if (current.expanded.value === undefined) {
      return;
    }

    if (!current.expanded.value) {
      current.expand();
      return;
    }

    const first = this.#firstChildOfFocusableItem
      .value;

    if (first === undefined) {
      return;
    }

    current.disableFocus();
    first.enableFocus();

    await this.updateComplete;

    this.#virtualizerRef.value?.scrollToIndex(
      this.#visibleContent.value.indexOf(first),
      'nearest',
    );

    this.currentFocusableItemNode?.focus();
  }

  /**
   * Toggle the expansion state of the specified tree item
   * by it's identifier.
   */
  #toggleExpansion(id: string): void {
    const item = this.#content.value.find((contentItem) => {
      return contentItem.identifier === id;
    });

    if (!item) {
      return;
    }

    item.toggleExpansion();
  }

  /**
   * Toggle the selection of the tree item by it's
   * identifier. Remove previous selection if it is different
   * than the current target item.
   */
  #selectItem(id: string): void {
    const item = this.#content.value.find((contentItem) => {
      return contentItem.identifier === id;
    });

    if (!item) {
      return;
    }

    batch(() => {
      const currentItem = this.#content
        .value
        .find((contentItem) => {
          return contentItem.selected.value;
        });

      if (item.identifier !== currentItem?.identifier) {
        currentItem?.deselect();
      }

      item.toggleSelection();
    });
  }

  protected override render(): TemplateResult {
    return html`
      <lit-virtualizer
      ${ref(this.#virtualizerRef)}
        scroller
        .items=${this.#visibleContent.value}
        .renderItem="${this.renderItem}"
        @visibilityChanged="${this.#visibilityChanged}"
        @click="${this.#clickHandler}"
        @keydown="${this.#keyDownHandler}"
        part="virtualizer"
        role="tree"
        aria-multiselectable="false"
      ></lit-virtualizer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'garbee-tree': TreeElement;
  }
}

export {
  TreeElement,
};
