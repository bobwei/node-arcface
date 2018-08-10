import * as R from 'ramda';

import mapAsync from '../mapAsync';

test('mapAsync', () => {
  const asyncFn = () => new Promise(resolve => setTimeout(() => resolve(9), 0));
  return Promise.resolve(R.range(0, 10))
    .then(mapAsync(asyncFn))
    .then(results => {
      expect(results.length).toEqual(10);
      return results;
    })
    .then(
      R.forEach(result => {
        expect(result).toEqual(9);
      }),
    );
});
