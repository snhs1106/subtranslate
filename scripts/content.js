
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


