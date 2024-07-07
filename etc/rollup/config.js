import {nodeResolve} from '@rollup/plugin-node-resolve';

export default {
  input: 'man/assets/basic-example.js',
  output: {
    file: 'man/assets/basic-example.bundled.js',
    format: 'esm',
    inlineDynamicImports: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [nodeResolve({browser: true})],
};
