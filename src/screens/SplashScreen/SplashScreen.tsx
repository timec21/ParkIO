import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { API_URL, useAuth } from '../../AuthContext';
import axios from 'axios';
const SplashScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister } = useAuth();

  useEffect(() => {
    const testCall = async () => {
      const result = await axios.get(`${API_URL}/users`);

      console.log("testcall Result:", result)
    }

    testCall();
  } ,[])

  const handleLogin = async () => {
    const result = await onLogin?.(email, password);
    if (result?.error) {
      Alert.alert('Error', result.msg);
    } else {
      Alert.alert('Success', 'Login successful!');
    }
  };

  const handleRegister = async () => {
    const result = await onRegister?.(email, password);
    if (result?.error) {
      console.log('Registration failed:', result.msg);
    } else {
      console.log('Registration successful');
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        <Animatable.Text
          animation="bounceIn"
          duration={1500}
          style={styles.pText}
        >
          P
        </Animatable.Text>

        <Animatable.View animation="fadeInUp" duration={1200} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A1A1A1"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#A1A1A1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            style={[styles.btn, styles.loginBtn]}
            mode="contained"
            onPress={handleLogin}
          >
            Giriş Yap
          </Button>

          <Button
            style={[styles.btn, styles.registerBtn]}
            mode="outlined"
            onPress={handleRegister}
          >
            Kayıt Ol
          </Button>
        </Animatable.View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#303134',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#FFFFFF',
  },
  btn: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  loginBtn: {
    backgroundColor: '#EA80FC',
  },
  registerBtn: {
    borderColor: '#EA80FC',
    borderWidth: 2,
  },
});

export default SplashScreen;
