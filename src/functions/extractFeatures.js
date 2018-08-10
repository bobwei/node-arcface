import R from 'ramda';

import mapAsync from 'src/utils/mapAsync';

import detectFaces from './detectFaces';
import serializeFeature from './serializeFeature';

const fn = (dependencies, data) => {
  const { arcface, serialize = false } = dependencies;
  return Promise.resolve(data)
    .then(detectFaces(dependencies))
    .then(
      mapAsync(
        R.pipeP(
          mapAsync(({ asvl, rcFace, lfaceOrient }) =>
            arcface.extractFeature(asvl, rcFace, lfaceOrient),
          ),
          R.when(R.always(serialize), R.map(serializeFeature)),
        ),
      ),
    );
};

export default R.curry(fn);
