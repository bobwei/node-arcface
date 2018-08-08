import R from 'ramda';

const fn = (mapper, data) => {
  return R.pipe(
    R.map(mapper),
    R.map(r => Promise.resolve(r)),
    promises => Promise.all(promises),
  )(data);
};

export default R.curry(fn);
