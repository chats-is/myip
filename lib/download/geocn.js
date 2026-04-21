const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

const downloadGeoCN = async () => {
  const releasesUrl = 'https://github.com/ljxi/GeoCN/releases';
  const downloadUrl = `${releasesUrl}/latest/download/GeoCN.mmdb`;
  const filePath = path.resolve(__dirname, '../../db', 'GeoCN.mmdb');

  try {
    const response = await axios.get(downloadUrl, {
      responseType: 'stream',
      maxRedirects: 5
    });
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
      response.data.on('error', reject);
    });

    console.log('GeoCN.mmdb downloaded successfully');
  } catch (err) {
    console.error('Error fetching GeoCN.mmdb:', err);
  }
};

downloadGeoCN();
