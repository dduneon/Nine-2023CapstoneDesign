import React, { useState, useEffect } from 'react';
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
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fontisto, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

import { getDatabase, ref, onValue, set, query } from 'firebase/database';
import { db } from '../firebase/config';

import {
  getJSON,
  getData,
  makeFolder,
  userLoad,
} from '../Functions/DataFunction';

const { height, width } = Dimensions.get('window');

function Home({ navigation }) {
  const [jsonData, setJsonData] = useState(null);
  const [jsonDataState, setJsonDataState] = useState('Loading ...');

  useEffect(() => {
    uploadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      uploadData();
      if (jsonData === null) {
        setJsonDataState(
          '하단의 추가 버튼을 눌러\n나인에게 모르는 문제를 물어보고\n내 오답노트에 추가할 수 있어요'
        );
      }
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval 정리
  }, []);

  async function uploadData() {
    const data = await getJSON();
    setJsonData(data);
  }

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: '#DCE2F0' }}>
      <View style={{ flex: 5, alignItems: 'center' }}>
        {jsonData ? (
          <FlatList
            numColumns={2}
            data={Object.keys(jsonData)}
            renderItem={({ item, index }) => (
              <View style={styles.page} key={index}>
                <View style={styles.pageInView}>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      navigation.navigate('Folder', {
                        itemId: 1101,
                        otherParam: item,
                      });
                    }}
                  >
                    <Image source={require('../../assets/folder_image.png')} />
                    <Text
                      style={{
                        fontFamily: 'SUITE-Medium',
                        fontSize: 14,
                        marginLeft: '5%',
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
              justifyContent: 'center',
              color: '#0E252A',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'SUITE-Light',
                textAlign: 'center',
              }}
            >
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
    borderColor: 'lightgrey',
  },
  page: {
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
    backgroundColor: '#f2f2f2',
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
