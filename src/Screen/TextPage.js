import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  View,
  StyleSheet,
  Text,
  Button,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  Alert,
  SafeAreaView,
  Keyboard,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import callGoogleVisionAsync from "../Components/OcrFunction";

function TextPage({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [textData, setTextData] = useState("");
  const onChangeText = (payload) => setTextData(payload);

  useEffect(() => {
    loadFonts();
    fetchData();
  }, []);

  const fetchData = async () => {
    if (otherParam != "") {
      const responseData = await callGoogleVisionAsync(otherParam);
      setTextData(responseData.text);
      setMainText("나인이 이미지로\n문제를 구성해 보았어요");
    } else {
      setMainText("문제를 입력해주세요");
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

const styles = StyleSheet.create({
  button: {
    width: "50%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily: "SUITE-Medium",
  },
});

export default TextPage;
