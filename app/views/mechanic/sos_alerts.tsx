import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface Alert {
  id: number;
  name: string;
  vehicle: string;
  issue: string;
  callType: 'audio' | 'video';
}

const dummyAlerts: Alert[] = [
  {
    id: 1,
    name: 'Mr. Kumar',
    vehicle: 'Honda Grace',
    issue: 'Breakdown details',
    callType: 'audio',
  },
  {
    id: 2,
    name: 'Mr. Silva',
    vehicle: 'Honda Grace',
    issue: 'Breakdown details',
    callType: 'video',
  },
  {
    id: 3,
    name: 'Mr. Perera',
    vehicle: 'Honda Grace',
    issue: 'Breakdown details',
    callType: 'audio',
  },
];

const SOSAlerts = () => {
  const handleAccept = (alert: Alert) => {
    router.push('/views/mechanic/callScreen');
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>SOS Alerts</Text>
      {dummyAlerts.map((alert) => (
        <View
          key={alert.id}
          style={{
            marginBottom: 16,
            padding: 16,
            borderRadius: 8,
            backgroundColor: '#f3f3f3',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{alert.name}</Text>
          <Text style={{ color: '#555' }}>{alert.vehicle}</Text>
          <Text style={{ color: '#555', marginBottom: 8 }}>{alert.issue}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => handleAccept(alert)}
              style={{
                backgroundColor: '#EF4444',
                paddingVertical: 6,
                paddingHorizontal: 16,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: '#fff' }}>Accept</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 24 }}>{alert.callType === 'video' ? '📹' : '🎤'}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SOSAlerts;
