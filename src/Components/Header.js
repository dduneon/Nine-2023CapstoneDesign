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

function Header({ style, headerTitle, editMode, exitEditMode }) {
  const [pressBtnState, setPressBtnState] = useState(false);
  // True일 시 편집중인것임
  const onPressEditBtn = () => {
    setPressBtnState(pressBtnState ? false : true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titletext}>{headerTitle}</Text>
      {headerTitle === '내 정보' ? (
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
      ) : (
        <View style={styles.editView}>
          {headerTitle === '나의 오답 노트' ? (
            <Button
              title={pressBtnState ? '완료' : '편집'}
              style={styles.editBtn}
              onPress={() => {
                if (!pressBtnState) {
                  editMode();
                } else {
                  exitEditMode();
                }
                onPressEditBtn();
              }}
            ></Button>
          ) : (
            <></>
          )}
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
  editView: {
    flex: 0.5,
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginRight: 20,
    alignItems: 'flex-end',
  },
  editBtn: {},
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
    flex: 0.8,
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
