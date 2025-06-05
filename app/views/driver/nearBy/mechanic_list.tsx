import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

// Placeholder mechanic data
const initialMechanics = [
  { id: '1', name: 'Hashin', distance: '100m', rating: 3 },
  { id: '2', name: 'Ramesh', distance: '150m', rating: 2 },
  { id: '3', name: 'Udesh', distance: '160m', rating: 1 },
  { id: '4', name: 'Gihantha', distance: '200m', rating: 3 },
  { id: '5', name: 'Saman', distance: '250m', rating: 2 },
  
  { id: '6', name: 'Udesh', distance: '160m', rating: 1 },
  { id: '7', name: 'Gihantha', distance: '200m', rating: 3 },
  { id: '8', name: 'Saman', distance: '250m', rating: 2 },
];

export default function MechanicListScreen() {
  const router = useRouter();
  const [mechanics, setMechanics] = useState(initialMechanics);

  const handleHire = (mechanicId: string) => {
    console.log('Hiring mechanic:', mechanicId);
    // TODO: Implement hire logic
    // Navigate to the next screen, e.g., confirmation or tracking page
    // router.push(`/views/driver/hire/${mechanicId}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Nearby Mechanics</Text>

      {/* Mechanic List */}
      <ScrollView style={styles.listContainer}>
        {mechanics.map((mechanic) => (
          <View key={mechanic.id}>
            <View style={styles.mechanicItem}>
              {/* Mechanic Icon Placeholder */}
              {/* Replace with an actual icon or image */}
              <View style={styles.mechanicIconPlaceholder} />

              <View style={styles.mechanicDetails}>
                <Text style={styles.mechanicName}>{mechanic.name}</Text>
                <Text style={styles.mechanicDistance}>{mechanic.distance}</Text>
                <View style={styles.starRatingContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome5
                      key={star}
                      name={'star'}
                      size={16}
                      color="#ffc107" // Yellow color for stars
                      solid={star <= mechanic.rating ? true : false}
                      style={styles.starIcon}
                    />
                  ))}
                </View>
              </View>

              {/* Hire Button */}
              <TouchableOpacity style={styles.hireButton} onPress={() => handleHire(mechanic.id)}>
                <Text style={styles.hireButtonText}>Hire</Text>
              </TouchableOpacity>
            </View>
            {/* Separator */}
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935', // Red color from previous UIs
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
  },
  mechanicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  mechanicIconPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#adb5bd', // Light gray placeholder
    borderRadius: 25,
    marginRight: 15,
    // Replace with actual icon/image
  },
  mechanicDetails: {
    flex: 1,
  },
  mechanicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529', // Dark text
    fontFamily: 'monospace',
  },
  mechanicDistance: {
    fontSize: 14,
    color: '#6c757d', // Gray text
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: 2,
  },
  hireButton: {
    backgroundColor: '#a0c4ff', // Light blue background
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007bff', // Blue border
  },
  hireButtonText: {
    fontSize: 16,
    color: '#212529', // Dark text
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#dee2e6', // Light gray line
    width: '100%',
    marginLeft: 65, // Align with mechanic details
  },
  backButton: {
    backgroundColor: '#a0c4ff', // Light blue background
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: '#007bff', // Blue border
    marginTop: 20,
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#212529', // Dark text
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});
