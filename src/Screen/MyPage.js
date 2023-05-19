import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Fontisto } from '@expo/vector-icons';

function My({ navigation }) {
  return (
    <View>
      <Text>This is MyPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default My;
