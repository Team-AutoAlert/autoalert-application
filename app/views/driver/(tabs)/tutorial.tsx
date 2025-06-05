import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const tutorials = [
  { id: 1, title: 'Tutorial 01' },
  { id: 2, title: 'Tutorial 02' },
  { id: 3, title: 'Tutorial 03' },
  { id: 4, title: 'Tutorial 04' },
  { id: 5, title: 'Tutorial 05' },
  { id: 6, title: 'Tutorial 01' },
  { id: 7, title: 'Tutorial 02' },
  { id: 8, title: 'Tutorial 03' },
  { id: 9, title: 'Tutorial 04' },
  { id: 10, title: 'Tutorial 05' },
];

const Tutorial = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Maintain Tutorials</Text>
      {/* Scrollable List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true}>
        {tutorials.map((item, idx) => (
          <View key={item.id} style={styles.tutorialItem}>
            <Image
              source={{ uri: 'https://img.icons8.com/color/48/video-lesson.png' }}
              style={styles.tutorialIcon}
            />
            <Text style={styles.tutorialText}>{item.title}</Text>
          </View>
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