import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function HiringLoadingScreen() {
  const router = useRouter();

  // TODO: Implement logic here to listen for the mechanic's acceptance
  // When the mechanic accepts, navigate to the accepted screen
  // Example navigation (replace with actual mechanic ID/data):
  // const mechanicId = 'someMechanicId'; // Get this from the hire request response or state
  // useEffect(() => {
  //   const checkAcceptance = async () => {
  //     const isAccepted = await checkMechanicAcceptance(mechanicId); // Your function to check acceptance
  //     if (isAccepted) {
  //       const mechanicName = await getMechanicName(mechanicId); // Your function to get mechanic name
  //       router.replace({
  //         pathname: '/views/driver/nearBy/accepted',
  //         params: { mechanicName: mechanicName },
  //       });
  //     }
  //   };
  //   const interval = setInterval(checkAcceptance, 5000); // Poll every 5 seconds (adjust as needed)
  //   return () => clearInterval(interval);
  // }, [mechanicId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hiring Mechanic</Text>
      <ActivityIndicator size="large" color="#007bff" style={styles.spinner} />
      <Text style={styles.loadingText}>Waiting for mechanic to accept...</Text>
      {/* Optionally add a cancel button here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935', // Red color
    fontFamily: 'monospace',
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#212529', // Dark text
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
