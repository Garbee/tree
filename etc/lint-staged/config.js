export default {
  '**/*.{js,ts}': 'eslint --fix',
  '**/*.ts?(x)': 'tsc -p tsconfig.json --noEmit',
  'package-lock.json': 'npm run lint:lockfile',
};
