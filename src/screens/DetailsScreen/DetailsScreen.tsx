import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { Text, Button, Divider, Chip, IconButton } from 'react-native-paper';
import { useParkContext } from '../../ParkContext';

const DetailsScreen = ({ route, navigation }: any) => {
  const { parkId } = route.params;
  const { getParkDetails, addFavorite } = useParkContext();

  const park = getParkDetails(parkId);

  if (!park) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.errorText}>Park bulunamadı.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Başlık ve Geri Butonu */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          iconColor="#FFFFFF"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Text style={styles.headerTitle}>{park.name}</Text>
      </View>

      {/* Park Görseli */}
      <Image source={{ uri: park.image }} style={styles.image} />

      {/* Park Bilgileri */}
      <Text style={styles.title}>{park.name}</Text>
      <Text style={styles.description}>{park.description}</Text>

      <Divider style={styles.divider} />

      {/* Tesisler */}
      <Text style={styles.sectionTitle}>Tesisler:</Text>
      <View style={styles.facilitiesContainer}>
        {park.facilities?.map((facility, index) => (
          <Chip key={index} style={styles.chip}>
            {facility}
          </Chip>
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* Aksiyonlar */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => addFavorite(park)}
          icon="heart"
        >
          Favorilere Ekle
        </Button>
        <Button
          mode="outlined"
          style={styles.outlinedButton}
          icon="map-marker"
          onPress={() => console.log('Haritada Gösterildi')}
        >
          Haritada Göster
        </Button>
        <Button
          mode="text"
          labelStyle={{color: '#EA80FC'}}
          icon="home"
          onPress={() => navigation.navigate('Home')}
        >
          Anasayfaya Dön
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 8,
    backgroundColor: '#303134',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#D1D1D1',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#484848',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#303134',
    color: '#FFFFFF',
    marginRight: 8,
    marginBottom: 8,
  },
  actions: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#EA80FC',
    borderRadius: 8,
    marginBottom: 16,
  },
  outlinedButton: {
    borderColor: '#EA80FC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
 
  errorText: {
    fontSize: 18,
    color: '#EA80FC',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default DetailsScreen;
