import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import {readFileSync} from 'fs';

const customElements = JSON.parse(
  readFileSync('custom-elements.json', 'utf-8'),
);

const eleventyConfigAdapter = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPassthroughCopy('docs/.nojekyll');
  eleventyConfig.addPassthroughCopy('docs/docs.css');
  eleventyConfig.addPassthroughCopy({
    'node_modules/prismjs/themes/prism-okaidia.css': 'prism-okaidia.css',
  });

  eleventyConfig.addGlobalData('api', {
    customElements,
  });

  return {
    dir: {
      input: 'docs',
      output: 'man',
    },
  };
};

export default eleventyConfigAdapter;
