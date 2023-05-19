import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function Input({ navigation }) {
  return (
    <View>
      <Text style={{ fontSize: 50 }}> Text Input Page </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function TextPage() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Input"
        component={Input}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default TextPage;
