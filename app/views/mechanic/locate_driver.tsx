import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const LocateDriver = () => {
  const [distance, setDistance] = useState(5.0); // in kilometers
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setDistance((prevDistance) => {
        if (prevDistance <= 0.1) {
          clearInterval(id);
          setTimeout(() => {
            router.push('/views/mechanic/job_complete');
          }, 1000);
          return 0;
        }
        return +(prevDistance - 0.1).toFixed(1);
      });
    }, 1000);

    setIntervalId(id);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Locating the Driver...</Text>

      <View style={styles.card}>
        <FontAwesome5 name="map-marker-alt" size={32} color="#1D4ED8" />
        <Text style={styles.distanceText}>Distance to Driver: {distance} km</Text>
      </View>

      <View style={styles.card}>
        <MaterialCommunityIcons name="car" size={32} color="#10B981" />
        <Text style={styles.label}>Mechanic is on the way</Text>
      </View>

      <TouchableOpacity
        style={styles.manualCompleteBtn}
        onPress={() => {
          Alert.alert('Manual Override', 'Jumping to Job Complete page.', [
            {
              text: 'OK',
              onPress: () => router.push('/views/mechanic/job_complete'),
            },
          ]);
        }}
      >
        <Text style={styles.manualCompleteBtnText}>Skip to Job Complete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocateDriver;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  distanceText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#334155',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#475569',
  },
  manualCompleteBtn: {
    marginTop: 40,
    backgroundColor: '#ef4444',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  manualCompleteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
