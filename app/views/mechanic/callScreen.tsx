import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

interface AlertType {
  id: number;
  name: string;
  vehicle: string;
  issue: string;
  callType: 'audio' | 'video';
}

const CallScreen = () => {
  const params = useLocalSearchParams();
  const [callDuration, setCallDuration] = useState(0);
  const [callEnded, setCallEnded] = useState(false);
  const [amountReceived] = useState(100);

  const alert: AlertType = {
    id: Number(params.id),
    name: String(params.name),
    vehicle: String(params.vehicle),
    issue: String(params.issue),
    callType: params.callType as 'audio' | 'video',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!callEnded) {
        setCallDuration((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [callEnded]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const endCall = () => {
    setCallEnded(true);
    setTimeout(() => {
      Alert.alert(
        'Call Ended',
        `Received amount: Rs. ${amountReceived.toFixed(2)}`,
        [
          {
            text: 'OK',
            onPress: () => router.push('/views/mechanic/(tabs)/sos_alerts'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6F8', padding: 20 }}>
      {!callEnded ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>
            Call in Progress
          </Text>
          <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 24 }}>
            {alert.name} - {alert.vehicle}
          </Text>

          <Text style={{ fontSize: 40, fontWeight: '600', marginBottom: 20 }}>
            {formatDuration(callDuration)}
          </Text>

          <Text style={{ fontSize: 60, marginBottom: 40 }}>
            {alert.callType === 'video' ? '📹' : '🎤'}
          </Text>

          <TouchableOpacity
            onPress={endCall}
            style={{
              backgroundColor: '#EF4444',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>End Call</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 }}>
            📞 Call Ended
          </Text>
          <Text style={{ fontSize: 16, color: '#374151', marginBottom: 8 }}>
            Duration: {formatDuration(callDuration)}
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#10B981' }}>
            Received amount: Rs. {amountReceived.toFixed(2)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CallScreen;
