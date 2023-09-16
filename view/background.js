const apiKey = '[yourAuthKey]';
const apiUrl = 'https://api-free.deepl.com/v2/translate';

const textToTranslate = ["Hello, world!"];
const targetLang = "DE";

document.addEventListener('DOMContentLoaded', function () {
  const grabUrlButton = document.getElementById('translatetext');
  const translateDisplay = document.getElementById('displaytranslate');

  grabUrlButton.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      const url = tab.url;
      translateDisplay.textContent = url;
    });
  });
});

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
    
    console.log(data);
  })
  .catch(error => {
    // Handle any errors here
    console.error('Error:', error);
  });