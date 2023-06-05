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
        <View style={styles.headerLogo}>
          <Text style={{ fontFamily: 'SUITE-Medium', fontSize: 28 }}>
            찍고, 물어보면, 알려주는{'\n'}나만의 인공지능 학습 플랫폼
          </Text>
          <Image
            source={require('../../assets/icons/icon_nine.png')}
            style={styles.icon_nine}
          />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>

      <View style={styles.loginItems}>
        <Text style={{ fontFamily: 'SUITE-Medium', fontSize: 18 }}>
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

          <NaverLogin style={styles.icon_naver} navigation={navigation} />
          <GoogleLogin style={styles.icon_google} navigation={navigation} />
        </View>
        <Text
          style={{
            marginBottom: 20,
            fontFamily: 'SUITE-Light',
            fontSize: 13,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          회원가입 없이 소셜 계정을 통해 바로 이용 가능하며 첫 로그인시 이용약관
          및 개인정보처리방침 동의로 간주됩니다.
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  headerItems: {
    flex: 2,
    flexDirection: 'column',
  },
  headerLogo: {
    flex: 3,
    paddingLeft: 30,
    paddingTop: 90,
    alignItems: 'flex-start',
  },
  icon_nine: {
    marginTop: 10,
    resizeMode: 'contain',
    width: '55%',
    height: '25%',
  },
  loginItems: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loginIcons: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon_kakao: {
    height: '40%',
    width: '21%',
  },
});

export default Login;
