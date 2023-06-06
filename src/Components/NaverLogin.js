import { StatusBar } from "expo-status-bar";
import * as React from "react";

import {
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@login_id";

const CLIENT_ID = "Mzd3dap0KLih9pAZ86Qk";
const REDIRECT_URL = "https://auth.expo.io/@seonghyeon_lee/Nine";
const CLIENT_SECRET = "j3iOBc9PWy";
const MYPATH = "@path";

var state_value = "";

const { height, width } = Dimensions.get("window");

export default function NaverLogin({ navigation }) {
	const login = async () => {
		const result = await AuthSession.startAsync({
			authUrl: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=1234&redirect_uri=${REDIRECT_URL}`,
		});

		if (result.type === "success") {
			const code = result.params.code;
			state_value = result.params.state;
			//mutate({
			//  id_token: code,
			//  provider: "NAVER",
			//});
			requestToken(code);
		}
	};

	const requestToken = async (request_code) => {
		var Access_Token = "none";
		var request_token_url = `https://nid.naver.com/oauth2.0/token?`;
		axios({
			methos: "post",
			url: request_token_url,
			params: {
				grant_type: "authorization_code",
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				code: request_code,
				state: state_value,
			},
		})
			.then(function (response) {
				Access_Token = response.data.access_token;
				//console.log(Access_Token);
				requestUserInfo(Access_Token);
			})
			.catch(function (error) {
				console.log("error", error);
			});
	};

	const requestUserInfo = async (Access_Token) => {
		axios({
			method: "GET",
			url: "https://openapi.naver.com/v1/nid/me",
			headers: {
				Authorization: `Bearer ${Access_Token}`,
			},
		})
			.then(async (response) => {
				console.log(response)
				await AsyncStorage.setItem(
					STORAGE_KEY,
					JSON.stringify(response.data.response.id)
				);
				await AsyncStorage.setItem(MYPATH, "N");
				navigation.navigate("Main_Home");
			})
			.catch(function (error) {
				console.log("error", error);
			});
	};

	return (
		<TouchableOpacity
			style={styles.icon_naver}
			onPress={login}
			activeOpacity="0.6"
		>
			<Image
				source={require("../../assets/icons/icon_naver.png")}
				style={styles.Naver_image}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	Naver_image: {
		flex: 1,
		resizeMode: "contain",
		width: "100%",
		height: "100%",
	},
	icon_naver: {
		height: "40%",
		width: "21%",
	},
});
