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
import type {TreeItem} from './item/TreeItem.js';

@customElement('garbee-tree')
class TreeElement<TreeItemType = unknown>
  extends LitElement {
  @property({
    attribute: false,
  })
  public renderItem?: RenderItemFunction<
    TreeItem<TreeItemType>>;

  protected override render(): TemplateResult {
    return html`
      <lit-virtualizer
        part="virtualizer"
        scroller
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
