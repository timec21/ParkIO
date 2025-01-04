import axios from 'axios';

export interface Favorite {
    id: string;
    name: string;
    image: string;
    description: string;
    facilities: string[];
    note?: string; // Not alanı opsiyonel olarak eklendi
  }
  

// Backend API URL'si
const API_URL = 'http://192.168.1.251:3000/favorites';

// Tüm favorileri getiren API çağrısı
export const fetchFavoritesFromAPI = async (): Promise<Favorite[]> => {
    try {
      const response = await axios.get<Favorite[]>(API_URL);
      // facilities alanını olduğu gibi döndür
      return response.data.map((favorite) => ({
        ...favorite,
        facilities: favorite.facilities, // Zaten string[] olduğu için direkt kullan
      }));
    } catch (error) {
      console.error('Error fetching favorites from API:', error);
      throw error;
    }
  };

// Yeni favori ekleyen API çağrısı
export const addFavoriteToAPI = async (favorite: Favorite): Promise<void> => {
    try {
      const payload = {
        ...favorite,
        facilities: favorite.facilities.join(','),
      };
      await axios.post(API_URL, payload);
      console.log('Favorite added to API');
    } catch (error) {
      console.error('Error adding favorite to API:', error);
      throw error;
    }
  };

// Favoriyi silen API çağrısı
export const removeFavoriteFromAPI = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log('Favorite removed from API');
  } catch (error) {
    console.error('Error removing favorite from API:', error);
    throw error;
  }
};
