import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useParkContext } from '../../ParkContext';

const FavoriteScreen = () => {
  const { favoriteParks, removeFavorite } = useParkContext();

  const renderFavorite = ({ item }: any) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
      <Card.Content>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => removeFavorite(item.id)} 
          style={styles.btn}
          
          >
        Favorilerden Çıkar  
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <FlatList
      style={styles.bg}
      data={favoriteParks}
      keyExtractor={(item) => item.id}
      renderItem={renderFavorite}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16 },
  card: { marginBottom: 16, backgroundColor: '#303134' },
  cardImage: { height: 150 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#ffffff' },
  bg: { backgroundColor: '#202124',paddingTop:50},
  btn: { backgroundColor:'#EA80FC'}
});

export default FavoriteScreen;
