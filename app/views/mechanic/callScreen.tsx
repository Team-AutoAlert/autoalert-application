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
  const [callDuration, setCallDuration] = useState(0); // seconds
  const [callEnded, setCallEnded] = useState(false);
  const [amountReceived] = useState(100); // static

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
            onPress: () => router.push('/views/mechanic/sos_alerts'),
          },
        ]
      );
    }, 1500);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e5e7eb' }}>
      {!callEnded ? (
        <>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Call Ongoing</Text>
          <Text style={{ fontSize: 32, marginBottom: 24 }}>{formatDuration(callDuration)}</Text>

          <View style={{ flexDirection: 'row', gap: 20 }}>
            <Text style={{ fontSize: 40 }}>
              {alert.callType === 'video' ? '📹' : '🎤'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={endCall}
            style={{
              marginTop: 40,
              backgroundColor: '#ef4444',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>End Call</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}>Call Ended</Text>
          <Text style={{ fontSize: 18 }}>Received amount: Rs. {amountReceived.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

export default CallScreen;
