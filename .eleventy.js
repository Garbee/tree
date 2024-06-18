import syntaxHighlightPlugin from '@11ty/eleventy-plugin-syntaxhighlight';
import fs from 'fs';

const customElements = JSON.parse(
  fs.readFileSync('custom-elements.json', 'utf-8')
);

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
  eleventyConfig.addPassthroughCopy('docs/.nojekyll');
  eleventyConfig.addPassthroughCopy('docs/docs.css');

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
