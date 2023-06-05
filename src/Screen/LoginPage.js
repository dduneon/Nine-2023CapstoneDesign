import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import KakaoLogin from '../Components/KakaoLogin';
import GoogleLogin from '../Components/GoogleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NaverLogin from '../Components/NaverLogin';

const STORAGE_KEY = '@login_id';

const { height, width } = Dimensions.get('window');

function Login({ navigation }) {
  useEffect(() => {
    //deleteData('@login_image')
    fetchData();
  }, []);
  /*
  const deleteData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
    }
  };
*/
  const fetchData = async () => {
    const useInfo = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(useInfo);
    if (useInfo != null) {
      navigation.navigate('Main_Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerItems}>
        <Image
          source={require('../../assets/Nine_image.png')}
          style={styles.Nine_image}
        />
      </View>
      <View style={styles.loginItems}>
        <Text>SNS 계정으로 간편 가입하기</Text>
        <View style={styles.loginIcons}>
          <TouchableOpacity
            style={styles.icon_kakao}
            activeOpacity="0.6"
            onPress={() => navigation.navigate('KakaoLogin')}
          >
            <Image
              style={{ resizeMode: 'contain' }}
              source={require('../../assets/icons/icon_kakao.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity="0.6">
            <NaverLogin style={styles.icon_naver} navigation={navigation} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity="0.6">
            <GoogleLogin style={styles.icon_google} navigation={navigation} />
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerItems: { flex: 1, marginLeft: 20, marginTop: 40 },
  Nine_image: {
    flex: 1,
    resizeMode: 'contain',
    width: '70%',
  },
  loginItems: { flex: 1, width: '100%' },
  loginIcons: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon_kakao: { marginLeft: 50 },
  icon_naver: {},
  icon_google: {},
});

export default Login;
