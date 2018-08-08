import R from 'ramda';

import mapAsync from 'src/utils/mapAsync';

import parseToAsvls from './parseToAsvls';

const fn = (dependencies, data) => {
  const { arcface } = dependencies;
  return Promise.resolve(data)
    .then(parseToAsvls(dependencies))
    .then(mapAsync(asvl => arcface.detect(asvl)));
};

export default R.curry(fn);
