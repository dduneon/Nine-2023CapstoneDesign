import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermisson] = useState(null);

  useEffect(() => {
    setVisible(visibleState);
    console.log('[ModalPopup.js] visibleState: ' + visibleState);
  }, [visibleState]);

  const closeModal = () => {
    onClose();
    setVisible(false);
  };

  const handleImagePicker = async () => {
    console.log('camera 켜짐');
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.canceled) {
      navigation.navigate('TextInput', {
        itemId: 1000,
        otherParam: result.assets[0].base64,
      });
    }
  };

  const pickImage = async () => {
    console.log('gallery 켜짐');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      navigation.navigate('TextInput', {
        itemId: 1001,
        otherParam: result.assets[0].base64,
      });
    }
  };

  return (
    <ModalSetup visible={visible}>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={{
            ...styles.textContainer_detail,
            width: '100%',
            borderBottomWidth: 0.5,
            borderColor: 'lightgrey',
          }}
          onPress={() => {
            (async () => {
              const cameraStatus =
                await ImagePicker.requestCameraPermissionsAsync();
              setHasCameraPermisson(cameraStatus.status === 'granted');
            })();

            closeModal();
            setTimeout(function () {
              handleImagePicker();
            }, 500);
          }}
        >
          <Text style={styles.modal_Text}>카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.textContainer_detail,
            width: '100%',
            borderBottomWidth: 0.5,
            borderColor: 'lightgrey',
          }}
          onPress={() => {
            (async () => {
              const galleryStatus =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              setHasGalleryPermission(galleryStatus.status === 'granted');
            })();

            closeModal();
            setTimeout(function () {
              pickImage();
            }, 700);
          }}
        >
          <Text style={styles.modal_Text}>앨범</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer_detail}
          onPress={() => {
            navigation.navigate('TextInput', {
              itemId: 1002,
              otherParam: '',
            });
            closeModal();
          }}
        >
          <Text style={styles.modal_Text}>텍스트</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
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
                fontWeight: 'bold',
              }}
            >
              취소
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ModalSetup>
  );
}

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textContainer: {
    borderRadius: 12,
    elevation: 20,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  textContainer_detail: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 20,
    elevation: 20,
    marginBottom: 40,
  },
  cancel: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_Text: {
    fontSize: 22,
    fontWeight: '500',
    color: '#445CE9',
  },
});

export default ModalPopup;
