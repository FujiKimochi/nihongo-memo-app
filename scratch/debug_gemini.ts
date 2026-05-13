const API_KEY = 'AIzaSyBMc8_rpX5C9LQv3fjT2rUCoSvLqsSCn5o';

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error listing models:', data);
      return;
    }
    
    console.log('Available Models:');
    data.models.forEach((m: any) => {
      if (m.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- ${m.name} (${m.displayName})`);
      }
    });
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

listModels();
