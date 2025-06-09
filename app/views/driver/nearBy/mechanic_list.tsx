import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { getNearbyMechanics } from '../../../services/driver/order_service';

interface Mechanic {
  _id: string;
  firstName: string;
  lastName: string;
  distance: {
    meters: number;
    kilometers: string;
  };
  status: string;
  profilePicture: string | null;
}

export default function MechanicListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId, vehicleRegistrationNumber, problemDescription } = params;

  useEffect(() => {
    fetchNearbyMechanics();
  }, []);

  const fetchNearbyMechanics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNearbyMechanics(userId as string);
      
      if (response.success) {
        setMechanics(response.data);
      } else {
        setError('Failed to fetch nearby mechanics');
      }
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      setError('Failed to load nearby mechanics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHire = (mechanicId: string) => {
    console.log('Hiring mechanic:', mechanicId);
    // TODO: Implement hire logic with the stored problem description and vehicle info
    router.push({
      pathname: '../hire',
      params: {
        mechanicId,
        problemDescription,
        vehicleRegistrationNumber,
        userId
      }
    });
  };

  const handleBack = () => {
    router.back();
  };

  const renderMechanicList = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e53935" />
          <Text style={styles.loadingText}>Finding nearby mechanics...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchNearbyMechanics}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (mechanics.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No mechanics found nearby</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.listContainer}>
        {mechanics.map((mechanic) => (
          <View key={mechanic._id}>
            <View style={styles.mechanicItem}>
              <View style={styles.mechanicIconPlaceholder}>
                {mechanic.profilePicture ? (
                  <Image 
                    source={{ uri: mechanic.profilePicture }} 
                    style={styles.mechanicImage}
                  />
                ) : (
                  <FontAwesome5 name="user" size={24} color="#fff" />
                )}
              </View>

              <View style={styles.mechanicDetails}>
                <Text style={styles.mechanicName}>
                  {mechanic.firstName} {mechanic.lastName}
                </Text>
                <Text style={styles.mechanicDistance}>
                  {mechanic.distance.kilometers} km away
                </Text>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusIndicator,
                    { backgroundColor: mechanic.status === 'active' ? '#4caf50' : '#ff9800' }
                  ]} />
                  <Text style={styles.statusText}>
                    {mechanic.status === 'active' ? 'Available' : 'Busy'}
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[
                  styles.hireButton,
                  mechanic.status !== 'active' && styles.hireButtonDisabled
                ]} 
                onPress={() => handleHire(mechanic._id)}
                disabled={mechanic.status !== 'active'}
              >
                <Text style={styles.hireButtonText}>Hire</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Nearby Mechanics</Text>
      {renderMechanicList()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#e53935',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  retryButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  hireButtonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#999',
  },
  mechanicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
});
