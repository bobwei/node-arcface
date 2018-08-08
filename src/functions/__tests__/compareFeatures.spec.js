import * as R from 'ramda';

import ArcFace from 'src';
import data from 'src/__tests__/photos.json';
import expectedSerializedFeature from 'src/__tests__/feature-0.json';
import photos from 'src/__tests__/photos-1.json';

import extractFeatures from '../extractFeatures';
import compareFeatures from '../compareFeatures';
import deserializeFeature from '../deserializeFeature';

test('compareFeatures', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(R.map(R.path(['source', 'url'])))
    .then(extractFeatures({ arcface }))
    .then(([[f1]]) => {
      const f2 = deserializeFeature(expectedSerializedFeature);
      return compareFeatures({ arcface }, f1, f2);
    })
    .then(result => {
      expect(result).toEqual(1);
    });
});

test('compareFeatures', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(photos)
    .then(
      R.pipe(
        R.values,
        R.head,
      ),
    )
    .then(R.map(R.path(['source', 'url'])))
    .then(extractFeatures({ arcface }))
    .then(([[f1], [f2]]) => {
      return compareFeatures({ arcface }, f1, f2);
    })
    .then(result => {
      expect(result).toBeGreaterThan(0.5);
      return result;
    });
});
