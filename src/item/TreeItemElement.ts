import {
  LitElement,
} from 'lit';
import {
  property,
} from 'lit/decorators.js';
import type {
  TreeItem,
} from './TreeItem.js';
import {
  SignalWatcher as signalWatcher,
  effect,
} from '@lit-labs/preact-signals';

/**
 * @tag abstract-tree-item
 */
abstract class TreeItemElement<DataType = unknown>
  extends signalWatcher(LitElement) {
  /**
   * @internal
   */
  #treeItem?: TreeItem<DataType>;

  /**
   * @internal
   */
  #data?: DataType;

  /**
   * @internal
   */
  #treeItemEffectDisposal:
    ReturnType<typeof effect> | undefined = undefined;

  public get data(): DataType | undefined {
    return this.#data;
  }

  public get treeItem(): TreeItem<DataType> | undefined {
    return this.#treeItem;
  }

  @property({attribute: false})
  public set treeItem(item: TreeItem<DataType>) {
    if (this.#treeItemEffectDisposal) {
      this.#treeItemEffectDisposal();
      this.#treeItemEffectDisposal = undefined;
    }

    this.#treeItem = item;
    this.#data = item.data;

    this.#treeItemEffectDisposal = effect(
      this.#treeItemEffectCallback,
    );
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'treeitem');
    }

    if (this.#treeItem !== undefined) {
      this.#treeItemEffectDisposal = effect(
        this.#treeItemEffectCallback,
      );
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.#treeItemEffectDisposal) {
      this.#treeItemEffectDisposal();
      this.#treeItemEffectDisposal = undefined;
    }
  }

  /* eslint max-statements:['error', {max: 11}] */
  /**
   * @internal
   */
  readonly #treeItemEffectCallback = (): void => {
    if (this.#treeItem === undefined) {
      return;
    }

    this.id = this.#treeItem.identifier;
    this.tabIndex = this.#treeItem.tabIndex.value;
    this.ariaSelected = this.#treeItem.selected.value ?
      'true' :
      'false';
    const expanded = this.#treeItem.expanded.value;
    if (expanded !== undefined) {
      this.ariaExpanded = expanded ?
        'true' :
        'false';
    }
    this.ariaSetSize = this.#treeItem.size.toString();
    this.ariaPosInSet = this.#treeItem.inset.toString();
    this.ariaLevel = this.#treeItem.level.toString();
  };
}

export {
  TreeItemElement,
};
