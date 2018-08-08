import ArcFace from 'src';

import featureMark from 'src/__tests__/feature-mark.json';

import extractFeatures from '../extractFeatures';
import compareFeatures from '../compareFeatures';
import serializeFeature from '../serializeFeature';
import deserializeFeature from '../deserializeFeature';

test('Example', async () => {
  const arcface = new ArcFace(process.env);
  const urls = [
    'http://www.gstatic.com/tv/thumb/persons/589228/589228_v9_ba.jpg',
    'https://i.dailymail.co.uk/i/pix/2017/01/19/11/3C26065000000578-4135958-image-a-5_1484825294085.jpg',
  ];
  const [[f1], [f2]] = await extractFeatures({ arcface })(urls);
  const score = await compareFeatures({ arcface })(f1, f2);
  expect(score).toBeGreaterThan(0.7);

  /* serializedFeature can now be saved to disk. */
  const serializedf1 = serializeFeature(f1);
  expect(serializedf1).toEqual(featureMark);

  const deserializeF1 = deserializeFeature(serializedf1);
  const result = await compareFeatures({ arcface })(deserializeF1, f2);
  expect(result).toBeGreaterThan(0.7);
});
