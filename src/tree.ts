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

@customElement('garbee-tree')
class TreeElement<TreeItemType = unknown>
  extends signalWatcher(LitElement) {
  public static debugMode = false;

  @property({
    attribute: false,
  })
  public renderItem?: RenderItemFunction<
    TreeItem<TreeItemType>>;

  /**
   * @internal
   */
  readonly #content: Signal<
    Array<TreeItem<TreeItemType>>> = signal([]);

  /**
   * @internal
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
