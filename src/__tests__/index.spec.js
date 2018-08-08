import * as R from 'ramda';

import ArcFace from '../index';

const waitAll = promises => Promise.all(promises);

/*
  1. Given photoUrl, parse into asvl format for face detection.
  2. Given asvl format data, do face detection and return an array of detected faces.
  3. Given asvl, detected face position, do feature extraction and return extracted features/
*/
test('ArcFace', () => {
  const data = require('./photos.json');
  const arcface = new ArcFace(process.env);
  return Promise.resolve(data)
    .then(
      R.pipe(
        R.map(
          R.pipe(
            R.path(['source', 'url']),
            photoUrl => arcface.parseImage(photoUrl),
          ),
        ),
        waitAll,
      ),
    )
    .then(
      R.pipe(
        R.map(asvl => arcface.detect(asvl)),
        waitAll,
      ),
    )
    .then(
      R.pipe(
        R.map(
          R.pipe(
            R.map(({ asvl, rcFace, lfaceOrient }) =>
              arcface.extractFeature(asvl, rcFace, lfaceOrient),
            ),
            waitAll,
          ),
        ),
        waitAll,
      ),
    )
    .then(R.tap(console.log))
    .then(([r1, r2]) => {
      expect(r1.length).toEqual(1);
      expect(r2.length).toEqual(3);
    });
});
