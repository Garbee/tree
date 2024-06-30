---
layout: page.11ty.js
title: <garbee-tree> ⌲ Accessibility
---

# Accessibility

This component has been designed to implement the
[Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)
from the Web Accessibility Initiative group of the W3C.
Not all features may be implemented. It is a work-in-progress
to be as inclusive of their guidance as possible to provide
the most options to usage.

> **Note** From here on in there might be a lot of repeated
> content from the authoring practices guide. This page
> exists to specify exactly what has been implemented along
> with any configuration options to access them. As well as
> any potentially divergences and why.

## Terminology

> **Note**: Directly copied from the Aria Authoring Practices.
> Provided here purely for convenience and in-context understanding.

<dl>
  <dt>Node</dt>
  <dd>An item in a tree.</dd>
  <dt>Root Node</dt>
  <dd>Node at the base of the tree; it may have one or more child nodes but does not have a parent node.</dd>
  <dt>Child Node</dt>
  <dd>Node that has a parent; any node that is not a root node is a child node.</dd>
  <dt>End Node</dt>
  <dd>Node that does not have any child nodes; an end node may be either a root node or a child node.</dd>
  <dt>Parent Node</dt>
  <dd>
    Node with one or more child nodes.
    It can be open (expanded) or closed (collapsed).
  </dd>
  <dt>Open Node</dt>
  <dd>Parent node that is expanded so its child nodes are visible.</dd>
  <dt>Closed Node</dt>
  <dd>Parent node that is collapsed so the child nodes are not visible.</dd>
</dl>

## Roles and States

* `<garbee-tree>` instances
    * Have a role of `tree`
    * `aria-multiselectable="true"` enables multiple selection.
    * `aria-label` or `aria-labelledby` must be provided by consumers.
    * Horizontal orientation is NOT supported.
* `TreeItemElement` instances
    * Have a role of `treeitem`.
    * Set `aria-expanded` only if they have children.
    * `aria-selected` is defined with the current selection state.
    * `aria-checked` is not used, defer to selected.
    * `aria-level`, `aria-setsize`, and `aria-posinset` are defined
    to support virtual scrolling to keep information relayed to
    screen readers.
* `group` role is not used since virtual scrolling is in
use. This prevents nested content from being used. Therefore,
this has no use in the tree.

Selection following focus is explicitly not implemented.
This may be an opt-in feature added later.

## Keyboard

The current key setup is the same regardless of single or
multi-select. This will be updated to align more to the
additional combo setup for multiselectable trees before
1.0 is released.

<dl>
  <dt><kbd>Enter</kbd></dt>
  <dt><kbd>Space</kbd></dt>
  <dd>
    Performs the default action. Which is to toggle
    selection of the node.
  </dd>
  <dt><kbd>Down Arrow</kbd></dt>
  <dd>
    <ul>
      <li>Moves focus to next node without changing any
      open state</li>
      <li>If on last possible node, does nothing</li>
    </ul>
  </dd>
  <dt><kbd>Up Arrow</kbd></dt>
  <dd>
    <ul>
      <li>Moves focus to previous node without changing any
      open state</li>
      <li>If on first possible node, does nothing</li>
    </ul>
  </dd>
  <dt><kbd>Right Arrow</kbd></dt>
  <dd>
    <ul>
      <li>When focus is on a closed node, opens the node;
      focus does not move.</li>
      <li>When focus is on a open node, moves focus to the
      first child node.</li>
      <li>
        When focus is on an end node, does nothing.
      </li>
    </ul>
  </dd>
  <dt><kbd>Left Arrow</kbd></dt>
  <dd>
    <ul>
      <li>When focus is on an open node, closes the node.
      </li>
      <li>When focus is on a child node that is also either
      an end node or a closed node, moves focus to its
      parent node.</li>
      <li>When focus is on a root node that is also either
      an end node or a closed node, does nothing.</li>
    </ul>
  </dd>
  <dt><kbd>Home</kbd></dt>
  <dd>Moves focus to first node without opening or closing
  a node.</dd>
  <dt><kbd>End</kbd></dt>
  <dd>Moves focus to the last node that can be focused
  without expanding any nodes that are closed.</dd>
  <dt><kbd>* (asterisk)</kbd></dt>
  <dd>
    <ul>
      <li>Expands all closed sibling nodes that are at the
      same level as the focused node.</li>
      <li>Focus does not move.</li>
    </ul>
  </dd>
</dl>

## Mouse

Mouse interaction varies based on whether the tree is in
multi-select or single-select mode.

## Single select

Left click will select an unselected node and deselect the
other selected element at the same time. If the clicked
item is selected, it is deselected.

Left click when on a parent node, will toggle the expansion
state. Opening a closed node and closing an opened node.

## Multiple select

Left click will continue to toggle expansion state on any
parent nodes.

Left click will toggle the selection state of the target
node. Without impacting other node's state.
