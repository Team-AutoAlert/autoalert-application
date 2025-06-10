import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { getActiveSOSAlerts, acceptSOSAlert, Alert } from '../../services/mechanic/order_service';


interface Alert {
  _id: string;
  driverId: string;
  vehicleId: string;
  status: string;
  communicationMode: 'audio' | 'video';
  breakdownDetails: string;
  requiredSpecializations: string[];
  matchedMechanicIds: string[];
  mechanicId: string | null;
  callDuration: string | null;
  charges: string | null;
  createdAt: string;
  acceptedAt: string | null;
  completedAt: string | null;
  driver: any;
  vehicle: any;
}

const SOSAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
  const activeAlerts = await getActiveSOSAlerts();
  setAlerts(activeAlerts);
};


  const handleAccept = async (alert: Alert) => {
  const success = await acceptSOSAlert(alert._id, 'kkrmadhu1999@gmail.com'); // Replace with actual mechanic ID
  if (success) {
    router.push({
      pathname: '/views/mechanic/callScreen',
      params: {
        id: alert._id,
        name: alert.driverId || 'Unknown Driver',
        vehicle: alert.vehicleId || 'Unknown Vehicle',
        issue: alert.breakdownDetails,
        callType: alert.communicationMode,
      },
    });
  }
};


  useFocusEffect(
    useCallback(() => {
      fetchAlerts();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAlerts();
    setRefreshing(false);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8' }}>
      <View style={{ padding: 20, backgroundColor: '#1F2937' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#FFFFFF', textAlign:'center' }}>🚨 SOS Alerts</Text>
        <Text style={{ fontSize: 14, color: '#D1D5DB', marginTop: 4,textAlign:'center' }}>
          Active emergency requests from drivers
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {alerts.length === 0 ? (
          <Text style={{ color: '#6B7280', fontSize: 16, marginTop: 20 }}>No active alerts at the moment.</Text>
        ) : (
          alerts.map((alert) => (
            <View
              key={alert._id}
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
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#111827' }}>{alert.driverId}</Text>
                <Text style={{ color: '#6B7280', fontSize: 14 }}>{alert.vehicleId}</Text>
                <Text style={{ color: '#374151', fontSize: 14, marginTop: 4 }}>{alert.breakdownDetails}</Text>
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

                <Text style={{ fontSize: 26 }}>{alert.communicationMode === 'video' ? '📹' : '🎤'}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default SOSAlerts;
