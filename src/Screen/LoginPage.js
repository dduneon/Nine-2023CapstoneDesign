import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import GoogleLogin from "../Components/GoogleLogin";

function Login({ navigation }) {
  return (
    <View style={styles.LoginScreen}>
      <Image
        source={require("../../assets/Nine_image.png")}
        style={styles.Nine_image}
      />

      <View style={{ alignContent: "center" }}>
        <TouchableOpacity
          activeOpacity="0.6"
          onPress={() => navigation.navigate("Main_Home")}
        >
          <Image
            source={require("../../assets/kakao_login.png")}
            style={styles.kakao_image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity="0.6"
          onPress={() => navigation.navigate("Main_Home")}
        >
          <Image
            source={require("../../assets/naver_login.png")}
            style={styles.naver_image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity="0.6"
          onPress={() => navigation.navigate("Main_Home")}
        >
          <Image
            source={require("../../assets/google_login.png")}
            style={styles.google_image}
          />
        </TouchableOpacity>
      </View>
      <GoogleLogin navigation={navigation} />
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
    width: "83%",
    marginLeft: 45,
    resizeMode: "contain",
  },
  naver_image: {
    width: "43%",
    marginLeft: 130,
    marginTop: -20,
    resizeMode: "contain",
  },
  google_image: {
    width: "83%",
    marginLeft: 45,
    marginTop: -10,
    resizeMode: "contain",
  },
});

export default Login;
