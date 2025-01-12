import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, View, Alert, Modal, TextInput } from 'react-native';
import { Text, Button, Divider, Chip, IconButton } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import { addFavoriteToAPI, Favorite } from '../../services/api';
import { useParkContext } from '../../ParkContext'; // <--- Önemli

const DetailsScreen = ({ route, navigation }: any) => {
  const { parkId } = route.params;

  const { getParkDetails } = useParkContext();

  const park = getParkDetails(parkId);

  if (!park) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Park verisi bulunamadı.
        </Text>
        <Button onPress={() => navigation.goBack()}>Geri Dön</Button>
      </View>
    );
  }

  const [note, setNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddFavorite = async () => {
    const favorite: Favorite = {
      id: park.id,
      name: park.name,
      image: park.image,
      description: park.description,
      facilities: park.facilities,
      note,
    };

    try {
      await addFavoriteToAPI(favorite);
      console.log('Favorilere eklendi:', favorite.name);
      setModalVisible(false);
      Alert.alert('Başarılı', 'Favorilere başarıyla eklendi.');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      Alert.alert('Hata', 'Favorilere eklenirken bir sorun oluştu.');
    }
  };

  const handleDownloadImage = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${park.name.replace(/\s/g, '_')}.jpg`;
      const downloadResult = await FileSystem.downloadAsync(park.image, fileUri);
      Alert.alert('İndirme Başarılı', `Resim şu konuma kaydedildi:\n${downloadResult.uri}`);
      console.log('Downloaded to:', downloadResult.uri);
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Hata', 'Resim indirilirken bir sorun oluştu.');
    }
  };

  return (
    <>
      {/* Not Ekleme Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Not Ekle</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Notunuzu yazın"
              value={note}
              onChangeText={setNote}
              multiline
            />
            <Button mode="contained" onPress={handleAddFavorite} style={styles.modalButton}>
              Kaydet
            </Button>
            <Button mode="text" onPress={() => setModalVisible(false)}>
              İptal
            </Button>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
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

        <Image source={{ uri: park.image }} style={styles.image} />
        <Text style={styles.title}>{park.name}</Text>
        <Text style={styles.description}>{park.description}</Text>

        <Divider style={styles.divider} />

        <Text style={styles.sectionTitle}>Tesisler:</Text>
        <View style={styles.facilitiesContainer}>
          {park.facilities?.map((facility: string, index: number) => (
            <Chip key={index} style={styles.chip}>
              {facility}
            </Chip>
          ))}
        </View>

        <Divider style={styles.divider} />

        <View style={styles.actions}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => setModalVisible(true)}
            icon="heart"
          >
            Favorilere Ekle
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleDownloadImage}
            icon="download"
          >
            Resmi İndir
          </Button>
          <Button
            mode="outlined"
            style={styles.outlinedButton}
            icon="map-marker"
            onPress={() => console.log('Haritada Göster')}
          >
            Haritada Göster
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#202124', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backButton: { marginRight: 8, backgroundColor: '#303134' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  image: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  description: { fontSize: 16, color: '#D1D1D1', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#484848', marginVertical: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  facilitiesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  chip: { backgroundColor: '#303134', color: '#FFFFFF', marginRight: 8, marginBottom: 8 },
  actions: { marginTop: 16 },
  button: { backgroundColor: '#EA80FC', borderRadius: 8, marginBottom: 16 },
  outlinedButton: { borderColor: '#EA80FC', borderWidth: 1, borderRadius: 8, marginBottom: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  textInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
    height: 80,
  },
  modalButton: { marginBottom: 10, backgroundColor: '#EA80FC' },
});

export default DetailsScreen;
