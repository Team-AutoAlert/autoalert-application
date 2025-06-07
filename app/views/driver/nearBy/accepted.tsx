import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MechanicAcceptedScreen() {
  const router = useRouter();
  const { mechanicName } = useLocalSearchParams();

  const handleLocateMechanic = () => {
    console.log('Locating mechanic...');
    // TODO: Implement logic to show mechanic location on a map
    // This would likely involve navigating to a map screen and displaying the mechanic's coordinates
    // router.push('/views/driver/map', { mechanicId: 'someId' }); // Example
  };

  return (
    <View style={styles.container}>
      {/* User Icon Placeholder */}
      <View style={styles.userIconPlaceholder}>
        <FontAwesome5 name="user" size={60} color="#fff" />
      </View>

      {/* Accepted Box */}
      <View style={styles.acceptedBox}>
        <Text style={styles.acceptedText}>{(mechanicName as string) || 'Mechanic'} Accepted</Text>
        <Text style={styles.locationSharedText}>your location has shared with the mechanic</Text>
      </View>

      {/* Locate Button */}
      <TouchableOpacity style={styles.locateButton} onPress={handleLocateMechanic}>
        <Text style={styles.locateButtonText}>Locate the Mechanic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background (matching UI)
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  userIconPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6c757d', // Placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  acceptedBox: {
    backgroundColor: '#343a40', // Dark gray background
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderColor: '#fff', // White border
    borderWidth: 2,
    marginBottom: 40,
  },
  acceptedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745', // Green text
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  locationSharedText: {
    fontSize: 18,
    color: '#fff', // White text
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  locateButton: {
    backgroundColor: '#a0c4ff', // Light blue background
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
  },
  locateButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222', // Dark text
    fontFamily: 'monospace',
    textAlign: 'center',
  },
}); 