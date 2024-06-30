---
layout: page.11ty.js
title: <garbee-tree> ⌲ Developer Experience
---

# Developer Experience

## Virtual Scrolling

The tree utilizes a virtual scrolling system. This enables
trees with hundreds of thousands of entries to be provided
to users. This reduces your burden to worry about large
sets of data and optimizing the rendering performance.

## Debug Mode

To assist during triage of issues, a debug mode is made
available. This is an opt-in configuration that will use the
[Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
to mark and measure runtime perf of key areas. This way the
effects and computation of the tree can be analyzed against
the app itself in the Performance Panel of DevTools.

Extra console logs may also be used in the future via
debug mode to highlight potential issues in development.

This is enabled by a static property on `TreeElement`. Since
this is static it applies to all trees globally that are
being rendered.

```javascript
import {TreeElement} from '@garbee/tree/tree.js';

TreeElement.debugMode = true;
```
