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

function TextPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 50 }}> 텍스트 직접 입력할 페이지 </Text>
    </View>
  );
}

export default TextPage;
