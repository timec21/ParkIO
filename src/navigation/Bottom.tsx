import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MapScreen from '../screens/MapScreen/MapScreen';
import FavoriteScreen from '../screens/FavoriteScreen/FavoriteScreen';
import NotesScreen from '../screens/NotesScreen/NotesScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Map':
              iconName = 'map';
              break;
            case 'Favorites':
              iconName = 'heart';
              break;
            case 'Notes':
              iconName = 'note';
              break;
            case 'Profile':
              iconName = 'account';
              break;
            case 'Details': // İkon ekleniyor
              iconName = 'information-outline';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#EA80FC',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          backgroundColor: '#1A1F1E',
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Favorites" component={FavoriteScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomMenu;
