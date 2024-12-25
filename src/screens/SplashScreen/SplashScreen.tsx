import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        {/* "P" Harfi ve Animasyonu */}
        <Animatable.Text
          animation="bounceIn"
          duration={1500}
          style={styles.pText}
        >
          P
        </Animatable.Text>

        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => navigation.navigate('Main')}
        >
          Devam Et
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#202124',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Yarı saydam bir katman
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  pText: {
    fontSize: 200,
    fontWeight: 'bold',
    color: '#EA80FC',
    marginBottom: 40,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#EA80FC',
    marginTop: 20,
  },

});

export default SplashScreen;
