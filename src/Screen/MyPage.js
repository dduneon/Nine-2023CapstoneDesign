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
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { folders } from "../Data/data";


const MYNAME = "@name";
const MYPICTURE = "@login_image";
const MYPATH = "@path";
const STORAGE_KEY = "@login_id";

const { height, width } = Dimensions.get("window");

function My({ navigation }) {
  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [image_have, setImage_have] = useState(0);
  const [image_url, setImageUrl] = useState("");
  const [num, setNum] = useState(folders.length); // 지금까지 질문한 문제 수
  const [path, setPath] = useState("");
  const onChangeName = (payload) => setName(payload);

  useEffect(() => {
    name_check();
    picture_check();
    login_path();
  }, []);

  const name_check = async () => {
    const check_name = await AsyncStorage.getItem(MYNAME);
    if (check_name === null) {
      const initial_name =
        "Nine" + JSON.stringify(Math.floor(Math.random() * 100000));
      setName(initial_name);
      setTempName(initial_name);
      await AsyncStorage.setItem(MYNAME, JSON.stringify(initial_name));
    } else {
      setName(JSON.parse(check_name));
      setTempName(JSON.parse(check_name));
    }
  };

  const picture_check = async () => {
    const image_url = await AsyncStorage.getItem(MYPICTURE);
    if (image_url === null) {
      setImage_have(0);
      return;
    } else {
      setImage_have(1);
      setImageUrl(JSON.parse(image_url));
    }
  };

  const login_path = async () => {
    const id = await AsyncStorage.getItem(MYPATH);
    if (id === "K") {
      setPath("카카오");
    } else if (id === "N") {
      setPath("네이버");
    } else if (id === "G") {
      setPath("구글");
    }
  };

  const change_name = async () => {
    if (name === "") {
      setName(tempName);
      return;
    }
    setTempName(name);
    await AsyncStorage.setItem(MYNAME, JSON.stringify(name));
  };

  const Logout = async () => {
    const id = await AsyncStorage.getItem(MYPATH);
    if (id === "K") {
      setPath("카카오");
    } else if (id === "N") {
      setPath("네이버");
    } else if (id === "G") {
      setPath("구글");
    }
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      navigation.navigate("Login");
    } catch (error) {}
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.user_container}>
        <TouchableOpacity>
          {image_have === 1 ? (
            <Image
              src={image_url}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <Image
              source={require("../../assets/MyPage_User_icon.png")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
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
        
        <Text style={styles.problem_text}> 로그인 경로는 {path} 입니다! </Text>
        <View style={styles.dividing_line}><View style={styles.text_container}/></View>
        <Text style={styles.problem_text}>
          {" "}
          지금까지 질문한 문제: {num} 개에요!
        </Text>
        <View style={styles.dividing_line}><View style={styles.text_container}/></View>
        <View>
          <TouchableOpacity style={{flexDirection: "row",justifyContent:"space-between"}}
          onPress = {() => navigation.navigate("Information")}>
            <Text style={styles.problem_text}> 앱 정보 확인하기</Text>
            <AntDesign style={{alignSelf: "center", marginRight: 15}} name="right" size={24} color="black" />
          </TouchableOpacity>
          </View>
          <View style={styles.dividing_line}><View style={styles.text_container}/></View>
        
       
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 15,
        }}
      >
        <TouchableOpacity onPress={Logout}>
          <Text style={{ marginRight: 30 }}>로그아웃하기</Text>
        </TouchableOpacity>
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
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  info_container: {
    marginTop: 60,
    flex: 9,
    borderTopWidth: 2,
    borderColor: "lightgrey",
    width: width,
  },
  text_container: {
    marginTop: 5,
  },
  problem_text: {
    margin: 15,
    fontFamily: "SUITE-Medium",
    fontSize: 20,
    alignSelf: "flex-start"
  },
  dividing_line: {
    margin: 5,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    width: width,
  }
});

export default My;