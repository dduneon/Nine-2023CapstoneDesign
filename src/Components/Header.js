import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Button,
} from 'react-native';

// Fontisto 부분 size 수정해줘야함 24나 32로 해놓으면 휴대폰 스크린 크기에 따라 크고 작게 보일 수 있으므로

function Header({ style, headerTitle }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titletext}>{headerTitle}</Text>
      {headerTitle === '나의 오답 노트' ? (
        <View style={styles.logo}>
          <Button title="편집" style={styles.editBtn}></Button>
        </View>
      ) : (
        <View style={styles.logo}>
          <Image
            style={styles.aiimage}
            source={require('../../assets/icons/icon_ai.png')}
          />
          <Image
            style={styles.applogo}
            source={require('../../assets/icons/icon_nine.png')}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#B7C6E6',
    justifyContent: 'flex-end',
  },
  editBtn: {
    fontSize: 30,
    color: 'blue',
  },
  titletext: {
    flex: 1.5,
    fontFamily: 'SUITE-Medium',
    fontWeight: 'bold',
    fontSize: 32,
    marginLeft: 20,
    marginBottom: 5,
    alignSelf: 'flex-end',
    textAlign: 'left',
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 5,
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  aiimage: {
    resizeMode: 'contain',
    marginRight: 3,
    width: '20%',
    height: '70%',
    resizeMode: 'contain',
  },
  applogo: {
    resizeMode: 'contain',
    height: '70%',
    width: '50%',
  },
});

export default Header;
