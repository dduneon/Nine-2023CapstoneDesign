import { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';

function AILoadingPage({ navigation, route }) {
  const { itemId, otherParam } = route.params;
  const [isLoaded, setLoaded] = useState(false);
  const [receiveData, setReceiveData] = useState('');

  const goAIPage = () => {
    navigation.navigate('AI', {
      itemId: 3000,
      otherParam: receiveData,
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

export default AILoadingPage;
