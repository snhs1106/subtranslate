const apiKey = "48322ac8-b966-16c7-9c4b-e4bd45f322fb:fx";
const url = 'https://api-free.deepl.com/v2/translate';
const headers = {
    'Authorization': `DeepL-Auth-Key ${apiKey}`,
    'User-Agent': 'SubTranslate/1.0',
    'Content-Type': 'application/json',
  };



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate") {
  
      const data = {
        text: request.textToTranslate, // Use the textToTranslate from the message
        target_lang: request.targetLang, // Use the targetLang from the message
      };
  
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      };
  
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          sendResponse({ result: data });
        })
        .catch(error => {
          sendResponse({ error: error.message });
        });
      return true; // Indicates that we're using sendResponse asynchronously
    }
  });
