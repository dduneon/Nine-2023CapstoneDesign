import {
  getDatabase,
  ref,
  onValue,
  set,
  query,
  remove,
} from 'firebase/database';
import { db } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

//새로운 폴더 생성 (DB에서 적용되는 부분)
function makeFolder(userId, folderName) {
  const path = `users/${userId}/${folderName}`;
  const reference = ref(db, path);
  console.log(path);
  set(reference, { folderName });
}

function folderDelete(userId, folderName) {
  const path = `users/${userId}/${folderName}`;
  const reference = ref(db, path);
  remove(reference)
    .then(() => {
      console.log('폴더 삭제 완료');
    })
    .catch((error) => {
      console.log('폴더 삭제 중 오류 발생: ', error);
    });
}

async function questionDelete(userId, folderName, number) {
  const path = `users/${userId}/${folderName}/${number}`;
  const reference = ref(db, path);
  console.log(path);
  remove(reference)
    .then(() => {
      console.log('질문 삭제 완료');
    })
    .catch((error) => {
      console.log('질문 삭제 중 오류 발생: ', error);
    });
}
/*
function questionDelete(userId, folderName, number, question, answer, com) {
  const path = `users/${userId}/${folderName}/${number}`;
  const reference = ref(db, path);
  set(reference);
  getData(userId);
}*/

function exportData(userId, folderName, number, question, answer, com) {
  const path = `users/${userId}/${folderName}/${number}`;
  const reference = ref(db, path);
  set(reference, { question: { question }, answer: { answer }, com: { com } });
}

//DB에서 JSON 데이터를 받음
/*function getData(userId) {
  console.log("[DataFunction.js - getData] 정상 동작");
  const temp = query(ref(db, "users/" + userId + "/"));
  let data;
  onValue(temp, (res) => {
    data = res.toJSON();
  });
  if (data != null) {
    return data;
  } else {
    return "문제를 등록해주세요!";
  }
}*/

// DB로 부터 data 받아와서 local json에 저장
function getData(userId) {
  const path = `users/${userId}`;
  const temp = query(ref(db, path));
  let data;
  onValue(temp, async (res) => {
    data = res.toJSON();
    //local JSON에 저장하는 부분
    const fileUri = FileSystem.documentDirectory + 'data.json';
    const jsonData = JSON.stringify(data);
    await FileSystem.writeAsStringAsync(fileUri, jsonData);
  });
  return data;
}

/*
//getData로 부터 DB의 data를 받아와 JSON에 저장
async function setJSON(data) {
  console.log("[DataFunction.js - setJSON] 정상 동작");
  const fileUri = FileSystem.documentDirectory + "data.json";
  const jsonData = JSON.stringify(data);
  await FileSystem.writeAsStringAsync(fileUri, jsonData);
  console.log("JSON 데이터가 성공적으로 저장되었습니다.");
}*/

//data.json으로부터 데이터 받음
async function getJSON() {
  const fileUri = FileSystem.documentDirectory + 'data.json';
  const readData = JSON.parse(await FileSystem.readAsStringAsync(fileUri));
  return readData;
}

export {
  getJSON,
  getData,
  makeFolder,
  exportData,
  questionDelete,
  folderDelete,
};
