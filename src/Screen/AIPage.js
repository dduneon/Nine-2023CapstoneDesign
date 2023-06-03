import { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';

function AIPage({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  const [isLoaded, setLoaded] = useState(false);
  const [receiveData, setReceiveData] = useState('');
  const apiKey = process.env.OPENAI_API_KEY;

  console.log('[AIPage.js] AIPage Loaded');
  console.log('[AIPage.js] api key: ' + apiKey);

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
