import {
  LitElement,
  html,
  type TemplateResult,
} from 'lit';
import {
  customElement,
} from 'lit/decorators.js';

@customElement('garbee-tree')
class TreeElement extends LitElement {
  protected override render(): TemplateResult {
    return html`<p>I'll be a tree</p>`;
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
