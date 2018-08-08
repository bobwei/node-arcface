import * as R from 'ramda';

import ArcFace from 'src';
import data from 'src/__tests__/photos.json';
import expectedSerializedFeature from 'src/__tests__/feature-0.json';

import extractFeatures from '../extractFeatures';
import serializeFeature from '../serializeFeature';
import deserializeFeature from '../deserializeFeature';

test('serializeFeature and deserializeFeature', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(R.map(R.path(['source', 'url'])))
    .then(extractFeatures({ arcface }))
    .then(
      R.map(
        R.map(
          R.pipe(
            serializeFeature,
            deserializeFeature,
          ),
        ),
      ),
    )
    .then(
      R.map(
        R.map(feature => {
          expect(feature).toHaveProperty('pbFeature');
          expect(feature).toHaveProperty('lFeatureSize', 22020);
          return feature;
        }),
      ),
    );
});

test('serializeFeature', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(R.map(R.path(['source', 'url'])))
    .then(extractFeatures({ arcface }))
    .then(
      R.pipe(
        R.head,
        R.head,
        serializeFeature,
      ),
    )
    .then(serializedFeature => {
      expect(serializedFeature).toEqual(expectedSerializedFeature);
    });
});
