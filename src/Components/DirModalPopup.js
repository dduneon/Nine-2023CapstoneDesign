import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const ModalSetup = ({ visible, children }) => {
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

function ModalPopup({ visibleState, onClose, navigation }) {
  const [visible, setVisible] = React.useState(visibleState);

  useEffect(() => {
    setVisible(visibleState);
    console.log("[ModalPopup.js] visibleState: " + visibleState);
  }, [visibleState]);

  return (
    <ModalSetup visible={visible}>
      <View style={styles.modalView}>
        <View style={styles.modalInView}>
          <View style={{ flex: 0.5, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: "SUITE-Medium",
                margin: 10,
              }}
            >
              폴더를 선택해주세요
            </Text>
          </View>

          <View
            style={{ flex: 4, justifyContent: "center", alignItems: "center" }}
          >
            <Text>여기에 폴더 정보들 출력</Text>
          </View>
        </View>

        <View style={styles.modalButtonContainer}>
          <View style={styles.modalInCancleView}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => {
                onClose();
                setVisible(false);
              }}
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
          <View style={styles.modalInCancleView}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => {
                onClose();
                setVisible(false);
              }}
            >
              <View>
                <Text
                  style={{
                    ...styles.modal_Text,
                    fontWeight: "bold",
                  }}
                >
                  완료
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ModalSetup>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 20,
    elevation: 20,
  },
  modalView: {
    flex: 1,
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalInView: {
    flex: 1,
    width: "80%",
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "white",
  },
  modalButtonContainer: {
    flex: 0.1,
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: "row",
  },
  modalInCancleView: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "48%",
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
  },
});

export default ModalPopup;
