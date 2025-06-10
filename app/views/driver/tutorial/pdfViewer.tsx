import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';



const { width, height } = Dimensions.get('window');

export default function PdfViewerScreen() {
  const router = useRouter();
  const { pdfUri } = useLocalSearchParams();

  if (!pdfUri) {
    Alert.alert("Error", "PDF URL is missing.");
    router.back();
    return null;
  }

  // Use Google Docs Viewer to display PDFs
  const googleDocsViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUri as string)}`;
  const source = { uri: googleDocsViewerUrl };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <WebView
        source={source}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          Alert.alert("Error", `Failed to load PDF: ${nativeEvent.description}`);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0, // Adjusted for full screen without extra top margin
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
}); 