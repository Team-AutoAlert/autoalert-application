import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const tutorials = [
  { id: 1, title: 'Tutorial 01', link: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' },
  { id: 2, title: 'Tutorial 02', link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
  { id: 3, title: 'Tutorial 03', link: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
  { id: 4, title: 'Tutorial 04', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerEscapes.mp4' },
  { id: 5, title: 'Tutorial 05', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerFun.mp4' },
  { id: 6, title: 'Tutorial 06', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerJoyrides.mp4' },
  { id: 7, title: 'Tutorial 07', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/ForBiggerMeltdowns.mp4' },
  { id: 8, title: 'Tutorial 08', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/Sintel.mp4' },
  { id: 9, title: 'Tutorial 09', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/SubaruOutbackOnStreetAndDirt.mp4' },
  { id: 10, title: 'Tutorial 10', link: 'http://commondatastorage.googleapis.com/gtv-uploads/sample/TearsOfSteel.mp4' },
];

const Tutorial = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Maintain Tutorials</Text>
      {/* Scrollable List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        {tutorials.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => router.push({ pathname: '/views/driver/tutorial/videoPlayer', params: { videoUri: item.link } })}>
            <View style={styles.tutorialItem}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/video-lesson.png' }}
                style={styles.tutorialIcon}
              />
              <Text style={styles.tutorialText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
  backButton: {
    backgroundColor: '#b3e5fc',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#fff',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});