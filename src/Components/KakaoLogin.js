import React from 'react';
import { View } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

// other import settings...

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const API_KEY = "2488a8ac518d2e78a0b20d947d538554";
const Redirect_URI = "https://auth.expo.io/@seonghyeon_lee/KaKaoLogin";


const KakaoLogin = ({ navigation }) => {

 

    function LogInProgress(data) {

        // access code는 url에 붙어 장황하게 날아온다.
        // substringd으로 url에서 code=뒤를 substring하면 된다.
        /*
        var client_key = "none";
        var Data = "none";
        var code = "none";
        try{
          const response = axios.get(data, {
            params:{
              client_id: client_key,
              redirect_uri: Data,
              response_type: code,
            },
          });
          console.log(response);
        } catch(error){
            console.log(error);
        };
        */
       /*
        var client_key = "none";
        var Data = "none";
        var code = "none";
        axios({
          method: "GET",
          url: data,
          params: {
              client_id: client_key,
              redirect_uri: Data,
              response_type: code,
          },
      }).then(function (response) {
          console.log(response);
          const exp = "code=";
          var condition = data.indexOf(exp);
          console.log(condition);
      }).catch(function (error) {
          console.log('error', error);
      });*/
      
        console.log("data: ", data);
        const exp = "code=";
        var condition = data.indexOf(exp);
        console.log("condition: ", condition);
        if (condition != -1) {
            var request_code = data.substring(condition + exp.length);
            console.log("access code :: " + request_code);
            // 토큰값 받기
            requestToken(request_code);
        }
    };

// 토큰 요청 함수
    const requestToken = async (request_code) => {
        var Access_Token = "none";
        var request_token_url = "https://kauth.kakao.com/oauth/token";

        axios({
            method: "post",
            url: request_token_url,
            params: {
                grant_type: 'authorization_code',
                client_id: API_KEY,
                redirect_uri: Redirect_URI,
                code: request_code,
            },
        }).then(function (response) {
            Access_Token = response.data.access_token;
            console.log("Access_Token: ", Access_Token);
            requestUserInfo(Access_Token);
        }).catch(function (error) {
            console.log('error', error);
        });
    };

//  정보 조회 함수
    function requestUserInfo(Access_Token) {
      axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization : `Bearer ${Access_Token}`
        },
      }).then((response) => {
        console.log("token response:", response);

        var user_id = response.data.id;
        var user_ninkname = response.data.kakao_account.profile.nickname;
        var user_image = response.data.kakao_account.profile.profile_image_url;
        console.log("user_id: ", user_id);
        console.log("user_nickname: ", user_ninkname);
        console.log("user_image", user_image);
      }).catch(function (error) {
        console.log('error', error);
    });
    }

// asyncstorage 에 토큰 저장
const storeData = async(returnValue) => {
  try{
    await AsyncStorage.setItem('userAccessToken', returnValue);
  }catch(error){

  }
}
    return (
        <View style={{ flex: 1 }}>
            <WebView
                originWhitelist={['*']}
                scalesPageToFit={false}
                style={{ marginTop: 30 }}
                source={{ uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${Redirect_URI}` }}
                injectedJavaScript={runFirst}
                javaScriptEnabled
                onMessage = {(event) => { LogInProgress(event.nativeEvent["url"]); }}
            // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
            />
        </View>
    );
};

export default KakaoLogin;