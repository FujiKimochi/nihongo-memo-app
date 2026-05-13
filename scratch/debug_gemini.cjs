const https = require('https');

const API_KEY = 'AIzaSyBMc8_rpX5C9LQv3fjT2rUCoSvLqsSCn5o';
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const result = JSON.parse(data);
    if (res.statusCode !== 200) {
      console.error('Error:', result);
      return;
    }
    console.log('Available Models for generateContent:');
    result.models.forEach((m) => {
      if (m.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- ${m.name}`);
      }
    });
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
