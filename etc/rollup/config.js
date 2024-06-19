import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'dist/src/tree.js',
  output: [
    {
      file: 'garbee-tree.bundled.js',
      format: 'esm',
    },
    {
      file: 'tests/srv/assets/garbee-tree.bundled.js',
      format: 'esm',
    },
  ],
  watch: {
    include: 'dist/src/**/*.js',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      'Reflect.decorate': 'undefined',
      'preventAssignment': true,
    }),
    resolve(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/u,
        },
      },
    }),
    summary(),
  ],
};
