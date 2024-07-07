---
layout: example.11ty.js
title: <garbee-tree> ⌲ Examples ⌲ Basic
tags: example
name: Basic
description: A basic example
---

<garbee-tree>
</garbee-tree>

<script type="module" src="/assets/basic-example.js"></script>


<h3>HTML</h3>

```html
<garbee-tree>
</garbee-tree>
```

<h3>JavaScript</h3>

```javascript
  const {TreeElement} = await import('/dist/src/tree.js');
  const {directoryStructure} = await import('/dist/data/sample-directory.js');
  const {flatten} = await import('/dist/src/functions/flatten.js');
  const {ContentItem} = await import('/dist/demo/content-item.js');
  const {html} = await import('/node_modules/lit/html.js');
  const treeNode = document.querySelector('garbee-tree');

  TreeElement.debugMode = true;

  treeNode.renderItem = (data) => {
    return html`
      <demo-content-item
        .treeItem="${data}"
      ></demo-content-item>
    `;
  };

  treeNode.content = flatten(directoryStructure);
```
