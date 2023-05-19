import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

function MyPage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 50 }}> My Page </Text>
      <Text> 나중에 여기에 사용자 정보 표시 </Text>
    </View>
  );
}

export default MyPage;
