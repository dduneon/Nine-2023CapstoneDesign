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
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { getDatabase, ref, onValue, set, query } from 'firebase/database';
import { db } from '../firebase/config';
import {
  getJSON,
  getData,
  makeFolder,
  exportData,
} from '../Functions/DataFunction';

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

const STORAGE_KEY = '@login_id';

function ModalPopup({
  question,
  answer,
  com,
  visibleState,
  onClose,
  navigation,
}) {
  const [visible, setVisible] = React.useState(visibleState);
  const [userId, setUserId] = useState();
  const [newName, setNewName] = useState('');
  const onChangeText = (payload) => {
    setNewName(payload);
    getData(userId);
    uploadData();
  };
  const [jsonData, setJsonData] = useState(null);
  const [jsonDataState, setJsonDataState] = useState('Loading ...');
  const [makeSignal, setMakeSignal] = useState(false);

  useEffect(() => {
    userLoad();
  }, []);

  useEffect(() => {
    setVisible(visibleState);
    console.log('[DirModalPopup.js] visibleState: ' + visibleState);
  }, [visibleState]);

  useEffect(() => {
    uploadData();
  }, [userId]);

  useEffect(() => {
    if (jsonData === null) {
      setJsonDataState('폴더가 비어있네요\n폴더를 만들어주세요.');
    }
  }, [jsonData]);

  useEffect(() => {
    uploadData();
    setMakeSignal(false);
  }, [makeSignal]);

  async function userLoad() {
    setUserId(await AsyncStorage.getItem(STORAGE_KEY));
  }

  async function uploadData() {
    setJsonData(await getJSON());
  }

  function exportFirebase() {
    makeFolder(userId, newName);
    getData(userId);
    uploadData();
  }

  return (
    <ModalSetup visible={visible}>
      <View style={styles.modalView}>
        <View style={styles.modalInView}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={{ flex: 0.5, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'SUITE-Medium',
                  margin: 10,
                }}
              >
                폴더를 선택해주세요
              </Text>
            </View>

            <View
              style={{
                flex: 4,
                marginTop: 4,
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '70%',
                  justifyContent: 'space-between',
                  borderWidth: 1,
                  borderRadius: 200,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}
              >
                <TextInput
                  onChangeText={onChangeText}
                  returnKeyType="done"
                  value={newName}
                  placeholder="폴더 이름을 정해주세요."
                  placeholderTextColor={'grey'}
                  style={{}}
                />
                <View style={{ marginLeft: 25, alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      exportFirebase();
                      Keyboard.dismiss();
                      setNewName('');
                      setMakeSignal(true);
                    }}
                  >
                    <EvilIcons name="plus" size={38} color="#4f69f9" />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  marginTop: 15,
                  width: '100%',
                  marginRight: '7%',
                }}
              >
                {jsonData ? (
                  <FlatList
                    numColumns={1}
                    data={Object.keys(jsonData)}
                    renderItem={({ item, index }) => (
                      <View style={styles.page} key={index}>
                        <View style={styles.pageInView}>
                          <TouchableOpacity style={{ flex: 1 }}>
                            <Text
                              style={{
                                fontFamily: 'SUITE-Medium',
                                fontSize: 14,
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
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 35, fontFamily: 'SUITE-Light' }}>
                      {jsonDataState}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.modalButtonContainer}>
          <View style={styles.modalInCancleView}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => {
                onClose();
                setVisible(false);
                setNewName('');
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
                    fontWeight: 'bold',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
    elevation: 20,
  },
  modalView: {
    flex: 1,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInView: {
    flex: 1,
    width: '80%',
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  modalButtonContainer: {
    flex: 0.1,
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: 'row',
  },
  modalInCancleView: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '48%',
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
  },
  page: {
    flex: 1,
    width: '100%',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    elevation: 9,
  },
  pageInView: {
    flex: 1,
    width: '60%',
    backgroundColor: '#f2f2f2',
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ModalPopup;
