import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Button, Text, ActivityIndicator } from 'react-native-paper';
import { fetchFavoritesFromAPI, removeFavoriteFromAPI, Favorite } from '../../services/api';

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]); // Favoriler listesi
  const [loading, setLoading] = useState<boolean>(true); // Yükleme durumu
  const [error, setError] = useState<string | null>(null); // Hata mesajı

  // Favorileri yükle
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFavoritesFromAPI();
      setFavorites(data);
    } catch (err) {
      setError('Favoriler yüklenirken bir hata oluştu.');
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      await removeFavoriteFromAPI(id);
      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (err) {
      setError('Favori silinirken bir hata oluştu.');
      console.error('Error removing favorite:', err);
    }
  };

  const renderFavorite = ({ item }: { item: Favorite }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          style={styles.btn}
          onPress={() => handleRemoveFavorite(item.id)}
        >
          Favorilerden Çıkar
        </Button>
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size="large" color="#EA80FC" />
        <Text style={styles.loadingText}>Favoriler yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={loadFavorites} style={styles.retryButton}>
          Yeniden Dene
        </Button>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.bg}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={renderFavorite}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.emptyText}>Henüz bir favori eklenmedi.</Text>}
    />
  );
};

const styles = StyleSheet.create({
  bg: { backgroundColor: '#202124', paddingTop: 50 },
  list: { padding: 16 },
  card: { marginBottom: 16, backgroundColor: '#303134' },
  cardImage: { height: 150 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  btn: { backgroundColor: '#EA80FC' },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202124',
  },
  loadingText: { color: '#ffffff', fontSize: 16, marginTop: 16 },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202124',
  },
  errorText: { color: '#EA80FC', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#EA80FC' },
  emptyText: {
    color: '#A1A1A1',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FavoriteScreen;