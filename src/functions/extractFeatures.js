import R from 'ramda';

import mapAsync from 'src/utils/mapAsync';

import detectFaces from './detectFaces';

const fn = (dependencies, data) => {
  const { arcface } = dependencies;
  return Promise.resolve(data)
    .then(detectFaces(dependencies))
    .then(
      mapAsync(
        mapAsync(({ asvl, rcFace, lfaceOrient }) =>
          arcface.extractFeature(asvl, rcFace, lfaceOrient),
        ),
      ),
    );
};

export default R.curry(fn);
