import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker, Polyline } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocateMechanicScreen() {
  const router = useRouter();
  const { mechanicId } = useLocalSearchParams(); // Assuming mechanicId is passed as a param

  // TODO: State for driver and mechanic locations
  const [driverLocation, setDriverLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [mechanicLocation, setMechanicLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]); // Array of { latitude: number, longitude: number } for polyline

  // TODO: Fetch driver's current location
  useEffect(() => {
    // Implement logic to get the user's current location (e.g., using expo-location)
    // setDriverLocation(...) ;
  }, []);

  // TODO: Fetch mechanic's location (from backend or parameters)
  useEffect(() => {
    if (mechanicId) {
      // Implement logic to fetch mechanic location based on mechanicId
      // setMechanicLocation(...) ;
    }
  }, [mechanicId]);

  // TODO: Fetch route coordinates when both locations are available
  useEffect(() => {
    if (driverLocation && mechanicLocation) {
      // Implement logic to fetch route polyline using a Directions API (e.g., Google Directions API)
      // You might need another library or a direct API call for this.
      // Example (conceptual):
      // const fetchedRoute = await fetchRoute(driverLocation, mechanicLocation);
      // setRouteCoordinates(fetchedRoute);
    }
  }, [driverLocation, mechanicLocation]);

  // TODO: Center map on the route or between locations
  const initialRegion = {
    latitude: driverLocation?.latitude || 7.425649,
    longitude: driverLocation?.longitude || 80.624989,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Locate the Mech</Text>

      {/* Map View */}
      {/* Replace this View with your MapView component from react-native-maps */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        // Optionally center the map dynamically based on markers/route
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
            pinColor="blue" // Different color for mechanic marker
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates as any[]} // Cast to any[] to avoid type issues with empty array initially
            strokeWidth={4}
            strokeColor="#8a2be2" // Purple color for the route
          />
        )}
      </MapView>
      {/* TODO: Add a button here to recenter map on user location if needed (like in the UI) */}
      {/* Example button structure: */}
      {/*
      <TouchableOpacity style={styles.recenterButton}>
        <FontAwesome5 name="crosshairs" size={24} color="#000" />
      </TouchableOpacity>
      */}

      {/* Optional: Add a button or info display at the bottom if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e53935', // Red color
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
