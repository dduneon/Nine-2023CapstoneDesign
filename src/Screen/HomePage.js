import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
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
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fontisto, AntDesign } from "@expo/vector-icons";

function Home({ navigation }) {
  // 폰트 로드
  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'SUITE-Light': require('../../assets/fonts/SUITE-Light.otf'),
      'SUITE-Medium': require('../../assets/fonts/SUITE-Medium.otf'),
    });
    setIsReady(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);


  const folders = [
    {
      id: "1", //각 폴더의 고유 id값
      text: "20230531", //각 폴더의 제목 string값
    },
    {
      id: "2",
      text: "20230602",
    },
    {
      id: "3",
      text: "20230605",
    },
    {
      id: "4",
      text: "20230605",
    },
    {
      id: "5",
      text: "20230605",
    },
  ]
  const folder_components = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        margin: 20,
      }}
    >
      <TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../../assets/folder_image.png")} />
          <View style={{ width: 60 }}>
            <Text style={{ textAlign: "center" }}>{item.text} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );


  if (isReady != '') {
  return (
    <View>
      <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
      <Text style = {styles.text_style}>📖오답노트📖</Text>
        <TouchableOpacity>
          <Text style={styles.text_style}>폴더 추가하기</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data = {folders}
        renderItem={folder_components}
        numColumns={2}
        keyExtractor={(text) => text.id }
        style = {{margin: 25}}
      />
    </View>
  );
}
}

const styles = StyleSheet.create({
  font_style: {
    fontSize: 25,
    fontFamily: 'SUITE-Medium',
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  text_style: {
    fontSize: 20,
    fontFamily: 'SUITE-Light',
    marginLeft: 20,
  },
  touch_style:{
    backgroundColor:"#D8D8D8",
    borderRadius: 15,
    margin: 5,
  },
});

export default Home;
