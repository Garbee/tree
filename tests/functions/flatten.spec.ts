import {
  test,
  expect,
} from '@playwright/test';
import {flatten} from '../../src/functions/flatten.js';
import {directoryStructure} from './data/sample-directory.js';

test.describe('flatten', () => {
  test('it returns an empty array when an empty array is provided', () => {
    expect(flatten([]).length).toEqual(0);
  });

  test('it flattens all data recursively', () => {
    const data = flatten(directoryStructure);

    expect(data.length).toEqual(42);
  });
});
