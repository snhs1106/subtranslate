const apiKey = '48322ac8-b966-16c7-9c4b-e4bd45f322fb:fx';
const apiUrl = 'https://api-free.deepl.com/v2/translate';

const textToTranslate = ["this is the text to translate"];
const targetLang = "ES";

document.addEventListener('DOMContentLoaded', function () {
  const grabUrlButton = document.getElementById('translatetext');
  const translateDisplay = document.getElementById('displaytranslate');

  grabUrlButton.addEventListener('click', function () {
    translateDisplay.textContent = "clicked"

    const requestBody = JSON.stringify({
      text: textToTranslate,
      target_lang: targetLang,
    });

    const headers = {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: requestBody,
    })
      .then(response => response.json())
      .then(data => {
        // Handle the translated response here
        translateDisplay.textContent = data.translations[0].text;
      })
      .catch(error => {
        // Handle any errors here
        translateDisplay.textContent = "error"
        console.error('Error:', error);
      });
      

  });
});
