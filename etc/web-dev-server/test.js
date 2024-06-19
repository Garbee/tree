import root from './index.js';
import {resolve} from 'path';

const {dirname} = import.meta;

root.rootDir = resolve(dirname, '..', '..', 'tests', 'srv');

export default root;
