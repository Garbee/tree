/**
 * This page generates its content from the custom-element.json file as read by
 * the _data/api.11tydata.js script.
 */
export default class Docs {
  data() {
    return {
      layout: 'page.11ty.js',
      title: '<my-element> ⌲ Docs',
    };
  }

  render(data) {
    const manifest = data.api.customElements;
    const elements = manifest.modules.reduce(
      (els, module) =>
        els.concat(
          module.declarations?.filter((dec) => dec.customElement) ?? []
        ),
      []
    );
    const events = manifest.modules.reduce(
      (els, module) =>
        els.concat(
          module.declarations?.filter((dec) => dec.superclass?.name === 'Event') ?? []
        ),
      []
    );
    return `
    <h1>API</h1>
    <h2>Elements</h2>
    ${elements
      .map(
        (element) => `
      <h3>${element.name}</h3>
      <div>
        &lt;${element.tagName}>
      </div>
      <p>
        ${element.description}
      </p>
      ${renderTable(
        'Attributes',
        ['name', 'description', 'type.text', 'default'],
        element.attributes
      )}
      ${renderTable(
        'Static Properties',
        ['name', 'attribute', 'description', 'type.text', 'default'],
        element.members.filter((m) => m.kind === 'field' && m.privacy !== 'private' && m.static === true)
      )}
      ${renderTable(
        'Properties',
        ['name', 'attribute', 'description', 'type.text', 'default'],
        element.members.filter((m) => m.kind === 'field' && m.privacy !== 'private' && m.static !== true)
      )}
      ${renderTable(
        'Methods',
        ['name', 'parameters', 'description', 'return.type.text'],
        element.members
          .filter((m) => m.kind === 'method' && m.privacy !== 'private')
          .map((m) => ({
            ...m,
            parameters: renderTable(
              '',
              ['name', 'description', 'type.text'],
              m.parameters
            ),
          }))
      )}
      ${renderTable('Events', ['name', 'description'], element.events)}
      ${renderTable(
        'Slots',
        [['name', '(default)'], 'description'],
        element.slots
      )}
      ${renderTable(
        'CSS Shadow Parts',
        ['name', 'description'],
        element.cssParts
      )}
      ${renderTable(
        'CSS Custom Properties',
        ['name', 'description'],
        element.cssProperties
      )}
      `
      )
      .join('')}
    <h2>Events</h2>
    ${events.map((event) => {
      return `
      <h3>${event.name}</h3>
      <p>${event.description}</p>
      ${renderTable(
        'Properties',
        ['name', 'description', 'type.text'],
        event.members.filter((m) => m.kind === 'field' && m.privacy !== 'private' && m.static !== true),
      )}
      `;
    }).join('')}
  `;
  }
};

/**
 * Reads a (possibly deep) path off of an object.
 */
const get = (obj, path) => {
  let fallback = '';
  if (Array.isArray(path)) {
    [path, fallback] = path;
  }
  const parts = path.split('.');
  while (obj && parts.length) {
    obj = obj[parts.shift()];
  }

  if (path === 'type.text') {
    return obj === null || obj === '' ?
      fallback :
      obj?.replaceAll('<', '&lt;').split('\n').map(item => item.trim()).join('');
  }

  return obj == null || obj === '' ? fallback : obj;
};

/**
 * Renders a table of data, plucking the given properties from each item in
 * `data`.
 */
const renderTable = (name, properties, data) => {
  if (data === undefined || data.length === 0) {
    return '';
  }
  return `
  ${name ? `<h3>${name}</h3>` : ''}
  <table>
    <tr>
      ${properties
        .map(
          (p) =>
            `<th>${capitalize(
              (Array.isArray(p) ? p[0] : p).split('.')[0]
            )}</th>`
        )
        .join('')}
    </tr>
    ${data
      .map(
        (i) => `
      <tr>
        ${properties.map((p) => `<td>${get(i, p)}</td>`).join('')}
      </tr>
    `
      )
      .join('')}
  </table>
`;
};

const capitalize = (s) => s[0].toUpperCase() + s.substring(1);
