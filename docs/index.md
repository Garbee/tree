---
layout: page.11ty.js
title: <garbee-tree> ⌲ Home
---

# &lt;garbee-tree>

Trees allow a user to view and traverse a dataset that has
parent-child relationships. This can be a file directory or
family tree, for example.

This component is build to handle large datasets. It uses
virtual scrolling to ensure a minimal number of tree items
are rendered into the active DOM. Since virtual scrolling
is in use, the content rendered must be a single array of
items. Any nested content has to be flattened to be rendered.

## Example Usage

One series of steps to create a tree and view it is:

1. Import the `TreeElement` into your script for the web page.
1. Import the `flatten` helper function as well.
1. Create a new instance of TreeElement
1. Provide the function that will be used to render each individual
item to `renderItem`. This returns something that is either a string
or can be converted to a string using the `toString` method.
1. Retrieve the data that needs to be rendered.
1. Use the flatten function to convert the nested object into
a single array of items.
1. Set the `content` property on the TreeElement instance to the flattened dataset.
1. Add the TreeElement instance to the DOM.

```javascript
import {TreeElement} from '@garbee/tree/tree.js';
import {flatten} from '@garbee/tree/functions/flatten.js';

const treeElement = new TreeElement();

treeElement.renderItem((item) => {
  return item.name;
});

const externalData = []; // Pull in data from an HTTP endpoint for example

const data = flatten(externalData);

treeElement.content = data;

document.body.appendChild(treeElement);
```

## Considerations

A few key pieces of information to help provide a robust,
clean, and understandable user experience.

### Static Content

This tree component is built to provide a rendering of
**static** data only. This means it does not handle
re-ordering, adding and removing entries, or filtering them.

These capabilities, and more, may be handled externally and
a new set of content provided to the tree to render after
the update happens and the tree data is rebuilt.

### Interactivity

Remember that tree items are *interactive elements*. This
means that you should **not** put other interactive elements
inside of them. This means checkboxes, buttons, drag handles,
etc. are all elements that should not be present in a
TreeItemElement implementation.

Keep in mind as well that generic elements with click and
key handlers are also considered interactive and should not
be placed within a Tree Item.

### Maximum items

While theoretically the virtual scroll system can take in
multiple millions of entries and not crash, there are
browser limitations. Specifically there is some maximum
height of the scroll area for any given element that is
supported. This varies a little from user-agent to
user-agent. It seems to be that generally around 480k
individual lines of text in scrolling is where the limit
is reached.

Be aware of this and try to plan accordingly. The provided
tree component puts no fixed maximum limit on the content
size supported, as this rendering maximum can't be
determined statically. As each TreeItemElement
implementation will differ in height, thus changing where
the maximum viewable length is. Test and verify your
application's extremes.

## Exports

The exports for this package are all the pieces needed
to make a tree work.

* **TreeElement** - The main class that provides `<garbee-tree>`.
* **TreeItem** - The class that is used to represent each individual item for the tree content.
* **flatten** - A function to take a nested set of data and flatten it into TreeItem objects.
* **TreeItemElement** - An abstract class that extends LitElement. This is used to accelerate creating an
element that can be rendered by `TreeElement.renderItem` to display to users.
* **ItemSelectionEvent** - The event that is fired whenever selection changes within the tree.
