import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const router = useRouter();
  const [showSmsOption, setShowSmsOption] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSmsOption(true);
    }, 120000); // 2 minutes (120000 milliseconds)

    return () => clearTimeout(timer);
  }, []);

  // TODO: Implement logic here to check for mechanic acceptance
  // If mechanic accepts, navigate to the next screen, e.g.,
  // router.push('/views/driver/call/mechanic_accepted');

  const handleSendSms = () => {
    setSmsSent(true);
    // TODO: Implement logic to send SMS here
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.alertText}>Alerts Sent out</Text>
        <Text style={styles.waitingText}>Waiting for a mechanic...</Text>

        {/* Placeholder for dotted circle animation */}
        <View style={styles.dottedCircle} />

        {showSmsOption && !smsSent && (
          <View style={styles.smsOptionContainer}>
            <Text style={styles.smsText}>
              No one is has responded, do you want to send a normal SMS (this may
              have additional charges? )
            </Text>
            <TouchableOpacity style={styles.smsButton} onPress={handleSendSms}>
              <Text style={styles.smsButtonText}>SMS</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentBox: {
    width: '100%',
    backgroundColor: '#222', // Slightly lighter dark box
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderColor: '#fff', // White border
    borderWidth: 2,
  },
  alertText: {
    fontSize: 24,
    color: '#fff', // White text
    fontFamily: 'monospace', // Closest to the UI font
    textAlign: 'center',
    marginBottom: 16,
  },
  waitingText: {
    fontSize: 20,
    color: '#fff', // White text
    fontFamily: 'monospace', // Closest to the UI font
    textAlign: 'center',
    marginBottom: 32,
  },
  dottedCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'red', // Red color
    borderStyle: 'dotted', // Dotted style
    marginBottom: 32,
  },
  smsOptionContainer: {
    alignItems: 'center',
  },
  smsText: {
    fontSize: 18,
    color: '#fff', // White text
    fontFamily: 'monospace', // Closest to the UI font
    textAlign: 'center',
    marginBottom: 20,
  },
  smsButton: {
    backgroundColor: '#a0c4ff', // Light blue background
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderColor: '#fff', // White border
    borderWidth: 2,
  },
  smsButtonText: {
    fontSize: 20,
    color: '#fff', // White text
    fontFamily: 'monospace', // Closest to the UI font
    fontWeight: 'bold',
  },
});
