import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@login_id';

const CLIENT_ID = "Mzd3dap0KLih9pAZ86Qk";
const REDIRECT_URL = "https://auth.expo.io/@seonghyeon_lee/Nine";
const CLIENT_SECRET = "j3iOBc9PWy";
var state_value = "";


export default function NaverLogin({ navigation }) {
  const login = async () => {
    const result = await AuthSession.startAsync({
      authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=1234&redirect_uri=${REDIRECT_URL}`,
    });

    if (result.type === "success") {
      const code = result.params.code;
      state_value = result.params.state;
      console.log(result);
      console.log(code);
      //mutate({
      //  id_token: code,
      //  provider: "NAVER",
      //});
      requestToken(code);
    }
  };

  const requestToken = async (request_code) => {
    var Access_Token = "none";
    var request_token_url = `https://nid.naver.com/oauth2.0/token?`;
    console.log("두 번째 함수 시작");
    axios({
      methos: "post",
      url: request_token_url,
      params: {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: request_code,
        state: state_value,
      },
    })
      .then(function (response) {
        console.log("토큰 받기 함수 결과: ", response);
        Access_Token = response.data.access_token;
        //console.log(Access_Token);
        requestUserInfo(Access_Token);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const requestUserInfo = async (Access_Token) => {
    console.log("세 번쨰 함수 시작");
    axios({
      method: "GET",
      url: "https://openapi.naver.com/v1/nid/me",
      headers: {
        Authorization: `Bearer ${Access_Token}`,
      },
    })
      .then(async (response) => {
        console.log("회원 프로필 조회 결과: ", response);
        await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(response.data.response.id)
          );
        navigation.navigate('Main_Home');
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={login}>
        <Image
          source={require("../../assets/naver_login.png")}
          style={{ width: 300, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});