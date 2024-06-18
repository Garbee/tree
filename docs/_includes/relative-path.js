import {posix as path} from 'path';

export default (base, p) => {
  const relativePath = path.relative(base, p);
  if (p.endsWith('/') && !relativePath.endsWith('/') && relativePath !== '') {
    return relativePath + '/';
  }
  return relativePath;
};
