import React, { createContext, useState, useContext } from 'react';

interface Park {
  id: string;
  name: string;
  distance: string;
  image: string;
  description?: string;
  facilities?: string[];
}

interface ParkContextType {
  parks: Park[];
  favoriteParks: Park[];
  addFavorite: (park: Park) => void;
  removeFavorite: (parkId: string) => void;
  getParkDetails: (parkId: string) => Park | undefined;
}

const ParkContext = createContext<ParkContextType | undefined>(undefined);

export const ParkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parks] = useState<Park[]>([
    {
      id: '1',
      name: 'Central Park',
      distance: '1.2 km',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg/300px-Global_Citizen_Festival_Central_Park_New_York_City_from_NYonAir_%2815351915006%29.jpg',
      description: 'Central Park is a large urban park in New York City.',
      facilities: ['Playground', 'Walking Path', 'Cycling Track'],
    },
    {
      id: '2',
      name: 'Sunnydale Park',
      distance: '2.5 km',
      image: 'https://www.pitchup.com/images/1/image/upload/s--OHDpDP1j--/c_limit,h_2400,w_3200/e_improve,fl_progressive/q_auto/b_rgb:000,g_south_west,l_pitchup.com_wordmark_white_watermark,o_15/v1/sunnydale-holiday-park/1036430.jpg',
      description: 'A peaceful park for relaxation and outdoor activities.',
      facilities: ['Picnic Area', 'Jogging Path'],
    },

    {
        id: '3',
        name: 'Great Smoky Mountains National Park',
        distance: '3.5 km',
        image: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/swaincountync/Oconaluftee_Valley_Overlook_low_rez_for_web_or_social_8f145a91-e25c-4e1d-ba6b-e719fb510523.jpg',
        description: 'A peaceful park for relaxation and outdoor activities.',
        facilities: ['Picnic Area', 'Jogging Path'],
      },
  ]);

  const [favoriteParks, setFavoriteParks] = useState<Park[]>([]);

  const addFavorite = (park: Park) => {
    setFavoriteParks((prev) => [...prev, park]);
  };

  const removeFavorite = (parkId: string) => {
    setFavoriteParks((prev) => prev.filter((park) => park.id !== parkId));
  };

  const getParkDetails = (parkId: string) => parks.find((park) => park.id === parkId);

  return (
    <ParkContext.Provider
      value={{ parks, favoriteParks, addFavorite, removeFavorite, getParkDetails }}
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
