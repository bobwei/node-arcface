import ref from 'ref';

const fn = ({ pbFeature, lFeatureSize }) => {
  const buf = ref.reinterpret(pbFeature, lFeatureSize);
  return {
    pbFeature: buf.toString('base64'),
    lFeatureSize,
  };
};

export default fn;
