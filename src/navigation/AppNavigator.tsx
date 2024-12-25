import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import Bottom from './Bottom';
import { ParkProvider } from '../ParkContext';
const Stack = createStackNavigator<StackParamList>();

const AppNavigator = () => (
  <ParkProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="Main" component={Bottom} />
      </Stack.Navigator>
    </NavigationContainer>
  </ParkProvider>
);
export type StackParamList = {
    Splash: undefined; 
    Home: undefined;   
    Details: { parkId: number };
    Favorites: undefined; 
  };


export default AppNavigator;
