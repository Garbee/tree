import type {
  TreeItem,
} from '@garbee/tree/tree-item.js';
import {
  LitElement,
} from 'lit';
import {
  property,
} from 'lit/decorators.js';
import {
  SignalWatcher as signalWatcher,
  effect,
} from '@lit-labs/preact-signals';

/**
 * An abstract element class that represents an individual
 * item within the tree. This is the class developers
 * should extend in order to create an element to show
 * the item to a user.
 *
 * This maintains all needed exposure to assistive
 * technology as the TreeItem's signals change.
 */
abstract class TreeItemElement<DataType = unknown>
  extends signalWatcher(LitElement) {
  /**
   * The provided tree item that is represented by the
   * element.
   */
  #treeItem?: TreeItem<DataType>;

  /**
   * The effect disposal function from observing signal
   * changes. Used to clean up listening when the element
   * is removed from the DOM.
   */
  #treeItemEffectDisposal:
    ReturnType<typeof effect> | undefined = undefined;

  /**
   * The internals of the element for setting base aria
   * requirements.
   */
  protected internals: ElementInternals =
    this.attachInternals();

  /**
   * Retrieve the data that this tree item represents.
   */
  public get data(): DataType | undefined {
    return this.#treeItem?.data;
  }

  public get treeItem(): TreeItem<DataType> | undefined {
    return this.#treeItem;
  }

  /**
   * The TreeItem that this element represents when
   * rendered.
   */
  @property({attribute: false})
  public set treeItem(item: TreeItem<DataType>) {
    if (this.#treeItemEffectDisposal) {
      this.#treeItemEffectDisposal();
      this.#treeItemEffectDisposal = undefined;
    }

    this.#treeItem = item;

    this.#treeItemEffectDisposal = effect(
      this.#treeItemEffectCallback,
    );
  }

  public constructor() {
    super();

    /**
     * @internal
     */
    this.internals.role = 'treeitem';
  }

  public override connectedCallback(): void {
    super.connectedCallback();

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

  /**
   * The callback used to listen to signal changes to
   * the TreeItem content. This updates the element
   * with the current state of the signal data.
   */
  /* eslint max-statements:['error', {max: 11}] */
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
