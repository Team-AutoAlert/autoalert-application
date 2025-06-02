import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons'; // Using FontAwesome5 for icons

export default function AlertAcceptScreen() {
  const router = useRouter();

  // Placeholder mechanic data (replace with actual data from your state/backend)
  const mechanicName = "David White";

  const handleVoiceCall = () => {
    console.log('Initiating voice call');
    // TODO: Implement voice call initiation logic (using Twilio API)
  };

  const handleVideoCall = () => {
    console.log('Initiating video call');
    // TODO: Implement video call initiation logic (using Twilio API)
  };

  return (
    <View style={styles.container}>
      {/* Mechanic Accepted Header */}
      <View style={styles.acceptedHeader}>
        <Text style={styles.acceptedHeaderText}>Mechanic</Text>
        <Text style={styles.acceptedHeaderText}>Accepted</Text>
      </View>

      {/* Mechanic Icon Placeholder */}
      {/* Replace with an actual icon or image */}
      <View style={styles.mechanicIconPlaceholder} />

      {/* Mechanic Name */}
      <Text style={styles.mechanicName}>{mechanicName}</Text>

      {/* Question Text */}
      <Text style={styles.questionText}>What type of help you expect?</Text>

      {/* Call Options Buttons */}
      <View style={styles.callButtonsContainer}>
        {/* Voice Call Button */}
        <TouchableOpacity style={styles.voiceCallButton} onPress={handleVoiceCall}>
          <FontAwesome5 name="phone-alt" size={36} color="#666" />
        </TouchableOpacity>

        {/* Video Call Button */}
        <TouchableOpacity style={styles.videoCallButton} onPress={handleVideoCall}>
          <FontAwesome5 name="video" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343a40', // Dark gray background
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  acceptedHeader: {
    backgroundColor: '#28a745', // Green background
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  acceptedHeaderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222', // Dark text
    fontFamily: 'monospace', // Closest to UI font
  },
  mechanicIconPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#6c757d', // Placeholder color
    borderRadius: 40,
    marginBottom: 20,
    // You would replace this with an Image or Icon component
  },
  mechanicName: {
    fontSize: 24,
    color: '#fff', // White text
    fontFamily: 'monospace',
    marginBottom: 30,
  },
  questionText: {
    fontSize: 20,
    color: '#fff', // White text
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 60,
  },
  callButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  voiceCallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e9ecef', // Light gray background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff', // White border
  },
  videoCallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#28a745', // Green background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff', // White border
  },
});
