---
layout: page.11ty.js
title: <garbee-tree> ⌲ Home
---

# &lt;garbee-tree>

`<garbee-tree>` is an awesome element. It's a great introduction to building web components with LitElement, with nice documentation site as well.

## As easy as HTML

<section class="columns">
  <div>

`<garbee-tree>` is just an HTML element. You can it anywhere you can use HTML!

```html
<garbee-tree></garbee-tree>
```

  </div>
  <div>

<garbee-tree></garbee-tree>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

`<garbee-tree>` can be configured with attributed in plain HTML.

```html
<garbee-tree name="HTML"></garbee-tree>
```

  </div>
  <div>

<garbee-tree name="HTML"></garbee-tree>

  </div>
</section>

## Declarative rendering

<section class="columns">
  <div>

`<garbee-tree>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const name = 'lit-html';

render(
  html`
    <h2>This is a &lt;garbee-tree&gt;</h2>
    <garbee-tree .name=${name}></garbee-tree>
  `,
  document.body
);
```

  </div>
  <div>

<h2>This is a &lt;garbee-tree&gt;</h2>
<garbee-tree name="lit-html"></garbee-tree>

  </div>
</section>
