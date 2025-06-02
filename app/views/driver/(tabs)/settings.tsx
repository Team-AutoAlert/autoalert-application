import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const Settings = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Settings</Text>
      {/* Mechanic Icon */}
      <Image
        source={{ uri: 'https://img.icons8.com/color/96/worker-male--v2.png' }}
        style={styles.mechanicIcon}
      />
      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('../../driver/settings/payment_method')}>
        <Text style={styles.buttonText}>Payment Method</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Vehicle Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>User Profile</Text>
      </TouchableOpacity>
      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    fontSize: 38,
    color: '#e53935',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 18,
  },
  mechanicIcon: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#b3e5fc',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginVertical: 10,
    width: 270,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  signOutButton: {
    marginTop: 40,
  },
  signOutText: {
    color: '#e53935',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});