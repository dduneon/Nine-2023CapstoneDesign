import { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDatabase,
  ref,
  onValue,
  set,
  query,
  remove,
} from 'firebase/database';
import db from '../firebase/config';
import { questionDelete } from '../Functions/DataFunction';
import LoadingPage from './LoadingPage';

const STORAGE_KEY = '@login_id';

function NotePage({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  const [userId, setUserId] = useState();
  const [folderName, setFolderName] = useState('');
  const [numQuestion, setNumQuestion] = useState('');
  const [question, setQuestion] = useState('');
  const [ans, setAns] = useState('');
  const [com, setCom] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    userLoad();
    const parseData = JSON.parse(otherParam);
    setFolderName(parseData['folderName']);
    setNumQuestion(parseData['numQuestion']);
    setQuestion(parseData['question']);
    setAns(parseData['answer']);
    setCom(parseData['com']);
    setNumber(parseData['number']);
  }, []);

  async function userLoad() {
    setUserId(await AsyncStorage.getItem(STORAGE_KEY));
  }

  console.log('[NotePage.js] NotePage Loaded');

  // 해야할점 : 데이터 token 수 조정하기
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'SUITE-Medium',
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {folderName}
      </Text>
      <View
        style={{
          flex: 0.5,
          padding: 7,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: '#BACDDB',
          borderRadius: 10,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'IropkeBatangM',
            }}
          >
            {question}
          </Text>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#A0BFE0',
          padding: 7,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <ScrollView style={{ flex: 1, color: '#02343F' }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'IropkeBatangM',
              marginBottom: 10,
            }}
          >
            {ans}
          </Text>
          <Text style={{ fontSize: 18, fontFamily: 'IropkeBatangM' }}>
            {com}
          </Text>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          marginRight: 5,
          justifyContent: 'center',
        }}
      >
        <Pressable
          style={({ pressed }) => [
            styles.leftButton,
            {
              backgroundColor: pressed ? '#7895CB' : '#445CE9', // 클릭 시 배경색 변경
            },
          ]}
          onPress={() => {
            navigation.navigate('Main_Home');
          }}
        >
          <Text style={styles.text}>홈화면으로 이동하기</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.rightButton,
            {
              backgroundColor: pressed ? '#7895CB' : '#445CE9', // 클릭 시 배경색 변경
            },
          ]}
          onPress={async () => {
            try {
              await questionDelete(userId, folderName, number);
            } catch (error) {
              console.log(error);
            }

            //const path = `users/${userId}/${folderName}/${numQuestion}`;
            //remove(ref(db, path));
            navigation.navigate('Main_Home');
          }}
        >
          <Text style={styles.text}>삭제</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCE2F0',
  },
  leftButton: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginRight: 10,
  },
  rightButton: {
    width: '45%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'SUITE-Medium',
  },
});

export default NotePage;
