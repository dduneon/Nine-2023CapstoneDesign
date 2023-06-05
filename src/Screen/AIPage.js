import { useEffect, useState } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	Pressable,
	StyleSheet,
} from 'react-native';
import { getDatabase, ref, onValue, set, query } from 'firebase/database';
import db from '../firebase/config';
import DirModalPopup from '../Components/DirModalPopup';

function AIPage({ navigation, route }) {
	const { itemId, otherParam } = route.params;
	const [isResponse, setisResponse] = useState(false);
	const [answer, setAnswer] = useState('');

	//DirModalPopup 다루기 위한 useState
	const [modalVisible, setModalVisible] = useState(false);

	const apiKey = process.env.OPENAI_API_KEY;
	const API_URL = 'https://api.openai.com/v1/chat/completions';

	console.log('[AIPage.js] AIPage Loaded');

	const handleSend = () => {
		fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content:
							otherParam +
							"\n이 문제의 답과 해설에 대해 다음과 같은 양식으로 알려줘\n- 답은 첫째줄, 해설은 둘째 줄에 알려줄 것(답과 해설을 합치면 두줄이며 답과 해설은 계행을 통하여 구분됨)\n- 해설은 최대한 답에 대한 근거를 말해줄 것\n- 답과 해설을 포함한 두 줄 이외의 답변은 주지 않을 것\n- '답: '이나 '해설: ' 로 답의 시작이나 해설의 시작을 알려줄 것",
					},
				],
				max_tokens: 1000,
				temperature: 0.7,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				const responseData = data.choices[0].message.content.trim();
				setAnswer(responseData);
			})
			.catch((error) => {
				// 에러 발생시 조치하기
				console.error(error);
			});
	};

	useEffect(() => {
		if (!answer) {
			handleSend();
		}
	}, []);

	// 해야할점 : 데이터 token 수 조정하기
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#DCE2F0',
			}}
		>
			<Text
				style={{
					fontSize: 30,
					fontFamily: 'SUITE-Medium',
					margin: 10,
				}}
			>
				인공지능 나인이 제공한{'\n'}답과 해설이에요
			</Text>
			<View
				style={{
					flex: 0.5,
					backgroundColor: 'yellow',
					padding: 10,
					marginBottom: 10,
					backgroundColor: '#ACA7CA',
					borderRadius: 10,
				}}
			>
				<ScrollView style={{ flex: 1 }}>
					<Text
						style={{
							fontSize: 12,
							fontFamily: 'SUITE-Light',
						}}
					>
						{otherParam}
					</Text>
				</ScrollView>
			</View>
			<View
				style={{
					flex: 1,
					backgroundColor: '#CE9EA8',
					padding: 10,
					borderRadius: 10,
				}}
			>
				<ScrollView style={{ flex: 1, color: '#02343F' }}>
					<Text style={{ fontSize: 23, fontFamily: 'SUITE-Light' }}>
						{answer.split('\n')[0]}
					</Text>
					<Text style={{ fontSize: 20, fontFamily: 'SUITE-Light' }}>
						{answer.split('\n')[1]}
					</Text>
				</ScrollView>
			</View>
			<View
				style={{
					flexDirection: 'row',
					marginLeft: 5,
					marginRight: 5,
					marginTop: 10,
					justifyContent: 'center',
				}}
			>
				<Pressable
					style={({ pressed }) => [
						styles.leftButton,
						{
							backgroundColor: pressed ? '#3f3f3f' : 'black', // 클릭 시 배경색 변경
						},
					]}
					onPress={() => {
						navigation.navigate('Main_Home');
					}}
				>
					<Text style={styles.text}>홈화면으로 이동하기</Text>
				</Pressable>
				<Pressable
					style={({ pressed }) => [
						styles.rightButton,
						{
							backgroundColor: pressed ? '#3f3f3f' : 'black', // 클릭 시 배경색 변경
						},
					]}
					onPress={() => {
						setModalVisible(true);
					}}
				>
					<Text style={styles.text}>내 오답노트에 추가하기</Text>
				</Pressable>
			</View>
			<DirModalPopup
				visibleState={modalVisible}
				onClose={() => setModalVisible(false)}
				navigation={navigation}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	leftButton: {
		width: '45%',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'black',
		marginRight: 10,
	},
	rightButton: {
		width: '45%',
		alignItems: 'center',
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: 'black',
	},
	text: {
		fontSize: 15,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
		fontFamily: 'SUITE-Medium',
	},
});

export default AIPage;
