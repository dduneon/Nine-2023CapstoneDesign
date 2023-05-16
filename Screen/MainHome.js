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

import HomeHeader from "../Components/HomeHeader";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <HomeHeader />
      </View>
      <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
        <TouchableOpacity style={styles.homeMenu}>
          <View style={styles.homeMenu_detail}>
            <Text style={styles.homeMenu_Text}>오답노트</Text>
            <Fontisto name="arrow-right-l" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.homeMenu, marginTop: 30 }}>
          <View style={styles.homeMenu_detail}>
            <Text style={styles.homeMenu_Text}>실력 다지기</Text>
            <Fontisto name="arrow-right-l" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
function CalendarScreen(navigation) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 50 }}>공부 일정 화면</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainHome({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: "홈",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerShown: false,
          title: "공부 일정",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
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
