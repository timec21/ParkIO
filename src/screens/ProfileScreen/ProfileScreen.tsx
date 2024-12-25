import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Divider, Avatar } from 'react-native-paper';

const ProfileScreen = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://i.pravatar.cc/300',
  };

  return (
    <View style={styles.container}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        <Avatar.Image size={100} source={{ uri: userInfo.profilePicture }} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <Divider style={styles.divider} />

      {/* Aksiyonlar */}
      <View style={styles.actions}>
        <Button
          mode="contained"
          style={styles.actionButton}
          labelStyle={styles.actionButtonLabel}
          onPress={() => console.log('Profili Düzenle')}
        >
          Profili Düzenle
        </Button>
        <Button
          mode="outlined"
          style={styles.actionButtonOutlined}
          labelStyle={styles.actionButtonOutlinedLabel}
          onPress={() => console.log('Şifreyi Güncelle')}
        >
          Şifreyi Güncelle
        </Button>
        <Button
          mode="text"
          style={styles.actionButtonText}
          labelStyle={styles.actionButtonTextLabel}
          onPress={() => console.log('Çıkış Yapıldı')}
        >
          Çıkış Yap
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  actionButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202124',
  },
  actionButtonOutlined: {
    borderColor: '#EA80FC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  actionButtonOutlinedLabel: {
    fontSize: 16,
    color: '#EA80FC',
  },
  actionButtonText: {
    alignSelf: 'center',
  },
  actionButtonTextLabel: {
    fontSize: 16,
    color: '#EA80FC',
  },
});

export default ProfileScreen;
