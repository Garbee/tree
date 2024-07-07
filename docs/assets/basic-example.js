import {TreeElement} from '@garbee/tree/tree.js';
import {directoryStructure} from '../../dist/data/sample-directory.js';
import {flatten} from '@garbee/tree/functions/flatten.js';
import {ContentItem} from '../../dist/demo/content-item.js';
import {html} from 'lit';

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
