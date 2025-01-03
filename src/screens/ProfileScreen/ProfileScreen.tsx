import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Divider, Avatar } from 'react-native-paper';
import { useAuth } from '../../AuthContext';

const ProfileScreen = () => {
  const { authState, onLogout, fetchUser } = useAuth();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUser?.();
        if (userData) {
          setUserInfo(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error during fetchUser call:', error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await onLogout?.();
    Alert.alert('Logout', 'You have successfully logged out.');
  };

  if (!userInfo) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#FFFFFF' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <Avatar.Image size={100} source={{ uri: userInfo.profilePicture }} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.actionButton}
          onPress={() => console.log('Edit Profile')}
        >
          Edit Profile
        </Button>
        <Button
          mode="outlined"
          style={styles.actionButtonOutlined}
          onPress={() => console.log('Update Password')}
        >
          Update Password
        </Button>
        <Button
          mode="text"
          style={styles.actionButtonText}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#202124',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#A1A1A1',
  },
  divider: {
    height: 1,
    backgroundColor: '#484848',
    marginVertical: 16,
  },
  actions: {
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: '#EA80FC',
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButtonOutlined: {
    borderColor: '#EA80FC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButtonText: {
    alignSelf: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202124',
  },
});

export default ProfileScreen;
