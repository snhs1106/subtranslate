
console.log("hello plz plz");
console.log("hello plz plz");



const textToTranslate = ["this is the text to translate"];
const targetLang = "ES";



console.log("hello plz plz 2");




function translate_str(stringy, targ_lang_var){
    
    console.log("hello plz plz 3");

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

    // const translateDisplay = document.getElementById('displaytranslate');

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



let processingCaption = false; // A flag to check if we're currently processing a caption
let video_paused = false;// A flag to check if the video is paused

const handleWordClick = async (event) => {

    const videoPlayer = document.querySelector('.video-stream.html5-main-video');
    if (videoPlayer && !video_paused) {
        videoPlayer.pause();  // Pause the video
        video_paused = true;  // Set the flag to indicate the video is paused
    }

     // Create the popup or use an existing one
     let popup = document.querySelector('.popup-translation');
     if (!popup) {
         popup = document.createElement('div');
         popup.className = 'popup-translation';
         // Apply styles directly to the popup
         Object.assign(popup.style, {
             width: '300px',
             backgroundColor: 'white',
             border: '1px solid #ccc',
             boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
             borderRadius: '5px',
             padding: '10px',
             fontFamily: 'Arial, sans-serif',
             fontSize: '14px',
             position: 'fixed',
             top: '50%',
             left: '30%',
             transform: 'translate(-50%, -50%)',
             zIndex: '9999'
         });
         document.body.appendChild(popup);
     }
 
    // Send a message to the background script for translation
    chrome.runtime.sendMessage({ action: 'translate', word: wordToTranslate }, (response) => {
        if (response && response.translatedWord) {
            // Display the translated word in the popup
            popup.textContent = response.translatedWord;

            // Append the close button to the popup
            popup.appendChild(closeButton);
            popup.style.display = 'block';
        }
    });
     
     // Add the 'X' close button
     let closeButton = document.createElement('span');
     closeButton.textContent = 'X';
     closeButton.onclick = () => {
         popup.style.display = 'none';
         if (videoPlayer && video_paused) {
             videoPlayer.play(); // Unpause the video
             video_paused = false;
         }
     };
     // Apply styles directly to the close button
     Object.assign(closeButton.style, {
         position: 'absolute',
         top: '5px',
         right: '5px',
         border: 'none',
         background: 'transparent',
         cursor: 'pointer',
         fontSize: '16px'
     });
 
     popup.appendChild(closeButton);
 
     popup.style.display = 'block';
}



const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
            const captionSegments = document.querySelectorAll('.ytp-caption-segment');

            captionSegments.forEach(captionSegment => {
                // Check if this caption has already been processed
                if (captionSegment.dataset.processed) return;

                const words = captionSegment.textContent.split(' ');

                // Set the flag
                processingCaption = true;

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

                // Mark this caption segment as processed
                captionSegment.dataset.processed = "true";

                // Reset the flag
                processingCaption = false;
            });
        }
    }
});

// Start observing the body and its subtree for added nodes, but only if we're not currently processing a caption
if (!processingCaption) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

