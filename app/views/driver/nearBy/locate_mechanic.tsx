import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocateMechanicScreen() {
  const router = useRouter();
  const { coordinates, mechanicId } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const [driverLocation, setDriverLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [mechanicLocation, setMechanicLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  // Parse mechanic coordinates from params
  useEffect(() => {
    if (coordinates) {
      try {
        const [longitude, latitude] = JSON.parse(coordinates as string);
        setMechanicLocation({ latitude, longitude });
      } catch (error) {
        console.error('Error parsing mechanic coordinates:', error);
      }
    }
  }, [coordinates]);

  // Get driver's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setDriverLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const handleRecenter = () => {
    if (mapRef.current && driverLocation) {
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    }
  };

  const initialRegion = {
    latitude: driverLocation?.latitude || 7.555649,
    longitude: driverLocation?.longitude || 80.624989,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Locate the Mech</Text>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Your Location"
          />
        )}
        {mechanicLocation && (
          <Marker
            coordinate={mechanicLocation}
            title="Mechanic Location"
            pinColor="blue"
          />
        )}
        {driverLocation && mechanicLocation && (
          <Polyline
            coordinates={[driverLocation, mechanicLocation]}
            strokeColor="#8a2be2"
            strokeWidth={4}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <FontAwesome5 name="crosshairs" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
});
