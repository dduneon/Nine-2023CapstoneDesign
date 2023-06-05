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
        <Text style={{ fontFamily: 'SUITE-Medium', fontSize: 15 }}>
          SNS 계정으로 간편 가입하기
        </Text>
        <View style={styles.loginIcons}>
          <TouchableOpacity
            style={styles.icon_kakao}
            activeOpacity="0.6"
            onPress={() => navigation.navigate('KakaoLogin')}
          >
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                width: '100%',
                height: '100%',
              }}
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
  container: { flex: 1, width: '100%', backgroundColor: 'green' },
  headerItems: {
    width: '100%',
    flex: 2,
    backgroundColor: 'yellow',
  },
  Nine_image: {
    resizeMode: 'contain',
    width: '70%',
  },
  loginItems: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  loginIcons: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon_kakao: {
    marginRight: 20,
    height: '20%',
    width: '20%',
    backgroundColor: 'blue',
  },
  icon_naver: {
    marginRight: 20,
    height: '20%',
    width: '20%',
    backgroundColor: 'orange',
  },
  icon_google: {},
});

export default Login;
