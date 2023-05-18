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
import { Ionicons } from "@expo/vector-icons";

import HomeHeader from "../Components/HomeHeader";
import Home from "../Screen/Home";
import TestPage from "../Screen/TestPage";
import Select from "../Components/Select";

function HomeScreen({ navigation }) {
  const [tab, setTab] = useState(true);
  const [page, setPage] = useState(<Home />);

  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <HomeHeader />
      </View>

      <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
        {page}
      </View>

      <Select navigation={navigation} />

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.tabMenu}
            onPress={() => {
              setTab(true);
              setPage(<Home />);
            }}
          >
            {tab ? (
              <Ionicons name="home-sharp" size={24} color="#445CE9" />
            ) : (
              <Ionicons name="home-outline" size={24} color="#445CE9" />
            )}
            <Text style={tab ? styles.tabActiveText : styles.tabInactiveText}>
              HOME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={70} color="#445CE9" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabMenu}
            onPress={() => {
              setTab(false);
              setPage(<TestPage />);
            }}
          >
            {!tab ? (
              <Ionicons name="person-sharp" size={24} color="#445CE9" />
            ) : (
              <Ionicons name="person-outline" size={24} color="#445CE9" />
            )}
            <Text style={!tab ? styles.tabActiveText : styles.tabInactiveText}>
              MY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
/*
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
        <BottomTab navigation={navigation} tab={false} />
      </View>
    </View>
  );
}*/

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
  boundary: {},
  bottomTab: {
    flexDirection: "row",
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabMenu: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  tabAddBtn: {
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowColor: 5,
    shadowOpacity: 0.5,
  },
  tabActiveText: {
    color: "blue",
    fontWeight: "bold",
  },
  tabInactiveText: {
    color: "blue",
    fontWeight: "normal",
  },
});

export default MainHome;
