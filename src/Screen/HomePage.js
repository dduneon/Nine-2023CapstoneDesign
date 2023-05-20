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
import { Fontisto } from "@expo/vector-icons";

function Home({ navigation }) {
  return (
    <View>
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

export default Home;
