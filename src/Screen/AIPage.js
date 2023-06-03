import { useEffect, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';

function AIPage({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  const [isResponse, setisResponse] = useState(false);
  const [answer, setAnswer] = useState('');

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
              "\n이 문제의 답과 해설을\n'답: (보기들 중 하나)\n해설: ~\n' 형식으로 알려줘",
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

  const handleData = () => {
    //answer.
  };

  useEffect(() => {
    handleSend();
    handleData();
  }, []);

  // 해야할점 : 데이터 token 수 조정하기
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DCE2F0',
      }}
    >
      <Text style={{ fontSize: 15, fontFamily: 'SUITE-Light' }}>
        {otherParam}
      </Text>

      <Text
        style={{
          fontSize: 25,
          fontFamily: 'SUITE-Medium',
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        인공지능 나인이 제공한 답과 해설이에요
      </Text>
      <Text style={{ fontSize: 23, fontFamily: 'SUITE-Light' }}>
        {answer.split('\n')[0]}
      </Text>
      <Text style={{ fontSize: 20, fontFamily: 'SUITE-Light' }}>
        {answer.split('\n')[2]}
      </Text>
    </SafeAreaView>
  );
}

export default AIPage;
