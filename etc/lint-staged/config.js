export default {
  '**/*.{js,ts}': 'eslint --fix',
  '**/*.ts?(x)': () => {
    return 'tsc -p tsconfig.json --noEmit';
  },
  'src/**/*.ts': 'npm run lint:lit-analyzer',
  'package-lock.json': 'npm run lint:lockfile',
};
