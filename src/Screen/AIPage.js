import { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';

function AIPage({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  const [isResponse, setisResponse] = useState(false);
  const [responseText, setResponseText] = useState('');
  const apiKey = process.env.OPENAI_API_KEY;

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
        messages: [{ role: 'user', content: inputText }],
        max_tokens: 600,
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const responseData = data.choices[0].message.content.trim();
        setResponseText(responseData);
      })
      .catch((error) => {
        // 에러 발생시 조치하기
        console.error(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#DCE2F0',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 15 }}>{otherParam}</Text>
    </SafeAreaView>
  );
}

export default AIPage;
