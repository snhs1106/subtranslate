console.log("hello plz plz");
console.log("hello plz plz");



const textToTranslate = ["this is the text to translate"];
const targetLang = "ES";

document.addEventListener('DOMContentLoaded', function () {
  const grabtranslateButton = document.getElementById('translatetext');
  const translateDisplay = document.getElementById('displaytranslate');

  grabtranslateButton.addEventListener('click', function () {
    translateDisplay.textContent = "clicked";
    console.log("running translate");

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
        
        translateDisplay.textContent = data;
      })
      .catch(error => {
        // Handle any errors here
        translateDisplay.textContent = "error";
        console.error('Error:', error);
      });
      
  });
});


















const handleWordClick = (event) => {
    console.log(event.target.textContent);
}
// Set up the mutation observer
const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
            const captionSegment = document.querySelector('.ytp-caption-segment');
            if (captionSegment) {
                const words = captionSegment.textContent.split(' ');
                console.log(words);
                // Clear the segment's content
                captionSegment.innerHTML = '';

                // Append each word as a separate span with an attached click listener
                words.forEach(word => {
                    const wordSpan = document.createElement('span');
                    wordSpan.textContent = word + ' ';  // Adding a space for separation
                    wordSpan.style.cursor = "pointer";  // Make the word appear clickable
                    wordSpan.addEventListener('click', handleWordClick);
                    captionSegment.appendChild(wordSpan);
                });
            }
        }
    }
});

// Start observing the body and its subtree for added nodes
observer.observe(document.body, {
    childList: true,
    subtree: true
});


