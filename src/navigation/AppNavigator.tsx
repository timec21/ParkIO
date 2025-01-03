import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import Bottom from './Bottom';
import { ParkProvider } from '../ParkContext';
import { AuthProvider, useAuth } from '../AuthContext';

const Stack = createStackNavigator<StackParamList>();

const AuthNavigator = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState?.authenticated ? (
        <>
          <Stack.Screen name="Main" component={Bottom} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Favorites" component={FavoriteScreen} />
        </>
      ) : (
        <Stack.Screen name="Splash" component={SplashScreen} />
      )}
    </Stack.Navigator>
  );
};

const AppNavigator = () => (
  <AuthProvider>
    <ParkProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </ParkProvider>
  </AuthProvider>
);

export type StackParamList = {
  Splash: undefined;
  Home: undefined;
  Details: { parkId: number };
  Favorites: undefined;
};

export default AppNavigator;
