const {TreeElement} = await import('@garbee/tree/tree.js');
const {directoryStructure} = await import('../../dist/data/sample-directory.js');
const {flatten} = await import('@garbee/tree/functions/flatten.js');
const {ContentItem} = await import('../../dist/demo/content-item.js');
const {html} = await import('lit');
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
