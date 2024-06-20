import {
  css,
  html,
  type TemplateResult,
} from "lit";
import {
  customElement,
} from "lit/decorators.js";
import type {
  CanHaveChildren,
} from "../src/functions/flatten.js";
import { TreeItemElement } from "../src/item/TreeItemElement.js";

interface Content extends CanHaveChildren<Content> {
  type: 'file' | 'directory';
  name: string;
}

@customElement('demo-content-item')
class ContentItem extends TreeItemElement<Content> {
  static override styles = css`
    :host {
      --indentation-per-level: 10px;
      --indentation-level: 1;
      --base-color: oklch(89.93% 0.016 262.75);
      display: block;
      height: 25px;
    }

    :host([aria-expanded]) span::before{
      content: ' ';
      display: inline-block;
      border-block-start: 5px solid transparent;
      border-block-end: 5px solid transparent;
      border-inline-start: 5px solid currentColor;
      vertical-align: middle;
      margin-inline-end: .7rem;
      transition: transform .2s ease-out;
    }

    :host([aria-expanded="false"]) span::before {
        transform: translateY(-2px);
    }

    :host([aria-expanded="true"]) span::before {
      transform: rotate(90deg) translateX(-3px);
    }

    :host([aria-level="2"]) {
      --indentation-level: 2;
    }

    :host([aria-level="3"]) {
      --indentation-level: 3;
    }

    :host([aria-level="4"]) {
      --indentation-level: 4;
    }

    :host([aria-level="5"]) {
      --indentation-level: 5;
    }

    :host([aria-level="6"]) {
      --indentation-level: 6;
    }

    span {
      margin-inline-start: calc(var(--indentation-per-level) * var(--indentation-level));
      background-color: var(--base-color);
    }

    :host(:focus) span,
    :host(:hover) span {
      background-color: color-mix(in oklch, var(--base-color) 40%, transparent);
    }

    :host([aria-selected="true"]) span {
      background-color: oklch(76.83% 0.075 131.06);
    }
  `;

  protected override render(): TemplateResult {
      return html`
        <span>${this.data?.name}</span>
      `;
  }
}

export {
  ContentItem,
  type Content,
};
