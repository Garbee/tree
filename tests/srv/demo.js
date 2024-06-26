
import {TreeElement} from '/assets/dist/src/tree.js';
import {directoryStructure} from '/assets/dist/data/sample-directory.js';
import {flatten} from '/assets/dist/src/functions/flatten.js';
import {ContentItem} from '/assets/dist/demo/content-item.js';
import {html} from '/assets/node_modules/lit/html.js';

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
