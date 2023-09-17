console.log("hello plz plz");
console.log("hello plz plz");



const textToTranslate = ["this is the text to translate"];
const targetLang = "ES";
const apiKey = "48322ac8-b966-16c7-9c4b-e4bd45f322fb:fx";
const url = 'https://api-free.deepl.com/v2/translate';
const headers = {
    'Authorization': `DeepL-Auth-Key ${apiKey}`,
    'User-Agent': 'SubTranslate/1.0',
    'Content-Type': 'application/json',
  };



console.log("hello plz plz 2");




function translate_str(stringy, targ_lang_var){
    
    chrome.runtime.sendMessage({ 
        action: "translate", 
        textToTranslate: textToTranslate, 
        targetLang: targetLang 
      }, response => {
        if (response.result) {
          // Handle the API response data here
          console.log(response.result);
        } else {
          // Handle any errors here
          console.error('Error:', response.error);
        }
      });
      
}






// function translate_str(stringy, targ_lang){
    
//     console.log("hello plz plz 3");

//     const translateDisplay = document.getElementById('displaytranslate');

//     console.log("hello plz plz 4");

//     const requestBody = JSON.stringify({
//         text: stringy,
//         target_lang: targ_lang,
//       });
      
//       const headers = {
//         'Authorization': `DeepL-Auth-Key ${apiKey}`,
//         'Content-Type': 'application/json',
//       };
      
//       fetch(apiUrl, {
//         method: 'POST',
//         headers: headers,
//         body: requestBody,
//       })
//         .then(response => response.json())
//         .then(data => {
//           // Handle the translated response here
          
//           translateDisplay.textContent = data;
//         })
//         .catch(error => {
//           // Handle any errors here
//           translateDisplay.textContent = "error";
//           console.error('Error:', error);
//         });

// }








translate_str(textToTranslate, targetLang);





// document.addEventListener('DOMContentLoaded', function () {
//     console.log("hello plz plz 3");
//   const grabtranslateButton = document.getElementById('translatetext');
//   const translateDisplay = document.getElementById('displaytranslate');
//   console.log("hello plz plz 4");
//   console.log("doc listener set up");

//   grabtranslateButton.addEventListener('click', function () {
//     translateDisplay.textContent = "clicked";
//     console.log("running translate");

//     const requestBody = JSON.stringify({
//       text: textToTranslate,
//       target_lang: targetLang,
//     });
    
//     const headers = {
//       'Authorization': `DeepL-Auth-Key ${apiKey}`,
//       'Content-Type': 'application/json',
//     };
    
//     fetch(apiUrl, {
//       method: 'POST',
//       headers: headers,
//       body: requestBody,
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Handle the translated response here
        
//         translateDisplay.textContent = data;
//       })
//       .catch(error => {
//         // Handle any errors here
//         translateDisplay.textContent = "error";
//         console.error('Error:', error);
//       });
      
//   });
// });


















// const handleWordClick = (event) => {
//     console.log(event.target.textContent);
// }
// // Set up the mutation observer
// const observer = new MutationObserver(mutations => {
//     for (let mutation of mutations) {
//         if (mutation.addedNodes.length) {
//             const captionSegment = document.querySelector('.ytp-caption-segment');
//             if (captionSegment) {
//                 const words = captionSegment.textContent.split(' ');
//                 console.log(words);
//                 // Clear the segment's content
//                 captionSegment.innerHTML = '';

//                 // Append each word as a separate span with an attached click listener
//                 words.forEach(word => {
//                     const wordSpan = document.createElement('span');
//                     wordSpan.textContent = word + ' ';  // Adding a space for separation
//                     wordSpan.style.cursor = "pointer";  // Make the word appear clickable
//                     wordSpan.addEventListener('click', handleWordClick);
//                     captionSegment.appendChild(wordSpan);
//                 });
//             }
//         }
//     }
// });

// // Start observing the body and its subtree for added nodes
// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });


