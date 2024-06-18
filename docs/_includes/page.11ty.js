import header from './header.11ty.js';
import footer from './footer.11ty.js';
import nav from './nav.11ty.js';
import relative from './relative-path.js';

export default function (data) {
  const {title, page, content} = data;
  return `
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/docs.css" />
  </head>
  <body>
    ${header()}
    ${nav(data)}
    <div id="main-wrapper">
      <main>
        ${content}
      </main>
    </div>
    ${footer()}
  </body>
</html>`;
};
