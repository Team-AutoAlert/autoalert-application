import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

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
    issue: 'Engine overheating on highway',
    callType: 'audio',
  },
  {
    id: 2,
    name: 'Mr. Silva',
    vehicle: 'Toyota Axio',
    issue: 'Flat tire near Colombo',
    callType: 'video',
  },
  {
    id: 3,
    name: 'Mr. Perera',
    vehicle: 'Suzuki Wagon R',
    issue: 'Battery not starting',
    callType: 'audio',
  },
  {
    id: 4,
    name: 'Mr. Fernando',
    vehicle: 'Suzuki Wagon R',
    issue: 'Battery not starting',
    callType: 'audio',
  },
];

const SOSAlerts = () => {
  const handleAccept = (alert: Alert) => {
   // router.push('/views/mechanic/callScreen');
   router.push({
    pathname: '/views/mechanic/callScreen',
    params: {
      id: alert.id.toString(),
      name: alert.name,
      vehicle: alert.vehicle,
      issue: alert.issue,
      callType: alert.callType,
    },
  });

  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <View style={{ padding: 20, backgroundColor: '#1F2937' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF' }}>🚨 SOS Alerts</Text>
        <Text style={{ fontSize: 14, color: '#D1D5DB', marginTop: 4 }}>
          Active emergency requests from drivers
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {dummyAlerts.map((alert) => (
          <View
            key={alert.id}
            style={{
              marginBottom: 16,
              padding: 16,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#111827' }}>{alert.name}</Text>
              <Text style={{ color: '#6B7280', fontSize: 14 }}>{alert.vehicle}</Text>
              <Text style={{ color: '#374151', fontSize: 14, marginTop: 4 }}>{alert.issue}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => handleAccept(alert)}
                style={{
                  backgroundColor: '#EF4444',
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Accept Alert</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 26 }}>{alert.callType === 'video' ? '📹' : '🎤'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      

    </View>
  );
};

export default SOSAlerts;
