# node-arcface

### Arcsoft Face Cognition Engine.

[ArcFace](http://www.arcsoft.com.cn/ai/arcface.html) is a **Face Cognition Engine**, which contains **Face Detection**, **Face Recognition** and **Face Tracking**.

This module is a **Non-Official** wrapper of ArcFace C++ SDK used for nodejs.

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

### References

- This repo is originally forked from [node-arcface](https://github.com/lkspc/node-arcface).
