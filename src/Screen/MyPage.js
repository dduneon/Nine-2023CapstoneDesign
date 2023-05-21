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

function My({ userData }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
        Welcome
      </Text>
      <Image
        source={{ uri: userData.picture }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{userData.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default My;
