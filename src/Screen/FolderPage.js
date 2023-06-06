import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { getJSON } from '../Functions/DataFunction';

import Header from '../Components/Header';

function Home({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [jsonData, setJsonData] = useState(null);
  const [jsonDataState, setJsonDataState] = useState('Loading ...');
  const [selectState, setSelectState] = useState([]);

  useEffect(() => {
    uploadData();
  }, []);

  async function uploadData() {
    const data = await getJSON();
    //console.log(data);
    if (data != null) {
      const jsonData = data[otherParam];
      if (
        Object.keys(jsonData).length === 1 &&
        jsonData.hasOwnProperty('folderName')
      ) {
        setJsonDataState(
          '폴더가 비어있어요\n문제를 추가하려면 나인에게 물어본 후\n오답노트에 추가해주세요'
        );
      } else {
        setJsonData(jsonData);
        setSelectState(Array(Object.keys(jsonData).length).fill(false));
      }
    }
  }

  function handleTouchableOpacityPress(index) {
    setSelectState((prevSelectStates) => {
      const newSelectStates = [...prevSelectStates];
      newSelectStates[index] = !newSelectStates[index];
      return newSelectStates;
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DCE2F0' }}>
      <Header style={{ flex: 1 }} headerTitle={otherParam} />
      <View style={{ flex: 12 }}>
        {jsonData ? (
          <FlatList
            numColumns={1}
            data={Object.keys(jsonData).filter((key) => key !== 'folderName')}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => handleTouchableOpacityPress(index)}
                activeOpacity={selectState[index] ? 1 : 0}
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
                      <View style={{ position: 'absolute', right: '55%' }}>
                        {selectState[index] ? (
                          <AntDesign name="caretdown" size={14} color="black" />
                        ) : (
                          <AntDesign
                            name="caretright"
                            size={14}
                            color="black"
                          />
                        )}
                      </View>
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
                    {selectState[index] ? (
                      <View style={{ flex: 1, paddingVertical: 12 }}>
                        <ScrollView style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'SUITE-Light',
                            }}
                          >
                            {jsonData[item].question.question}
                          </Text>
                        </ScrollView>
                        <ScrollView style={{ flex: 1 }}>
                          <Text>{jsonData[item].answer.answer}</Text>
                          <Text>{jsonData[item].com.com}</Text>
                        </ScrollView>
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
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
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderWidth: 0.3,
    borderRadius: 15,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Home;
