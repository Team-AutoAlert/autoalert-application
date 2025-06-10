import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { checkHireRequestStatus } from '../../../services/driver/order_service';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HiringLoadingScreen() {
  const router = useRouter();
  const { hireRequestId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // Log request ID when component mounts
  useEffect(() => {
    console.log('Loading screen mounted with hireRequestId:', hireRequestId);
  }, []);

  const checkStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Checking status for hireRequestId:', hireRequestId);
      console.log('Request URL:', `http://localhost:3007/api/nearby-mechanics/requests/status/${hireRequestId}`);
      
      const response = await checkHireRequestStatus(hireRequestId as string);
      console.log('Status check response:', JSON.stringify(response, null, 2));
      
      if (response.success && response.data.status === 'accepted') {
        console.log('Mechanic accepted. Navigating to locate screen with coordinates:', response.data.mechanic.coordinates);
        router.replace({
          pathname: '/views/driver/nearBy/locate_mechanic',
          params: { 
            coordinates: JSON.stringify(response.data.mechanic.coordinates),
            mechanicId: response.data.mechanic.mechanicId
          }
        });
      } else {
        console.log('Current status:', response.data.status);
      }
      setLastChecked(new Date());
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to check status';
      console.error('Error checking status:', {
        error: err,
        message: errorMessage,
        hireRequestId,
        requestUrl: `http://localhost:3007/api/nearby-mechanics/requests/status/${hireRequestId}`,
        timestamp: new Date().toISOString()
      });
      setError(`${errorMessage}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hireRequestId) {
      console.error('No hireRequestId provided in params');
      setError('No hire request ID provided');
      return;
    }
    
    checkStatus();
    // Set up polling every 10 seconds
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [hireRequestId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hiring Mechanic</Text>
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={styles.spinner} />
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={checkStatus}>
              <FontAwesome5 name="sync" size={24} color="#007bff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton} onPress={checkStatus}>
              <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.loadingText}>Waiting for mechanic to accept...</Text>
        {lastChecked && (
          <Text style={styles.lastCheckedText}>
            Last checked: {lastChecked.toLocaleTimeString()}
          </Text>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935',
    fontFamily: 'monospace',
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#212529',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginTop: 20,
  },
  lastCheckedText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10,
  },
  textButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  errorContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ffebee',
    borderRadius: 5,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
});
