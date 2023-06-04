import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Image, width, height } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@login_id';
const MYPICTURE = '@login_image';
const MYNAME = '@name';
const MYPATH = '@path';

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const API_KEY = '2488a8ac518d2e78a0b20d947d538554';
const Redirect_URI = 'https://auth.expo.io/@htj7425/Nine';

export default function KakaoLogin({ navigation }) {
  const [press, setpress] = useState(0);

  const change = () => {
    setpress(1);
  };
  function LogInProgress(data) {
    console.log('data: ', data);
    const exp = 'code=';
    var condition = data.indexOf(exp);
    console.log('condition: ', condition);
    if (condition != -1) {
      var request_code = data.substring(condition + exp.length);
      console.log('access code :: ' + request_code);
      // 토큰값 받기
      requestToken(request_code);
    }
  }

  // 토큰 요청 함수
  const requestToken = async (request_code) => {
    var Access_Token = 'none';
    var request_token_url = 'https://kauth.kakao.com/oauth/token';

    axios({
      method: 'post',
      url: request_token_url,
      params: {
        grant_type: 'authorization_code',
        client_id: API_KEY,
        redirect_uri: Redirect_URI,
        code: request_code,
      },
    })
      .then(function (response) {
        Access_Token = response.data.access_token;
        //console.log("Access_Token: ", Access_Token);
        requestUserInfo(Access_Token);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  var user_id;
  //  정보 조회 함수
  async function requestUserInfo(Access_Token) {
    axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${Access_Token}`,
      },
    })
      .then(async (response) => {
        // 로그인 고유 id 저장
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(response.data.id)
        );
        // 사용자 이름 저장
        await AsyncStorage.setItem(
          MYNAME,
          JSON.stringify(response.data.properties.nickname)
        );
        // 사용자 Image 저장
        await AsyncStorage.setItem(
          MYPICTURE,
          JSON.stringify(response.data.properties.profile_image)
        );
        await AsyncStorage.setItem(MYPATH,"K");
        navigation.navigate('Main_Home');
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30, flex: 1, width: width, height: height }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${Redirect_URI}`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled
        onMessage={(event) => {
          LogInProgress(event.nativeEvent['url']);
        }}
        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
}
