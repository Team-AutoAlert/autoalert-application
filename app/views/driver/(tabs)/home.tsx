import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, Platform } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { createSOSAlert } from '../../../services/driver/order_service';
import { updateUserLocation } from '../../../services/driver/user_service';
import * as Location from 'expo-location';

const Home = () => {
  const { userProfile, userId } = useAuth();
  const [breakdownDetails, setBreakdownDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const vehicle = userProfile?.driverDetails?.vehicles?.[0] || null;
  const vehicleDisplay = vehicle ? `${vehicle.brand} ${vehicle.model}` : 'N/A';
  const vehicleRegistrationNumber = vehicle?.registrationNumber || 'N/A';

  const checkLocationServices = async () => {
    try {
      const serviceEnabled = await Location.hasServicesEnabledAsync();
      if (!serviceEnabled) {
        setLocationError('Location services are disabled. Please enable location services in your device settings.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking location services:', error);
      setLocationError('Unable to check location services status.');
      return false;
    }
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission is required for this app to work properly.');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationError('Unable to request location permission.');
      return false;
    }
  };

  const getCurrentLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      return currentLocation;
    } catch (error) {
      console.error('Error getting current location:', error);
      setLocationError('Unable to get your current location. Please check your location settings and try again.');
      return null;
    }
  };

  const updateLocationInBackend = async (coordinates: [number, number]) => {
    try {
      const response = await updateUserLocation(userId!, coordinates);
      if (!response.success) {
        console.error('Failed to update location:', response.message);
        setLocationError('Location updated but failed to sync with server.');
      }
    } catch (error) {
      console.error('Error updating location in backend:', error);
      setLocationError('Failed to sync location with server.');
    }
  };

  const initializeLocation = useCallback(async () => {
    try {
      // Check if location services are enabled
      const servicesEnabled = await checkLocationServices();
      if (!servicesEnabled) return;

      // Request location permission
      const permissionGranted = await requestLocationPermission();
      if (!permissionGranted) return;

      // Get current location
      const currentLocation = await getCurrentLocation();
      if (!currentLocation) return;

      setLocation(currentLocation);
      setLocationError(null);

      // Update location in backend
      const coordinates: [number, number] = [
        currentLocation.coords.longitude,
        currentLocation.coords.latitude
      ];
      await updateLocationInBackend(coordinates);
    } catch (error) {
      console.error('Location initialization error:', error);
      setLocationError('An unexpected error occurred while getting your location.');
    }
  }, [userId]);

  useEffect(() => {
    let isMounted = true;

    const setupLocation = async () => {
      if (isMounted) {
        await initializeLocation();
      }
    };

    setupLocation();

    return () => {
      isMounted = false;
    };
  }, [initializeLocation]);

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

  const handleNearbyMechanics = () => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please try logging in again.');
      return;
    }

    if (vehicleRegistrationNumber === 'N/A') {
      Alert.alert('Error', 'Vehicle registration number not found. Please update your vehicle information.');
      return;
    }

    if (!breakdownDetails.trim()) {
      Alert.alert('Error', 'Please describe your problem before searching for mechanics.');
      return;
    }

    router.push({
      pathname: '/views/driver/nearBy/mechanic_list',
      params: {
        userId,
        vehicleRegistrationNumber,
        problemDescription: breakdownDetails
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#222" />
        <Text style={styles.headerTitle}>AUTO ALERT</Text>
        <Ionicons name="log-out-outline" size={28} color="#222" />
      </View>

      {/* Location Error Message */}
      {locationError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{locationError}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setLocationError(null);
              initializeLocation();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

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
        <TouchableOpacity 
          style={styles.nearbyButton}
          onPress={handleNearbyMechanics}
        >
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
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  retryButton: {
    backgroundColor: '#c62828',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});