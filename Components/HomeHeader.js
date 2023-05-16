import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";

// Fontisto 부분 size 수정해줘야함 24나 32로 해놓으면 휴대폰 스크린 크기에 따라 크고 작게 보일 수 있으므로

function HomeHeader() {
  const notice = () => {}; // 종 모양 눌렀을 때 발생할 이벤트

  const user = () => {}; // 사람 모양 눌렀을 때 발생할 이벤트
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginRight: 20,
      }}
    >
      <TouchableOpacity onPress={notice} style={{ marginRight: 8 }}>
        <Fontisto name="bell" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={user}>
        <MaterialCommunityIcons
          name="account-outline"
          size={32}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({});

export default HomeHeader;
