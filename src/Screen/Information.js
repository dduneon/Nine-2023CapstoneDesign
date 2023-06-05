import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Image, width, height,StyleSheet, Text} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Information({ navigation }) {


  return (
    <View style={{ flex: 1 }}>
      <View style = {styles.logo_image}>
        <Image source={require("../../assets/Nine_image.png")}
        style={styles.Nine_image}/>
        <Text style={styles.text_style}>조선대학교 컴퓨터공학과 4학년</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
      },
      logo_image: {
        flex: 1,
        marginTop: 25,
        alignItems: "center",
        justifyContent: "center",
      },
      Nine_image: {
        width: "80%",
        height: "50%",
        resizeMode: "contain",
      },
      text_style: {
        fontSize: 25,
        fontFamily: "SUITE-Light"
      }
  });
