import * as R from 'ramda';

import ArcFace from 'src';
import data from 'src/__tests__/photos.json';

import extractFeatures from '../extractFeatures';

test('extractFeatures', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(R.map(R.path(['source', 'url'])))
    .then(extractFeatures({ arcface }))
    .then(results => {
      const [r1, r2] = results;
      expect(r1.length).toEqual(1);
      expect(r2.length).toEqual(3);
      return results;
    })
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
