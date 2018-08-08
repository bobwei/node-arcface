import * as R from 'ramda';

import ArcFace from 'src';
import data from 'src/__tests__/photos.json';

import detectFaces from '../detectFaces';

test('detectFaces', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(R.map(R.path(['source', 'url'])))
    .then(detectFaces({ arcface }))
    .then(([r1, r2]) => {
      expect(r1.length).toEqual(1);
      expect(r2.length).toEqual(3);
    });
});
