import React, { useState } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  width,
  height,
  StyleSheet,
  Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

export default function Information({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerItems}>
        <View style={styles.headerLogo}>
          <Text style={{ fontFamily: 'SUITE-Medium', fontSize: 28 }}>
            찍고, 물어보면, 알려주는{'\n'}나만의 인공지능 학습 플랫폼
          </Text>
          <Image
            source={require('../../assets/icons/icon_nine.png')}
            style={styles.icon_nine}
          />
          <Text style={{ fontSize: 20, fontFamily: 'SUITE-Medium' }}>
            - CapstoneDesign 작품 -
          </Text>
        </View>
        <View style={{flex:1}}>
        <View>
          <Text
            style={{ marginLeft: 10, fontSize: 20, fontFamily: 'SUITE-Light' }}
          >
            GitHub
          </Text>
        </View>
        <View style={styles.dividing_line}>
          <View style={styles.text_container} />
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <AntDesign
            style={{ alignSelf: 'center', marginLeft: 20 }}
            name="github"
            size={50}
            color="black"
          />
          <Text style={styles.text_style}>
            {' '}
            https://github.com/dduneon/Nine-2023CapstoneDesign.git
          </Text>
        </View>
        <View>
          <Text
            style={{ marginLeft: 10, fontSize: 20, fontFamily: 'SUITE-Light' }}
          >
            넌 학생이고 난 AI야 [팀구성]
          </Text>
        </View>
        <View style={styles.dividing_line}>
          <View style={styles.text_container} />
        </View>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <AntDesign
            style={{ alignSelf: 'center', marginLeft: 20 }}
            name="github"
            size={50}
            color="black"
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                fontFamily: 'SUITE-Medium',
              }}
            >
              {' '}
              김준현{' '}
            </Text>
            <Text style={styles.text_style}> https://github.com/dduneon </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <AntDesign
            style={{ alignSelf: 'center', marginLeft: 20 }}
            name="github"
            size={50}
            color="black"
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                fontFamily: 'SUITE-Medium',
              }}
            >
              {' '}
              하태준{' '}
            </Text>
            <Text style={styles.text_style}> https://github.com/htj7425 </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <AntDesign
            style={{ alignSelf: 'center', marginLeft: 20 }}
            name="github"
            size={50}
            color="black"
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                fontFamily: 'SUITE-Medium',
              }}
            >
              {' '}
              이성현{' '}
            </Text>
            <Text style={styles.text_style}> https://github.com/zxl3651 </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <AntDesign
            style={{ alignSelf: 'center', marginLeft: 20 }}
            name="github"
            size={50}
            color="black"
          />
          <View>
            <Text
              style={{
                fontSize: 18,
                marginLeft: 20,
                fontFamily: 'SUITE-Medium',
              }}
            >
              {' '}
              김민지{' '}
            </Text>
            <Text style={styles.text_style}>
              {' '}
              https://github.com/kimminjjii{' '}
            </Text>
          </View>
        </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerItems: {
    flex:1,
    flexDirection: 'column',
  },
  headerLogo: {
    flex:0.9,
    paddingLeft: 30,
    paddingTop: 90,
    alignItems: 'flex-start',
    backgroundColor: '#DCE2F0',
  },
  icon_nine: {
    marginTop: 10,
    resizeMode: 'contain',
    width: '65%',
    height: '35%',
  },
  text_style: {
    marginLeft: 20,
    fontFamily: 'SUITE-Medium',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  dividing_line: {
    margin: 5,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
    width: width,
  },
});
