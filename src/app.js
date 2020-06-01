const express = require('express');
const app = express();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello ${target}!`);
});

app.get('/gcs', async (req, res) => {
    console.log('GCS test');
    const path = 'LC08/01/001/004/LC08_L1GT_001004_20150730_20170406_01_T2/LC08_L1GT_001004_20150730_20170406_01_T2_MTL.txt';

    const file = storage.bucket('gcp-public-data-landsat').file(path);
    const data = await file.download();
  
    res.send(data);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});