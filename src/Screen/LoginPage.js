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
      <View style={{ alignItems: "center" }}>
        <Text
          onPress={() => navigation.navigate("Main_Home")}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginTop: -60,
            borderWidth: 3,
            borderRadius: 10,
            fontSize: 25,
            backgroundColor: "yellow",
            overflow: "hidden",
          }}
        >
          {" "}
          카카오 로그인{" "}
        </Text>
        <Text
          onPress={() => navigation.navigate("Main_Home")}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginTop: 35,
            borderWidth: 2,
            borderRadius: 10,
            fontSize: 25,
            backgroundColor: "#04CF5C",
            overflow: "hidden", // borderRadius로 테두리 둥글게 깎았을 때 backgroundColor는 안 깎임 그 때 overFlow를 hidden으로 주면 borderRadius를 넘어가는 부분을 잘라내줌
          }}
        >
          {" "}
          네이버 로그인{" "}
        </Text>
        <Text
          onPress={() => navigation.navigate("Main_Home")}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginTop: 35,
            borderWidth: 3,
            borderRadius: 10,
            fontSize: 25,
            backgroundColor: "lightgrey",
            overflow: "hidden",
          }}
        >
          {"   "}
          구글 로그인{"   "}
        </Text>
        <GoogleLogin />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  Nine_image: {
    width: "80%",
    marginTop: -20,
    marginLeft: 25,
    resizeMode: "contain",
  },
  LoginScreen: {
    flex: 1,
  },
});

export default Login;
