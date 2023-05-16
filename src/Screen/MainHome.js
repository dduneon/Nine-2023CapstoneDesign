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

import BottomTab from "../Components/BottomTab";
import HomeHeader from "../Components/HomeHeader";
import Home from "../Screen/Home";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <HomeHeader />
      </View>
      <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
        <Home />
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

function MyPageScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <HomeHeader />
      </View>
      <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
        <Text>My Page Screen</Text>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <BottomTab navigation={navigation} />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainHome({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  homeMenu: {
    backgroundColor: "#CCCCCC",
    borderRadius: "15%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
  },
  homeMenu_detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeMenu_Text: {
    fontSize: 18,
  },
});

export default MainHome;
