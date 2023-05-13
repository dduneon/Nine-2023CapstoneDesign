import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_KEY = 'your_api_key';
const OCR_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export default function App() {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Camera permission denied');
      }
    })();
  }, []);

  const handleOCR = async () => {
    try {
      const base64Image = await convertImageToBase64(imageUri);
      console.log(OCR_API_URL, base64Image);
      const response = await fetch(OCR_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                { type: 'LABEL_DETECTION', maxResults: 10 },
                { type: 'TEXT_DETECTION', maxResults: 5 },
                { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      const extractedText = data.responses[0].fullTextAnnotations[0].text;
      console.log(extractedText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    const response = await fetch(imageUri[0]);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={handleImagePicker} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="OCR" onPress={handleOCR} />
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
