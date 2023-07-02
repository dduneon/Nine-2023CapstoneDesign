import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import BottomTab from '../Components/BottomTab';
import Header from '../Components/Header';
import HomePage from './HomePage';
import MyPage from './MyPage';
import ModalPopup from '../Components/ModalPopup';

function Main({ navigation }) {
  const [activeTab, setActiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [headerTitle, setheaderTitle] = useState('');
  const [onEditStateChange, setOnEditStateChange] = useState(false);

  useEffect(() => {
    if (activeTab === 0) {
      setheaderTitle('나의 오답 노트');
    } else {
      setheaderTitle('내 정보');
    }
  }, [activeTab]);
  return (
    <View style={{ flex: 1 }}>
      <Header
        style={{ flex: 1 }}
        headerTitle={headerTitle}
        editMode={() => {
          setOnEditStateChange(true);
        }}
        exitEditMode={() => {
          setOnEditStateChange(false);
        }}
      />
      <View
        style={{
          flex: 12,
          alignItems: 'baseline',
        }}
      >
        {activeTab === 0 ? (
          <HomePage navigation={navigation} editState={onEditStateChange} />
        ) : (
          <MyPage navigation={navigation} />
        )}
      </View>
      <View style={{ flex: 2, backgroundColor: 'white' }}>
        <BottomTab
          onTabChange={(tab) => setActiveTab(tab)}
          onPlusPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <ModalPopup
        visibleState={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      ></ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Main;
