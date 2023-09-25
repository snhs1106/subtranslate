const axios = require('axios');
// Replace 'YOUR_API_KEY' with your actual DeepL API key.
const apiKey = "48322ac8-b966-16c7-9c4b-e4bd45f322fb:fx";

// Define the DeepL API endpoint.
const apiUrl = 'https://api.deepl.com/v2/translate';

// Function to translate text using DeepL API.
async function translateText(text, targetLang) {
  try {
    const response = await axios.post(apiUrl, {
      text,
      target_lang: targetLang,
      auth_key: apiKey,
    });

    // Extract the translated text from the response.
    const translatedText = response.data.translations[0].text;

    return translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}

// Example usage:
const textToTranslate = 'Hello, world!';
const targetLanguage = 'DE'; // Replace with your desired target language code.

translateText(textToTranslate, targetLanguage)
  .then(translatedText => {
    console.log('Translated text:', translatedText);
  })
  .catch(error => {
    console.error('Translation error:', error);
  });
