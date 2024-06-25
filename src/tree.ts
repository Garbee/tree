/* eslint-disable max-lines */
import type {TreeItem} from '@garbee/tree/tree-item.js';
import {
  type Signal,
  computed,
  signal,
  SignalWatcher as signalWatcher,
  effect,
  batch,
} from '@lit-labs/preact-signals';
import type {
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
} from 'lit/decorators.js';
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
  public renderItem?: RenderItemFunction<
    TreeItem<TreeItemType>>;

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

    const content = this.#content.value;
    const visibleItems = content.filter((item) => {
      return item.isVisible;
    });

    if (TreeElement.debugMode) {
      performance.mark(end);

      const contentLength = content.length;
      const visibleItemsLength = visibleItems.length;
      const difference = contentLength - visibleItemsLength;

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

    if (visibleItems.find((item) => {
      return item.tabIndex.value === 0;
    })) {
      return;
    }

    this.#roveFocusTo(
      visibleItems.at(0)?.identifier,
    );
  });

  private constructor() {
    super();
  }

  /**
   * Move focus from the current item in the DOM to the
   * target item.
   */
  /* eslint max-lines-per-function: ['error', {max: 50}] */
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

  protected override render(): TemplateResult {
    return html`
      <lit-virtualizer
        part="virtualizer"
        .items=${this.#visibleContent.value}
        .renderItem="${this.renderItem}"
        @visibilityChanged="${this.#visibilityChanged}"
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
