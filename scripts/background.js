chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'translate') {
        const word = message.word;

        // Here, you can call an external API to get the translation. 
        // For demonstration purposes, let's assume the translation is the same word:
        const translatedWord = word;  // Replace this with actual translation logic

        // Send back the translated word
        sendResponse({ translatedWord });
    }
});
