import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function BottomTab({ navigation, tab_state }) {
  const [tab, setTab] = useState(tab_state);

  const mypage = () => setTab(false);
  const home = () => setTab(true);

  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity
        style={styles.tabMenu}
        onPress={() => {
          home;
          navigation.navigate('Home');
        }}
      >
        {tab ? (
          <Ionicons name="home-sharp" size={24} color="#445CE9" />
        ) : (
          <Ionicons name="home-outline" size={24} color="#445CE9" />
        )}
        <Text style={tab ? styles.tabActiveText : styles.tabInactiveText}>
          HOME
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="add-circle" size={70} color="#445CE9" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabMenu}
        onPress={() => {
          mypage;
          navigation.navigate('MyPage');
        }}
      >
        {!tab ? (
          <Ionicons name="person-sharp" size={24} color="#445CE9" />
        ) : (
          <Ionicons name="person-outline" size={24} color="#445CE9" />
        )}
        <Text style={!tab ? styles.tabActiveText : styles.tabInactiveText}>
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
  tabMenu: {
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabAddBtn: {
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowColor: 5,
    shadowOpacity: 0.5,
  },
  tabActiveText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  tabInactiveText: {
    color: 'blue',
    fontWeight: 'normal',
  },
});

export default BottomTab;
