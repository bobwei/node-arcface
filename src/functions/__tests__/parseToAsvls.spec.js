import * as R from 'ramda';

import ArcFace from 'src';
import data from 'src/__tests__/photos.json';

import parseToAsvls from '../parseToAsvls';

test('parseToAsvls', () => {
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(R.map(R.path(['source', 'url'])))
    .then(parseToAsvls({ arcface }))
    .then(results => {
      expect(results.length).toEqual(data.length);
      return results;
    })
    .then(([r1, r2]) => {
      expect(r1.i32Width).toEqual(640);
      expect(r1.i32Height).toEqual(799);
      expect(r2.i32Width).toEqual(750);
      expect(r2.i32Height).toEqual(561);
    });
});
