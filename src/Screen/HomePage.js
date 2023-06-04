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
  Dimensions
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fontisto, AntDesign } from "@expo/vector-icons";

import { folders } from "../Data/data";

const { height, width } = Dimensions.get("window");

function Home({ navigation }) {
//--------------------------------------------------------------------------
// Flatlist 정상 작동되는지 확인용 코드 (추후 데이터베이스 연동 후 변경예정)
  const [folder, setFolder] = useState(folders)
  const [id_num, setId_num] = useState(4)

  function update_Folder(){
    const newfolder = {
      id: id_num,
      text: "20230707202020", //글자수 짤리는지 확인용 길게해놓음
    }
    setFolder([...folder, newfolder])
    setId_num(id_num + 1)
  }
  //console.log(folder);
//--------------------------------------------------------------------------

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
          <View style={{ width: width / 4, height: height / 64}}>
            <Text style={{ textAlign: "center" }}>{item.text} </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );


  return (
    <View>
      <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
      <Text style = {styles.text_style}>📖오답노트📖</Text>
        <TouchableOpacity onPress={update_Folder}>
          <Text style={styles.text_style}>폴더 추가하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dividing_line}/>
      <FlatList
        data = {folder}
        renderItem={folder_components}
        numColumns={2}
        keyExtractor={(text) => text.id }
        style = {{margin: 25}}
      />
    </View>
  );
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
  dividing_line:{
    marginTop: 20,
    marginLeft: -30,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    width: width - 20,
  }
});

export default Home;
