# node-arcface

### Arcsoft Face Cognition Engine.

[ArcFace](http://www.arcsoft.com.cn/ai/arcface.html) is a **Face Cognition Engine**, which contains **Face Detection**, **Face Recognition** and **Face Tracking**.

This module is a **Non-Official** wrapper of ArcFace C++ SDK used for nodejs.

### Getting Started

```
yarn add @bobwei/node-arcface
```

### Usage

```js
// Please provide following variables to continue
/*
ARCSOFT_APP_ID=
ARCSOFT_FD_SDKKEY=
ARCSOFT_FR_SDKKEY=
*/
const arcface = new ArcFace(process.env);

// parse image file to ASVLOFFSCREEN
const asvl = await arcface.parseImage('/path/to/image.jpg');

// face detection
const faces = arcface.detect(asvl);

// extract face featrue
const faceModel = arcface.extractFeature(asvl, faces.rcFace[0], faces.lfaceOrient[0]);
```

More see in [test](src/__tests__/index.spec.js).

### Advanced Usage

```js
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
```

- More see in [test](src/functions/__tests__/example.spec.js).
- Serialized data [example](src/__tests__/feature-mark.json)

### References

- This repo is originally forked from [node-arcface](https://github.com/lkspc/node-arcface).
