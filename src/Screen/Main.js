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

  return (
    <View style={{ flex: 1 }}>
      <Header styles={{ flex: 1 }} />
      <View
        style={{
          flex: 12,
          alignItems: 'baseline',
        }}
      >
        {activeTab === 0 ? <HomePage /> : <MyPage navigation={navigation} />}
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
