import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { createSOSAlert } from '../../../services/driver/order_service';

const Home = () => {
  const { userProfile, userId } = useAuth();
  const [breakdownDetails, setBreakdownDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const vehicle = userProfile?.driverDetails?.vehicles?.[0] || null;
  const vehicleDisplay = vehicle ? `${vehicle.brand} ${vehicle.model}` : 'N/A';
  const vehicleRegistrationNumber = vehicle?.registrationNumber || 'N/A';

  const handleSOSPress = async () => {
    if (!breakdownDetails.trim()) {
      Alert.alert('Error', 'Please describe your problem before sending SOS');
      return;
    }

    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please try logging in again.');
      return;
    }

    if (vehicleRegistrationNumber === 'N/A') {
      Alert.alert('Error', 'Vehicle registration number not found. Please update your vehicle information.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await createSOSAlert(breakdownDetails, userId, vehicleRegistrationNumber);
      
      if (response.success) {
        // Navigate to loading screen with the alert ID
        router.push({
          pathname: '../../driver/call/loading',
          params: { alertId: response.data._id }
        });
      } else {
        Alert.alert('Error', response.message || 'Failed to create SOS alert');
      }
    } catch (error) {
      console.error('SOS Alert Error:', error);
      Alert.alert('Error', 'Failed to create SOS alert. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#222" />
        <Text style={styles.headerTitle}>AUTO ALERT</Text>
        <Ionicons name="log-out-outline" size={28} color="#222" />
      </View>

      {/* Map/Mechanic/SOS Section */}
      <View style={styles.mapSection}>
        <View style={styles.jobsOngoing}>
          <MaterialIcons name="work" size={18} color="green" />
          <Text style={styles.jobsText}>Jobs Ongoing</Text>
        </View>
        <View style={styles.mapImageContainer}>
          {/* Replace with your own image or illustration */}
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/marker.png' }}
            style={styles.mapImage}
          />
          <TouchableOpacity 
            style={[styles.sosButton, isLoading && styles.sosButtonDisabled]}
            onPress={handleSOSPress}
            disabled={isLoading}
          >
            <Text style={styles.sosButtonText}>{isLoading ? 'Sending...' : 'SOS'}</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/worker-male.png' }}
            style={styles.mechanicImage}
          />
        </View>
      </View>

      {/* Vehicle Info */}
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleLabel}>Vehicle</Text>
        <Text style={styles.vehicleName}>{vehicleDisplay}</Text>
        <Text style={styles.vehicleRegistration}>({vehicleRegistrationNumber})</Text>
        <Ionicons name="ellipse" size={12} color="green" style={{ marginLeft: 6 }} />
      </View>

      {/* Problem Input */}
      <View style={styles.problemInputContainer}>
        <TextInput
          style={styles.problemInput}
          placeholder="What's the problem you are facing?"
          placeholderTextColor="#b0b0b0"
          value={breakdownDetails}
          onChangeText={setBreakdownDetails}
          multiline
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.nearbyButton}>
          <Text style={styles.nearbyButtonText}>Nearby Mechanics</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sosMainButton, isLoading && styles.sosButtonDisabled]}
          onPress={handleSOSPress}
          disabled={isLoading}
        >
          <Text style={styles.sosMainButtonText}>{isLoading ? 'Sending...' : 'SOS'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 24,
    color: '#e53935',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  mapSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  jobsOngoing: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f4ea',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 10,
  },
  jobsText: {
    color: '#222',
    fontSize: 15,
    marginLeft: 6,
    fontFamily: 'monospace',
  },
  mapImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 120,
  },
  mapImage: {
    width: 90,
    height: 90,
    position: 'absolute',
    left: 10,
    top: 10,
    opacity: 0.7,
  },
  sosButton: {
    backgroundColor: '#ff5252',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: 70,
    elevation: 3,
  },
  sosButtonDisabled: {
    backgroundColor: '#ffb3b3',
    opacity: 0.7,
  },
  sosButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  mechanicImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 0,
    opacity: 0.9,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  vehicleLabel: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  vehicleName: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  vehicleRegistration: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  problemInputContainer: {
    marginBottom: 18,
  },
  problemInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#222',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  nearbyButton: {
    backgroundColor: '#b3e5fc',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sosMainButton: {
    backgroundColor: '#ffe0e0',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 18,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosMainButtonText: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 18,
  },
});