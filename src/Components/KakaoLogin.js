import React, { useState } from "react";
import { View, Dimensions, TouchableOpacity,} from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

<<<<<<< HEAD
const { height, width } = Dimensions.get("window");
=======
const STORAGE_KEY = "@login_id";
>>>>>>> 02c0baf41976f8ed0a3318e8786dfb02ed98d051

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
const API_KEY = "2488a8ac518d2e78a0b20d947d538554";
const Redirect_URI = "https://auth.expo.io/@htj7425/Nine";

const STORAGE_KEY = "@login_id";

export default function KakaoLogin({ navigation }) {
  const [press, setpress] = useState(0);

  const change = () => {
    setpress(1);
  }
  function LogInProgress(data) {
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
  }

  // 토큰 요청 함수
  const requestToken = async (request_code) => {
    var Access_Token = "none";
    var request_token_url = "https://kauth.kakao.com/oauth/token";

    axios({
      method: "post",
      url: request_token_url,
      params: {
        grant_type: "authorization_code",
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
        console.log("error", error);
      });
  };

  var user_id;
  //  정보 조회 함수
  async function requestUserInfo(Access_Token) {
    axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${Access_Token}`,
      },
    })
      .then(async (response) => {
        //console.log("token response:", response);

<<<<<<< HEAD
        user_id = response.data.id;
        var user_ninkname = response.data.kakao_account.profile.nickname;
        var user_image = response.data.kakao_account.profile.profile_image_url;
        console.log("user_id: ", user_id);
        console.log("user_nickname: ", user_ninkname);
        console.log("user_image", user_image);
=======
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(response.data.id)
        );
        navigation.navigate("Main_Home");
>>>>>>> 02c0baf41976f8ed0a3318e8786dfb02ed98d051
      })
      .catch(function (error) {
        console.log("error", error);
      });
      await AsyncStorage.setItem(STORAGE_KEY, useInfo.id);
      navigation.navigate("Main_Home");
  }

<<<<<<< HEAD
  /* asyncstorage 에 토큰 저장
  const storeData = async (returnValue) => {
    try {
      await AsyncStorage.setItem("userAccessToken", returnValue);
    } catch (error) {}
  };*/
=======
>>>>>>> 02c0baf41976f8ed0a3318e8786dfb02ed98d051
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => { change(); }}>
        <Image source = {require("../../assets/kakao_login.png")}/>
      </TouchableOpacity>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30, flex: 1, width: width, height: height }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${API_KEY}&redirect_uri=${Redirect_URI}`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled
        onMessage={(event) => {
          LogInProgress(event.nativeEvent["url"]);
        }}
        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
};