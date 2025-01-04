import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

interface Park {
  id: string;
  name: string;       
  image: string;      
  latitude: number;   
  longitude: number;  
  feature1: string;   
  feature2: string;   
}

const MapScreen: React.FC = () => {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get('https://developer.nps.gov/api/v1/parks', {
          params: {
            limit: '30', 
            api_key: '6ON0aNJYGfGuGjhoMwGUzg80gXg95gmpzBjAXGHr', 
          },
        });

        const rawData = response.data.data || [];

        const filteredParks: Park[] = rawData
          .map((parkItem: any) => {
            // latLong: "lat:37.5858662, long:-85.67330523"
            let lat = 0;
            let long = 0;
            if (parkItem.latLong) {
              const [latStr, longStr] = parkItem.latLong
                .replace('lat:', '')
                .replace('long:', '')
                .split(', ');
              lat = parseFloat(latStr);
              long = parseFloat(longStr);
            }

            return {
              id: parkItem.id,
              name: parkItem.fullName,
              image:
                parkItem.images && parkItem.images.length > 0
                  ? parkItem.images[0].url
                  : '',
              latitude: lat,
              longitude: long,
              feature1: parkItem.description, // Örnek olarak description
              feature2: parkItem.designation, // Ya da states / topics / vb.
            };
          })
          // Koordinatı olmayanları (latitude, longitude) hariç tutmak istersen:
          .filter((park:any) => !!park.latitude && !!park.longitude);

        setParks(filteredParks);
      } catch (error) {
        console.error('Error fetching park data:', error);
        Alert.alert('Hata', 'Park verileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#EA80FC" />
      </View>
    );
  }

  if (!loading && parks.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Gösterilecek park bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // <-- Google Maps için
        style={styles.map}
        initialRegion={{
          latitude: parks[0]?.latitude || 37.7749,
          longitude: parks[0]?.longitude || -119.4194,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        {parks.map((park) => (
          <Marker
            key={park.id}
            coordinate={{
              latitude: park.latitude,
              longitude: park.longitude,
            }}
            title={park.name}
            // description içerisinde feature1 & feature2 gibi bilgileri gösterebilirsin
            description={`${park.feature1}\n${park.feature2}`}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
