import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@name";

const { height, width } = Dimensions.get("window");
function My() {
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const onChangeName = (payload) => setName(payload);

  useEffect(() => {
    name_check();
  }, []);

  const name_check = async () => {
    const check_name = await AsyncStorage.getItem(STORAGE_KEY);
    if (check_name === null) {
      const initial_name =
        "Nine" + JSON.stringify(Math.floor(Math.random() * 100000));
      setName(initial_name);
      setTempName(initial_name);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initial_name));
    } else {
      setName(JSON.parse(check_name));
      setTempName(JSON.parse(check_name));
    }
  };

  const change_name = async () => {
    if (name === "") {
      setName(tempName);
      return;
    }
    setTempName(name);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(name));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.user_container}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/MyPage_User_icon.png")}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </TouchableOpacity>
        <TextInput
          style={{ fontSize: 20, fontWeight: "bold", marginTop: 15 }}
          onSubmitEditing={change_name}
          onChangeText={onChangeName}
          returnKeyType="done"
          value={name}
        />
      </View>

      <View style={styles.info_container}>
        <View style={styles.text_container}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100,
  },
  info_container: {
    marginTop: 60,
    flex: 10,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    width: width,
  },
  text_container: {
    marginTop: 30,
    justifyContent: "space-evenly",
  },
});

export default My;
