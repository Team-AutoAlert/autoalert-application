import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocateDriverScreen() {
  const router = useRouter();
  const { driverId } = useLocalSearchParams(); // assuming driverId is passed
  const { lat, lng } = useLocalSearchParams();
  const { jobId, mechanicId } = useLocalSearchParams();
  const [mechanicLocation, setMechanicLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [driverLocation, setDriverLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Helper function to check if locations are close enough
  const areLocationsEqual = (
    loc1: { latitude: number; longitude: number },
    loc2: { latitude: number; longitude: number },
    tolerance = 0.0005
  ) => {
    return (
      Math.abs(loc1.latitude - loc2.latitude) < tolerance &&
      Math.abs(loc1.longitude - loc2.longitude) < tolerance
    );
  };

  // Get mechanic's current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setMechanicLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Simulate driver location (or fetch from backend)
  useEffect(() => {
    // TODO: Replace this with actual driver location via API
    setDriverLocation({
    latitude: parseFloat(lat as string),
    longitude: parseFloat(lng as string),
    });
  }, [driverId]);

  // Watch for arrival condition
  useEffect(() => {
  if (driverLocation && mechanicLocation) {
    if (areLocationsEqual(driverLocation, mechanicLocation)) {
      router.replace({
        pathname: '/views/mechanic/job_complete',
        params: {
          jobId,
          mechanicId,
        },
      });
    } else {
      const timeout = setTimeout(() => {
        router.replace({
          pathname: '/views/mechanic/job_complete',
          params: {
            jobId,
            mechanicId,
          },
        });
      }, 30000); // 30 seconds

      return () => clearTimeout(timeout); // cleanup on location change
    }
  }
}, [driverLocation, mechanicLocation]);

  const initialRegion = {
    latitude: mechanicLocation?.latitude || 7.556,
    longitude: mechanicLocation?.longitude || 80.625,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Locate the Driver</Text>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {mechanicLocation && (
          <Marker
            coordinate={mechanicLocation}
            title="Mechanic"
            description="This is the mechanic"
            pinColor="blue" // blue pin for mechanic
          />
        )}
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Driver"
            description="This is the driver"
            pinColor="red" // red/default pin for driver
          />
        )}

        {mechanicLocation && driverLocation && (
          <MapViewDirections
            origin={mechanicLocation}
            destination={driverLocation}
            apikey="YOUR_GOOGLE_MAPS_DIRECTIONS_API_KEY"
            strokeWidth={4}
            strokeColor="#00BFFF"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ade80',
    textAlign: 'center',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
