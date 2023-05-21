import { StatusBar } from "expo-status-bar";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

/*
npx expo install expo-auth-session expo-crypto
npx expo install expo-web-browser
npx expo install expo-random
npm install @react-native-async-storage/async-storage

expo prebuild
*/

// app.json 파일
// ios 부분에 "bundleIdentifier": "com.Nine.tutorialLogin" 처럼 작성하기
// android 부분에 "package": "com.Nine.tutorialLogin" 처럼 작성하기

// 아래 ID들은 우리 Capston 프로젝트에 맞게 새로 생성해야함
//web: 905274518245-pep3udc0n4dh0vhghfgml633u5e9uq0p.apps.googleusercontent.com
//IOS: 905274518245-lvicj88ilgk7fkek1p41t1g12a55p5lu.apps.googleusercontent.com
// android: 905274518245-tp22sk6ml6rctfqna31cfai50e8s0h0n.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession();
// 사용자가 Google로 로그인하려고 할 때 이벤트 들을 수 있음

export default function GoogleLogin({ navigation }) {
  const [accessToken, setAccessToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [request, response, promtAsync] = Google.useAuthRequest({
    clientId:
      "15200714153-ar2h399ounks1meiuusdsc1pstlf3586.apps.googleusercontent.com",
    iosClientId:
      "15200714153-5o2l9jcjtm8ngpma5v950ugmnuetqfv2.apps.googleusercontent.com",
    androidClientId:
      "15200714153-29ce5qs9bs2afi4i7j9l6odfeqf1lec8.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      console.log(accessToken);
      console.log("accessToken 성공");
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const useInfo = await response.json();
    setUser(useInfo);
    console.log("user : ");
    console.log(user);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: user.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!request}
        onPress={async () => {
          await promtAsync();
          navigation.navigate("Main_Home");
        }}
      >
        <Image
          source={require("../../assets/GoogleLogin.png")}
          style={{ width: 300, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
