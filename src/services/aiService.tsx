import axios from 'axios';

const API_URL = 'https://vision.googleapis.com/v1/images:annotate';
const API_KEY = '9a6c8eaee33e7e8b5e17613b5b3140906758155f'; 

export const analyzeImage = async (imageBase64: string) => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        requests: [
          {
            image: { content: imageBase64 },
            features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
          },
        ],
      }
    );
    return response.data.responses[0].labelAnnotations;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};
