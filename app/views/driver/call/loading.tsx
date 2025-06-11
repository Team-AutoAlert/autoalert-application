import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { checkSOSAlertStatus } from '../../../services/driver/order_service';

const LoadingScreen = () => {
  const params = useLocalSearchParams();
  const [showSmsOption, setShowSmsOption] = useState(false);
  const [smsSent, setSmsSent] = useState(false);

  useEffect(() => {
    // Set a timer to show SMS options after 2 minutes
    const smsTimer = setTimeout(() => {
      setShowSmsOption(true);
    }, 120000); // 2 minutes

    // Poll for alert status every 5 seconds
    const pollInterval = setInterval(async () => {
      try {
        const response = await checkSOSAlertStatus(params.alertId as string);
        
        if (response.success && response.data.status === 'in_progress') {
          // Mechanic has accepted the alert
          clearInterval(pollInterval);
          clearTimeout(smsTimer);
          
          router.replace({
            pathname: '/views/call/call-view',
            params: {
              role: 'driver',
              alertId: params.alertId,
              mechanicId: params.mechanicId,
              issue: params.issue,
              callType: params.callType,
            },
          });
        }
      } catch (error) {
        console.error('Error checking alert status:', error);
      }
    }, 5000); // Check every 5 seconds

    return () => {
      clearInterval(pollInterval);
      clearTimeout(smsTimer);
    };
  }, [params.alertId]);

  const handleSendSms = () => {
    setSmsSent(true);
    // TODO: Implement SMS sending logic
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
              No one has responded, do you want to send a normal SMS (this may
              have additional charges)?
            </Text>
            <TouchableOpacity style={styles.smsButton} onPress={handleSendSms}>
              <Text style={styles.smsButtonText}>SMS</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  contentBox: {
    width: '100%',
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
  },
  alertText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 16,
  },
  waitingText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 32,
  },
  dottedCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'red',
    borderStyle: 'dotted',
    marginBottom: 32,
  },
  smsOptionContainer: {
    alignItems: 'center',
  },
  smsText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 20,
  },
  smsButton: {
    backgroundColor: '#a0c4ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderColor: '#fff',
    borderWidth: 2,
  },
  smsButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});

export default LoadingScreen;
