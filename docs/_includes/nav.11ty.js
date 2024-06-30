import relative from './relative-path.js';

export default function ({page}) {
  return `
<nav>
  <a href="${relative(page.url, '/')}">Home</a>
  <a href="${relative(page.url, '/accessibility/')}">Accessibility</a>
  <a href="${relative(page.url, '/developer-experience/')}">Developer Experience</a>
  <a href="${relative(page.url, '/examples/')}">Examples</a>
  <a href="${relative(page.url, '/api/')}">API</a>
  <a href="${relative(page.url, '/install/')}">Install</a>
</nav>`;
};
