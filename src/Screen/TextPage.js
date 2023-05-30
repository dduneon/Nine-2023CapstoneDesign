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
  SafeAreaView,
  Keyboard,
} from "react-native";
import callGoogleVisionAsync from "../Components/OcrFunction";

function TextPage({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [textData, setTextData] = useState("");
  const onChangeText = (payload) => setTextData(payload);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (otherParam != "") {
      setTextData("Loading ... ");
      const responseData = await callGoogleVisionAsync(otherParam);
      setTextData(responseData.text);
      console.log(responseData.text);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <ScrollView style={{ flex: 1, borderWidth: 1, width: "100%" }}>
        <TextInput
          onChangeText={onChangeText}
          returnKeyType="done"
          value={textData}
          multiline={true}
          placeholder="문제를 입력해주세요."
        />
      </ScrollView>
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      ></TouchableOpacity>
    </SafeAreaView>
  );
}

export default TextPage;
