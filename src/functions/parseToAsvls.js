import R from 'ramda';

import mapAsync from 'src/utils/mapAsync';

const fn = (dependencies, data) => {
  const { arcface } = dependencies;
  return mapAsync(arcface.parseImage)(data);
};

export default R.curry(fn);
