import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getCurrentLocation } from '../../services/locationService';
import { startAccelerometer, stopAccelerometer } from '../../services/motionService';
interface Park {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [nearbyParks, setNearbyParks] = useState<Park[]>([]);
  const [movement, setMovement] = useState<{ x: number; y: number; z: number } | null>(null);
  let accelerometerSubscription: { remove: () => void } | null = null;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);

        // Simülasyon: Yakındaki parkları filtrele
        const parks: Park[] = [
          { id: '1', name: 'Park 1', latitude: location.latitude + 0.01, longitude: location.longitude + 0.01 },
          { id: '2', name: 'Park 2', latitude: location.latitude - 0.01, longitude: location.longitude - 0.01 },
        ];
        setNearbyParks(parks);
      } catch (error) {
        Alert.alert('Hata', 'Konum alınamadı.');
      }
    };

    fetchLocation();

    accelerometerSubscription = startAccelerometer((data) => {
      setMovement(data);
    });

    return () => {
      stopAccelerometer(accelerometerSubscription!);
    };
  }, []);

  if (!currentLocation) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Konum alınıyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {nearbyParks.map((park) => (
          <Marker
            key={park.id}
            coordinate={{
              latitude: park.latitude,
              longitude: park.longitude,
            }}
            title={park.name}
          />
        ))}
      </MapView>

      {movement && (
        <View style={styles.movementContainer}>
          <Text>Hareket: X={movement.x.toFixed(2)}, Y={movement.y.toFixed(2)}, Z={movement.z.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

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
  movementContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
  },
});

export default MapScreen;
