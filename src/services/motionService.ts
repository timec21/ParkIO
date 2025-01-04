import { Accelerometer } from 'expo-sensors';

export const startAccelerometer = (callback: (data: { x: number; y: number; z: number }) => void) => {
  Accelerometer.setUpdateInterval(1000); // Her 1 saniyede bir güncelleme
  const subscription = Accelerometer.addListener(callback);
  return subscription;
};

export const stopAccelerometer = (subscription: { remove: () => void }) => {
  subscription?.remove();
};
