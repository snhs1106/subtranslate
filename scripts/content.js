let processingCaption = false; // A flag to check if we're currently processing a caption
let video_paused = false;// A flag to check if the video is paused

const handleWordClick = async (event) => {
    console.log(event.target.textContent);

    const videoPlayer = document.querySelector('.video-stream.html5-main-video');
    if (videoPlayer && !video_paused) {
        videoPlayer.click();  // Toggle play/pause
        video_paused = true;
    }

    // Create the pop up
    // Send a message to the background script
    // chrome.runtime.sendMessage({ action: 'translate', word: wordToTranslate }, (response) => {
    //     if (response && response.translatedWord) {
    //         // Handle the response and display in the popup
    //         popup.textContent = response.translatedWord;
    //         popup.style.display = 'block';
    //     }
    // });

    // Create the popup or use an existing one
    let popup = document.querySelector('.popup-translation');
    if (!popup) {
        popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.bottom = '50px';  // Position it 50px from the bottom. Adjust as needed.
        popup.style.left = '50%';     // Center it horizontally
        popup.style.transform = 'translateX(-50%)';  // Centering trick
        popup.style.backgroundColor = 'black';
        popup.style.color = 'white';
        popup.style.padding = '10px';
        popup.style.borderRadius = '5px';
        popup.style.zIndex = '1000';
        popup.className = 'popup-translation';
        document.body.appendChild(popup);
    }

    // Set the translated word and show the popup
    popup.textContent = "Hello world!";
    popup.style.display = 'block';

    // Optionally, hide the popup after a few seconds or on another word click
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);  // Adjust the time as needed
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
