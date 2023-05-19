import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function BottomTab({ onTabChange }) {
  const [tab, setTab] = useState(0);

  const home = () => {
    setTab(0);
    onTabChange(0);
    console.log(tab);
  };
  const mypage = () => {
    setTab(1);
    onTabChange(1);
    console.log(tab);
  };

  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity
        style={styles.homeMenu}
        onPress={() => {
          home();
        }}
      >
        {tab === 0 ? (
          <Ionicons name="home-sharp" size={24} color="#445CE9" />
        ) : (
          <Ionicons name="home-outline" size={24} color="#445CE9" />
        )}
        <Text style={tab === 0 ? styles.tabActiveText : styles.tabInactiveText}>
          HOME
        </Text>
      </TouchableOpacity>
      <View style={styles.backgroundCircle}>
        <TouchableOpacity>
          <Ionicons
            style={styles.tabAddBtn}
            name="add-circle"
            size={100}
            color="#445CE9"
            position="absolute"
            top={-52}
            left={-47}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.myMenu}
        onPress={() => {
          mypage();
        }}
      >
        {tab === 1 ? (
          <Ionicons name="person-sharp" size={24} color="#445CE9" />
        ) : (
          <Ionicons name="person-outline" size={24} color="#445CE9" />
        )}
        <Text style={tab === 1 ? styles.tabActiveText : styles.tabInactiveText}>
          MY
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  homeMenu: {
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myMenu: {
    marginTop: 10,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActiveText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  tabInactiveText: {
    color: 'blue',
    fontWeight: 'normal',
  },
  backgroundCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    marginTop: -20,
    alignItems: 'center',
    justifyContent: 'center', // 수직 정렬을 위해 센터 정렬
    position: 'relative',
  },
});

export default BottomTab;
