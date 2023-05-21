import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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

function BottomTab({ onTabChange }) {
  const [tab, setTab] = useState(0);
  const [visible, setVisible] = useState(false);

  const home = () => {
    setTab(0);
    onTabChange(0);
    console.log(tab);
  };
  const mypage = () => {
    setTab(1);
    onTabChange(1);
    console.log(tab);
  };

  return (
    <View style={styles.bottomTab}>
      <ModalPoup visible={visible}>
        <View style={styles.textContainer}>
          <TouchableOpacity
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
          >
            <Text style={styles.modal_Text}>앨범</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textContainer_detail}>
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

      <TouchableOpacity
        style={styles.homeMenu}
        onPress={() => {
          home();
        }}
      >
        {tab === 0 ? (
          <Ionicons name="home-sharp" size={24} color="#445CE9" />
        ) : (
          <Ionicons name="home-outline" size={24} color="#445CE9" />
        )}
        <Text style={tab === 0 ? styles.tabActiveText : styles.tabInactiveText}>
          HOME
        </Text>
      </TouchableOpacity>
      <View style={styles.backgroundCircle}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <Ionicons
            style={styles.tabAddBtn}
            name="add-circle"
            size={100}
            color="#445CE9"
            position="absolute"
            top={-52}
            left={-47}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.myMenu}
        onPress={() => {
          mypage();
        }}
      >
        {tab === 1 ? (
          <Ionicons name="person-sharp" size={24} color="#445CE9" />
        ) : (
          <Ionicons name="person-outline" size={24} color="#445CE9" />
        )}
        <Text style={tab === 1 ? styles.tabActiveText : styles.tabInactiveText}>
          MY
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: "row",
    elevation: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },
  homeMenu: {
    marginTop: 10,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  myMenu: {
    marginTop: 10,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActiveText: {
    color: "blue",
    fontWeight: "bold",
  },
  tabInactiveText: {
    color: "blue",
    fontWeight: "normal",
  },
  backgroundCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    marginTop: -20,
    alignItems: "center",
    justifyContent: "center", // 수직 정렬을 위해 센터 정렬
    position: "relative",
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

export default BottomTab;
