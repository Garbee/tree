import {resolve} from 'path';

const mode = process.env.MODE || 'dev';

if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const {dirname} = import.meta;
const exportConditions = mode === 'dev' ?
  ['development'] :
  [];

export default {
  nodeResolve: {exportConditions},
  preserveSymlinks: true,
  rootDir: resolve(dirname, '..', '..', 'man'),
};
