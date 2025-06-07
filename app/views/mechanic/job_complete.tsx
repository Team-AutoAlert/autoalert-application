import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const JobComplete = () => {
  const handleJobComplete = () => {
    router.push('/views/mechanic/create_bill');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 20, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        alignItems: 'center',
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>Location Reached</Text>
        <Text style={{ fontSize: 16, color: '#374151', marginBottom: 24 }}>
          You have arrived at the driver’s location.
        </Text>

        <TouchableOpacity
          onPress={handleJobComplete}
          style={{
            backgroundColor: '#10b981',
            paddingVertical: 14,
            paddingHorizontal: 40,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Job Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobComplete;
