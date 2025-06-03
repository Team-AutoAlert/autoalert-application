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


