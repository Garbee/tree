import type {TreeItem} from '@garbee/tree/tree-item.js';
import {
  type Signal,
  computed,
  signal,
  SignalWatcher as signalWatcher,
} from '@lit-labs/preact-signals';
import type {
  RenderItemFunction,
} from '@lit-labs/virtualizer/virtualize.js';
import {
  LitElement,
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

  /**
   * The function passed to <code>lit-virtualizer</code>
   * that is used to render each individual item.
   */
  @property({
    attribute: false,
  })
  public renderItem?: RenderItemFunction<
    TreeItem<TreeItemType>>;

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

  protected override render(): TemplateResult {
    return html`
      <lit-virtualizer
        part="virtualizer"
        scroller
        .items=${this.#visibleContent.value}
        .renderItem="${this.renderItem}"
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
