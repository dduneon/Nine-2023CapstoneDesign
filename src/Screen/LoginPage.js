import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import KakaoLogin from "../Components/KakaoLogin";
import GoogleLogin from "../Components/GoogleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NaverLogin from "../Components/NaverLogin";

const STORAGE_KEY = "@login_id";

const { height, width } = Dimensions.get("window");

function Login({ navigation }) {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const useInfo = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(useInfo);
    if (useInfo != null) {
      //navigation.navigate("Main_Home");
    }
  };

  return (
    <View style={styles.LoginScreen}>
      <Image
        source={require("../../assets/Nine_image.png")}
        style={styles.Nine_image}
      />

      <View style={{ alignContent: "center" }}>
        <TouchableOpacity
          activeOpacity="0.6"
          onPress={() => navigation.navigate("KakaoLogin")}
        >
          <Image
            source={require("../../assets/kakao_login.png")}
            style={styles.kakao_image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity="0.6"
        >
          <NaverLogin style={styles.naver_image} navigation={navigation}/>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity="0.6">
          <GoogleLogin style={styles.google_image} navigation={navigation} />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  LoginScreen: {
    flex: 1,
  },
  Nine_image: {
    width: "80%",
    marginLeft: 35,
    resizeMode: "contain",
  },
  kakao_image: {
    width: width - 65,
    marginLeft: 45,
    resizeMode: "contain",
  },
  naver_image: {
    width: width - 234,
    marginLeft: 130,
    marginTop: 60,
    resizeMode: "contain",
  },
  google_image: {
    width: width - 65,
    marginLeft: 45,
    marginTop: 60,
    resizeMode: "contain",
  },
});

export default Login;
