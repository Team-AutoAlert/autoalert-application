import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

const PaymentReceived = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 24, justifyContent: 'center', alignItems: 'center' }}>
      
      {/* Optional Icon or Animation Placeholder */}
      <Image
        source={require('../../../assets/images/successful_payment.png')} 
        style={{ width: 150, height: 150, marginBottom: 30 }}
        resizeMode="contain"
      />

      <Text style={{ color: '#10B981', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        Payment Received!
      </Text>

      <Text style={{ color: '#D1D5DB', fontSize: 16, textAlign: 'center', marginBottom: 40 }}>
        The driver has successfully paid the bill. You can now complete the job.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#3B82F6',
          paddingVertical: 16,
          paddingHorizontal: 32,
          borderRadius: 10,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => router.push('/views/mechanic/(tabs)')}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentReceived;
