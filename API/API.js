
const { google } = require('googleapis');

// Replace 'YOUR_API_KEY' with your actual YouTube Data API key
const API_KEY = 'AIzaSyD29jcikdrp-IUDTHYnh7k0iMZdyr0LPZI';

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

// Replace 'VIDEO_ID' with the ID of the YouTube video you want to retrieve
const videoId = '0FF7crngt1U';
// Define the parameters for the captions request
const captionsRequestParams = {
    part: 'snippet',
    videoId: videoId,
  };
  
  // Call the YouTube API to get captions for the video
  youtube.captions.list(captionsRequestParams, (err, response) => {
    if (err) {
      console.error('Error fetching captions:', err);
      return;
    }
  
    // Extract the ID of the automatic captions (assuming they are available)
    const captions = response.data.items;
    let autoCaptionId = null;
  
    for (const caption of captions) {
      if (caption.snippet.trackKind === 'ASR' && caption.snippet.language === 'en') {
        // Assuming English automatic captions
        autoCaptionId = caption.id;
        break;
      }
    }
  
    if (!autoCaptionId) {
      console.error('Automatic captions not found for the video.');
      return;
    }
  
    // Retrieve the transcript for the automatic captions
    const transcriptRequestParams = {
      id: autoCaptionId,
    };
  
    youtube.captions.download(transcriptRequestParams, (err, response) => {
      if (err) {
        console.error('Error fetching transcript:', err);
        return;
      }
  
      // Extract the transcript content
      const transcript = response.data;
      console.log('Transcript:', transcript);
    });
  });
  