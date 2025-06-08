import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchTutorials } from '../../../services/driver/tutorial_service';

// Remove static tutorials data as it will be fetched from the API
// const tutorials = [
//   { id: 1, title: 'Tutorial 01', link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
//   { id: 2, title: 'Tutorial 02', link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
//   { id: 3, title: 'Tutorial 03', link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
//   { id: 4, title: 'Tutorial 04', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerEscapes.mp4' },
//   { id: 5, title: 'Tutorial 05', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerFun.mp4' },
//   { id: 6, title: 'Tutorial 06', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerJoyrides.mp4' },
//   { id: 7, title: 'Tutorial 07', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerMeltdowns.mp4' },
//   { id: 8, title: 'Tutorial 08', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/Sintel.mp4' },
//   { id: 9, title: 'Tutorial 09', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/SubaruOutbackOnStreetAndDirt.mp4' },
//   { id: 10, title: 'Tutorial 10', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/TearsOfSteel.mp4' },
// ];

const Tutorial = () => {
  const router = useRouter();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTutorials = async () => {
      const result = await fetchTutorials();
      if (result.success) {
        setTutorials(result.tutorials);
      } else {
        setError(result.message);
        Alert.alert("Error", result.message);
      }
      setLoading(false);
    };
    getTutorials();
  }, []);

  const handleTutorialPress = (item: any) => {
    if (item.type === 'video') {
      router.push({ pathname: '/views/driver/tutorial/videoPlayer', params: { videoUri: item.fileUrl } });
    } else if (item.type === 'pdf') {
      router.push({ pathname: '/views/driver/tutorial/pdfViewer', params: { pdfUri: item.fileUrl } });
    } else {
      Alert.alert("Error", "Unsupported tutorial type.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#e53935" />
        <Text style={styles.loadingText}>Loading Tutorials...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => setLoading(true)} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Maintain Tutorials</Text>
      {/* Scrollable List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        {tutorials.length > 0 ? (tutorials.map((item: any) => (
          <TouchableOpacity key={item._id} onPress={() => handleTutorialPress(item)}>
            <View style={styles.tutorialItem}>
              <Image
                source={{ uri: item.thumbnailUrl || 'https://img.icons8.com/color/48/video-lesson.png' }} // Use item.thumbnailUrl if available
                style={styles.tutorialIcon}
              />
              <View style={styles.tutorialInfo}>
                <Text style={styles.tutorialText}>{item.title}</Text>
                <Text style={styles.tutorialDescription}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))) : (
          <Text style={styles.noTutorialsText}>No tutorials available.</Text>
        )}
      </ScrollView>
      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#e53935',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 18,
    textAlign: 'center',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    maxHeight: '90%',
    marginBottom: 18,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 8,
    width: 320,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 2,
    borderColor: '#fff',
  },
  tutorialIcon: {
    width: 48,
    height: 48,
    marginRight: 18,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  tutorialText: {
    fontSize: 22,
    color: '#222',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  tutorialInfo: {
    flex: 1,
  },
  tutorialDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#222',
    fontFamily: 'monospace',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#b3e5fc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  noTutorialsText: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'monospace',
    marginTop: 50,
  },
});