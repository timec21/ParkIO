import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Searchbar, Divider, Button } from 'react-native-paper';
import { useParkContext } from '../../ParkContext';

const HomeScreen = ({ navigation }: any) => {
  const { parks } = useParkContext();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredParks = parks.filter((park) =>
    park.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPark = ({ item }: any) => {
    const leftComponent = ({ size }: { size: number }) => (
      <Image
        resizeMode="cover"
        style={{ width: size, height: size, borderRadius: size / 2 }}
        source={{ uri: item.image }}
      />
    );

    return (
      <Card
        style={styles.card}
        onPress={() => navigation.navigate('Details', { parkId: item.id })}
      >
        <Card.Title
          title={item.name}
          subtitle={item.description}
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubtitle}
          left={leftComponent}
        />
        <Card.Cover source={{ uri: item.image }} style={styles.cardCover} />
        <Card.Actions>
        <Button
          style={styles.btn}
          labelStyle={{ color: '#fff' }}
          onPress={() => navigation.navigate('Details', { parkId: item.id })}
        >
          İncele
        </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Park Ara"
        value={searchQuery}
        onChangeText={(query) => setSearchQuery(query)}
        style={styles.searchbar}
      />
      <Divider style={styles.divider} />
      <FlatList
        data={filteredParks}
        keyExtractor={(item) => item.id}
        renderItem={renderPark}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',
    padding: 16,
    paddingTop:50,
  },
  searchbar: {
    marginBottom: 16,
  },
  btn: {
    backgroundColor: '#EA80FC',
  },

  divider: {
    height: 1,
    backgroundColor: '#484848',
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#303134'
  },
  cardCover: {
    margin: 10,
    borderRadius: 10,
    height: 200,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#A1A1A1',
  },
});

export default HomeScreen;
