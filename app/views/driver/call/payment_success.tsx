import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSendFeedback = () => {
    console.log('Sending feedback:', { rating, feedback: feedbackText });
    // TODO: Implement logic to send feedback (rating and text)
    // After sending feedback, you might navigate back or to another screen
    // router.push('/some/next/page');
  };

  return (
    <View style={styles.container}>
      {/* Payment Successful Section */}
      <FontAwesome5 name="check-circle" size={80} color="#28a745" style={styles.checkmarkIcon} />
      <Text style={styles.successText}>Payment Successful</Text>

      {/* Feedback Section */}
      <Text style={styles.feedbackTitle}>Give your Feedback to the Mechanic</Text>
      
      {/* Star Rating */}
      <View style={styles.starRatingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <FontAwesome5
              name={star <= rating ? 'star' : 'star'}
              size={40}
              color="#ffc107" // Yellow color for stars
              style={styles.starIcon}
              solid={star <= rating ? true : false} 
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Text Input */}
      <Text style={styles.feedbackLabel}>Feedback</Text>
      <TextInput
        style={styles.feedbackInput}
        multiline
        numberOfLines={4}
        value={feedbackText}
        onChangeText={setFeedbackText}
        placeholder="Type your feedback here"
        placeholderTextColor="#aaa"
      />

      {/* Send Button */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  checkmarkIcon: {
    marginBottom: 20,
  },
  successText: {
    fontSize: 28,
    color: '#28a745', // Green text
    fontFamily: 'monospace',
    marginBottom: 60,
  },
  feedbackTitle: {
    fontSize: 24,
    color: '#fff', // White text
    fontFamily: 'monospace',
    marginBottom: 20,
    textAlign: 'center',
  },
  starRatingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 2,
  },
  feedbackLabel: {
    fontSize: 18,
    color: '#fff', // White text
    fontFamily: 'monospace',
    marginBottom: 8,
    width: '100%',
    textAlign: 'left',
  },
  feedbackInput: {
    width: '100%',
    height: 120,
    backgroundColor: '#a0c4ff', // Light blue background
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#222', // Dark text
    fontFamily: 'monospace',
    marginBottom: 30,
    textAlignVertical: 'top', // Align text to the top for multiline
  },
  sendButton: {
    backgroundColor: '#a0c4ff', // Light blue background
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderColor: '#fff', // White border
    borderWidth: 2,
  },
  sendButtonText: {
    fontSize: 20,
    color: '#fff', // White text
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});
