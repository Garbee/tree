import summary from 'rollup-plugin-summary';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: 'dist/src/tree.js',
  output: [
    {
      file: 'man/garbee-tree.bundled.js',
      inlineDynamicImports: true,
      format: 'esm',
    },
    {
      file: 'tests/srv/assets/garbee-tree.bundled.js',
      inlineDynamicImports: true,
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
    summary(),
  ],
};
