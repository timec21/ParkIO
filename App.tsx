import { useEffect, useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const syncData = async () => {
    console.log('Veriler senkronize ediliyor...');
  };

  useEffect(() => {
    if (isConnected === false) {
      Alert.alert('Bağlantı Kesildi', 'Lütfen internet bağlantınızı kontrol edin.');
    } else if (isConnected) {
      syncData();
    }
  }, [isConnected]);
  return (
     <AppNavigator />
  );
}