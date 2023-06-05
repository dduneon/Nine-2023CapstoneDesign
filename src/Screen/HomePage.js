import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

import { getDatabase, ref, onValue, set, query } from "firebase/database";
import { db } from "../firebase/config";
import {
  getJSON,
  getData,
  makeFolder,
  userLoad,
} from "../Functions/DataFunction";

const { height, width } = Dimensions.get("window");

function Home({ navigation }) {
  const [jsonData, setJsonData] = useState(null);
  const [jsonDataState, setJsonDataState] = useState("Loading ...");

  useEffect(() => {
    uploadData();
  }, []);

  useEffect(() => {
    if (jsonData === null) {
      setJsonDataState("문제를 등록해주세요!");
    }
  }, [jsonData]);

  async function uploadData() {
    setJsonData(await getJSON());
  }

  /*
  //DB에서 JSON 데이터를 받음
  function getData() {
    const temp = query(ref(db, "users/" + userId + "/"));
    onValue(temp, (res) => {
      const data = res.toJSON();

      if (data != null) {
        setJSON(data);
      } else {
        setJsonDataState("문제를 등록해주세요!");
      }
    });
  }*/

  /*
  //getData로 부터 DB의 data를 받아와 JSON에 저장
  async function setJSON(data) {
    const fileUri = FileSystem.documentDirectory + "data.json";
    const jsonData = JSON.stringify(data);
    await FileSystem.writeAsStringAsync(fileUri, jsonData);
    FileSystem.readAsStringAsync(fileUri);
    console.log("JSON 데이터가 성공적으로 저장되었습니다.");
    getJSON();
  }*/

  /*
  //data.json으로부터 데이터 받음
  async function getJSON() {
    const fileUri = FileSystem.documentDirectory + "data.json";
    const readData = JSON.parse(await FileSystem.readAsStringAsync(fileUri));

    setJsonData(readData);

    Object.keys(readData).map((res) => {
      console.log(res);
    });
  }*/

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          flex: 0.4,
          alignItems: "center",
          marginTop: -40,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "SUITE-Medium",
          }}
        >
          Nine
        </Text>
      </View>
      <View style={styles.dividing_line} />
      <View style={{ flex: 5, alignItems: "center" }}>
        {jsonData ? (
          <FlatList
            numColumns={2}
            data={Object.keys(jsonData)}
            renderItem={({ item, index }) => (
              <View style={styles.page} key={index}>
                <View style={styles.pageInView}>
                  <TouchableOpacity style={{ flex: 1 }}>
                    <Image source={require("../../assets/folder_image.png")} />
                    <Text
                      style={{
                        fontFamily: "SUITE-Medium",
                        fontSize: 14,
                        marginLeft: "5%",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 35, fontFamily: "SUITE-Light" }}>
              {jsonDataState}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dividing_line: {
    borderTopWidth: 1.5,
    borderColor: "lightgrey",
  },
  page: {
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 9,
  },
  pageInView: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
