import R from 'ramda';

const fn = (mapper, data) => {
  return R.pipe(
    R.map(obj => Promise.resolve(mapper(obj))),
    promises => Promise.all(promises),
  )(data);
};

export default R.curry(fn);
