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

import HomeHeader from "./Components/HomeHeader";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AnswerScreen({ navigation }) {
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

function LoginScreen({ navigation }) {
  return (
    <View style={styles.HomeScreen}>
      <Image
        source={require("./assets/Nine_image.png")}
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
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

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

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <HomeHeader />
      </View>
      <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
        <TouchableOpacity
          style={styles.homeMenu}
          onPress={() => navigation.navigate("Answer_Note")}
        >
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false, // 상단에 흰색 바가 생기고 HOME이라는 글씨가 쓰여있는데 그거 안 보이게 하는 속성
          }}
        />
        <Stack.Screen
          name="Main_Home"
          component={MainHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Answer_Note"
          component={AnswerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
  },
  Nine_image: {
    width: "80%",
    marginTop: -20,
    marginLeft: 25,
    resizeMode: "contain",
  },
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
