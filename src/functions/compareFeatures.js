import R from 'ramda';

const fn = (dependencies, f1, f2) => {
  const { arcface } = dependencies;
  return Promise.resolve().then(() => {
    return arcface.compare(f1, f2);
  });
};

export default R.curry(fn);
