import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  TextInput,
  Keyboard,
  FlatList,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EvilIcons } from '@expo/vector-icons';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
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

const ModalSetup = ({ touchEvent, visible, children }) => {
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
      <TouchableOpacity
        style={styles.modalBackGround}
        onPress={touchEvent}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
const STORAGE_KEY = '@login_id';
function ModalPopup({ selectFolder, temp, visibleState, onClose, navigation }) {
  const [visible, setVisible] = React.useState(visibleState);
  //const [detailJsonData, setDetailJsonData] = useState(null);
  const [jsonDataState, setJsonDataState] = useState(
    '하단의 추가 버튼을 눌러\n나인에게 모르는 문제를 물어보고\n내 오답노트에 추가할 수 있어요'
  );
  //let detailJsonData = JSON.parse(temp)[selectFolder];
  const [detailJsonData, setDetailJsonData] = useState({});
  /*
  useEffect(() => {
    const interval = setInterval(async () => {
      if (temp !== '{}') {
        setDetailJsonData(JSON.parse(temp)[selectFolder]);
      }
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval 정리
  }, [selectFolder]);*/
  useEffect(() => {
    if (temp !== '{}') {
      const parseJson = JSON.parse(temp);
      if (parseJson != null) {
        const data = parseJson[selectFolder];
        if (
          Object.keys(data).length === 1 &&
          data.hasOwnProperty('folderName')
        ) {
          setDetailJsonData({});
        } else {
          setDetailJsonData(data);
        }
      }
    }
  }, [selectFolder, temp]);
  /*
  function load() {
    const data = JSON.parse(temp)[selectFolder];
    if (data != null) {
      if (Object.keys(data).length === 1 && data.hasOwnProperty('folderName')) {
        console.log('folder만 있음');
      } else {
        console.log('folder말고도 더 있음');
      }
    }
  }*/

  /*
  useEffect(() => {
    const parseJson = JSON.parse(temp);
    if (parseJson != null) {
      const data = parseJson[selectFolder];
      if (Object.keys(data).length === 1 && data.hasOwnProperty('folderName')) {
        //console.log('qqqqqqqqqqqq');
        setJsonDataState(
          'HOME 하단의 추가 버튼을 눌러\n나인에게 모르는 문제를 물어보고\n내 오답노트에 추가할 수 있어요'
        );
      } else {
        //console.log('qqqqqqqqqqqq');
        //console.log(data);
        setDetailJsonData(data);
      }
    }
    console.log(parseJson);
    //uploadData();
  }, [visibleState]);*/

  useEffect(() => {
    setVisible(visibleState);
    console.log('[DirDetailModal.js] visibleState: ' + visibleState);
  }, [visibleState]);

  function closeModal() {
    onClose();
    setVisible(false);
  }
  return (
    <ModalSetup
      touchEvent={() => {
        closeModal();
      }}
      visible={visible}
    >
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
                문제를 선택해주세요
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                marginTop: 4,
                alignItems: 'center',
                borderTopWidth: 0.3,
                borderTopEndRadius: '30%',
                borderTopStartRadius: '30%',
              }}
            >
              <View
                style={{
                  marginTop: 15,
                  width: '100%',
                  marginRight: '7%',
                }}
              >
                <FlatList
                  numColumns={1}
                  data={Object.keys(detailJsonData).filter(
                    (key) => key !== 'folderName'
                  )}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        //item이 문제 번호
                        const pathData = folderName + ' ' + item;
                        /*navigation.navigate('Folder', {
                            itemId: 1501,
                            otherParam: pathData,
                          });*/
                        onClose();
                        setVisible(false);
                      }}
                    >
                      <View style={styles.page} key={index}>
                        <View style={styles.pageInView}>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignItems: 'center',
                            }}
                          >
                            <View
                              style={{
                                alignItems: 'center',
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: 'SUITE-Medium',
                                  fontSize: 14,
                                  marginLeft: '5%',
                                }}
                              >
                                {item}
                                {'번 문제'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
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
    width: '100%',
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
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ModalPopup;
