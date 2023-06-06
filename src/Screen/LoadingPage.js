import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

function LoadingPage({}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logos/logo_nine.gif')}
        style={styles.image}
      ></Image>
      <Text style={styles.mainText}>인공지능 나인이</Text>
      <Text style={styles.subText}>문제를 분석 중이에요</Text>
      <Text style={styles.explainText}>
        몇 초 정도 소요될 수 있으니, 잠시만 기다려주세요
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '60%', resizeMode: 'contain' },
  mainText: { fontFamily: 'SUITE-Medium', fontSize: 25 },
  subText: { fontFamily: 'SUITE-Medium', fontSize: 25 },
  explainText: { fontFamily: 'SUITE-Light', fontSize: 15, marginTop: 30 },
});

export default LoadingPage;
