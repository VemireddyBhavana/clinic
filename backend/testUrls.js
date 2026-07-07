const fs = require('fs');
const axios = require('axios');

const content = fs.readFileSync('./utils/seedHospitals.js', 'utf8');
const urls = Array.from(new Set(content.match(/https?:\/\/[^\s\",}]+/g) || []));
console.log('Total unique URLs found:', urls.length);

urls.forEach(async (url) => {
  try {
    const res = await axios.head(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log(`OK [${res.status}]: ${url}`);
  } catch (err) {
    console.log(`ERR [${err.response ? err.response.status : err.message}]: ${url}`);
  }
});
