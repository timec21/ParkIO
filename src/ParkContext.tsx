import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * Park arayüzü
 */
export interface Favorite {
  id: string;
  name: string;
  image: string;
  description?: string; // string | undefined olabilir
  facilities?: string[]; // string[] | undefined olabilir
  note?: string;
}

/**
 * ParkContext arayüzü
 */
interface ParkContextType {
  parks: Park[];
  favoriteParks: Park[];
  addFavorite: (park: Park) => void;
  removeFavorite: (parkId: string) => void;
  getParkDetails: (parkId: string) => Park | undefined;
}

const ParkContext = createContext<ParkContextType | undefined>(undefined);

export const ParkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1) parks
  const [parks, setParks] = useState<Park[]>([]);

  // 2) favoriteParks
  const [favoriteParks, setFavoriteParks] = useState<Park[]>([]);

  // NPS API endpoint + sorgu parametresi
  // Burada kendi anahtarını ve istediğin limit'i ekle
  const API_URL = `https://developer.nps.gov/api/v1/parks?limit=50&api_key=6ON0aNJYGfGuGjhoMwGUzg80gXg95gmpzBjAXGHr`;

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await fetch(API_URL);
        const jsonData = await response.json();

        // NPS yanıtı şu şekilde geliyor:
        // {
        //   data: [ { park verileri... }, ... ],
        //   total: "...",
        //   limit: "...",
        //   start: "...",
        //   ...
        // }
        // O yüzden jsonData.data diyerek asıl diziye ulaşıyoruz

        if (!jsonData.data) {
          console.error('Beklenmeyen veri yapısı:', jsonData);
          return;
        }

        // Bu dizi -> jsonData.data
        // Şimdi sadece ilk 20'sini gösterelim (isteğe bağlı)
        const slicedData = jsonData.data.slice(0, 20);

        // NPS'ten gelen her park objesinde
        // `id`, `fullName`, `latLong`, `description`, `images` vb. alanlar var.
        // Bizim Park interface'ine göre "distance" alanı orijinalde yok; 
        // istersen oraya bir sabit string ya da başka bir veriyi koyabilirsin.
        const formattedParks: Park[] = slicedData.map((item: any) => ({
          // Örnek mapping: 
          // NPS'te item.id => parkın Unique ID'si, item.fullName => Adı, 
          // item.images[0].url => görsel vs.
          id: String(item.id || Math.random()), 
          name: item.fullName || 'No Name',
          distance: 'N/A', // NPS verisinde "distance" yok, buraya sabit değer koyabiliriz
          image: (item.images && item.images.length > 0) ? item.images[0].url : '',
          description: item.description ?? '',
          // facilities'leri NPS verisinde "activities" veya "topics" alanlarından toplayabilirsin.
          facilities: item.activities?.map((act: any) => act.name) ?? [],
        }));

        setParks(formattedParks);
      } catch (error) {
        console.error('Park verisi çekilirken hata:', error);
      }
    };

    fetchParks();
  }, []);

  /**
   * Favori ekleme
   */
  const addFavorite = (park: Park) => {
    setFavoriteParks((prevFavorites) => [...prevFavorites, park]);
  };

  /**
   * Favoriden çıkarma
   */
  const removeFavorite = (parkId: string) => {
    setFavoriteParks((prevFavorites) =>
      prevFavorites.filter((park) => park.id !== parkId)
    );
  };

  /**
   * Tek park detayı
   */
  const getParkDetails = (parkId: string) => {
    return parks.find((park) => park.id === parkId);
  };

  return (
    <ParkContext.Provider
      value={{
        parks,
        favoriteParks,
        addFavorite,
        removeFavorite,
        getParkDetails,
      }}
    >
      {children}
    </ParkContext.Provider>
  );
};

export const useParkContext = () => {
  const context = useContext(ParkContext);
  if (!context) {
    throw new Error('useParkContext must be used within a ParkProvider');
  }
  return context;
};
