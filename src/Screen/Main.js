import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Fontisto } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import AIPage from "../Screen/AIPage";
import MyPage from "../Screen/MyPage";
import Select from "../Components/Select";
import BottomTab from "../Components/BottomTab";
import Header from "../Components/Header";
import HomePage from "../Screen/HomePage";
import TextPage from "../Screen/TextPage";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

function Main({ navigation }) {
  const [tab, setTab] = useState(true);
  const [page, setPage] = useState(<HomePage />);

  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, width: "100%" }}>
        <Header />
      </View>

      <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
        {page}
      </View>

      <ModalPoup visible={visible}>
        <View style={styles.textContainer}>
          <TouchableOpacity
            onPress={() => {
              // 카메라 선택 했으니 modal창 invisible
              setVisible(false);
              // 카메라 권한 얻기
              // 사진 찍으면 OCR API로 Text 추출
              // 매개변수로 Text data 넘겨줄지 어쩔지는 나중에 결정
              navigation.navigate("AIPage");
            }}
            style={{
              ...styles.textContainer_detail,
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "lightgrey",
            }}
          >
            <Text style={styles.modal_Text}>카메라</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.textContainer_detail,
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "lightgrey",
            }}
            onPress={() => {
              // 앨범 선택 했으니 modal창 invisible
              setVisible(false);
              // 앨범 열고 사진을 선택하면 OCR API로 처리
              // 카메라에서와 마찬가지로 매개변수로 Text data 넘겨줄지 어쩔지는 나중에 결정
            }}
          >
            <Text style={styles.modal_Text}>앨범</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer_detail}
            onPress={() => {
              // 텍스트 선택 했으니 modal창 invisible
              setVisible(false);
              // TextPage로 넘어가서 사용자가 직접 문제 입력
              navigation.navigate("TextPage");
              // 사용자가 TextPage에서 문제 텍스트 입력하면 OCR API로 처리하도록 TextPage.js에 코딩해야함
            }}
          >
            <Text style={styles.modal_Text}>텍스트</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.textContainer}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => setVisible(false)}
          >
            <View>
              <Text
                style={{
                  ...styles.modal_Text,
                  fontWeight: "bold",
                }}
              >
                취소
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ModalPoup>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.bottomTab}>
          <TouchableOpacity
            style={styles.tabMenu}
            onPress={() => {
              setTab(true);
              setPage(<HomePage />);
            }}
          >
            {tab ? (
              <Ionicons name="home-sharp" size={24} color="#445CE9" />
            ) : (
              <Ionicons name="home-outline" size={24} color="#445CE9" />
            )}
            <Text style={tab ? styles.tabActiveText : styles.tabInactiveText}>
              HOME
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
          >
            <Ionicons name="add-circle" size={70} color="#445CE9" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabMenu}
            onPress={() => {
              setTab(false);
              setPage(<MyPage />);
            }}
          >
            {!tab ? (
              <Ionicons name="person-sharp" size={24} color="#445CE9" />
            ) : (
              <Ionicons name="person-outline" size={24} color="#445CE9" />
            )}
            <Text style={!tab ? styles.tabActiveText : styles.tabInactiveText}>
              MY
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 4, alignItems: "center", marginTop: 120 }}>
          <HomePage />
        </View>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <BottomTab navigation={navigation} tab_state={true} />
        </View>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MainHome({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AIPage" component={AIPage} />
      <Stack.Screen name="TextPage" component={TextPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  homeMenu: {
    backgroundColor: "#CCCCCC",
    borderRadius: "15%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
  },
  homeMenu_detail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  homeMenu_Text: {
    fontSize: 18,
  },
  boundary: {},
  bottomTab: {
    flexDirection: "row",
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabMenu: {
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  tabAddBtn: {
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowColor: 5,
    shadowOpacity: 0.5,
  },
  tabActiveText: {
    color: "blue",
    fontWeight: "bold",
  },
  tabInactiveText: {
    color: "blue",
    fontWeight: "normal",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textContainer: {
    borderRadius: 12,
    elevation: 20,
    marginBottom: 12,
    backgroundColor: "white",
  },
  textContainer_detail: {
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 20,
    elevation: 20,
    marginBottom: 40,
  },
  cancel: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_Text: {
    fontSize: 22,
    fontWeight: "500",
    color: "#445CE9",
  },
});

export default MainHome;
