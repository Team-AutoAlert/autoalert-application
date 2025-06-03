import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const PaymentWaitingPage = () => {
  const { services, total } = useLocalSearchParams();
  const parsedServices = JSON.parse(services as string) as { name: string; price: number }[];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1F2937', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FFFFFF',textAlign: 'center', marginBottom: 10 }}>
        Payment Waiting
      </Text>

      <Text style={{ color: '#9CA3AF', fontSize: 14, textAlign: 'center',marginBottom: 20 }}>
        Waiting for driver to complete payment. Please confirm payment after driver pays.
      </Text>

      {parsedServices.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#374151',
            padding: 12,
            borderRadius: 6,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.name}</Text>
          <Text style={{ color: '#FBBF24', fontSize: 16 }}>Rs. {item.price.toFixed(2)}</Text>
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#10B981', fontSize: 18, textAlign: 'center',fontWeight: 'bold' }}>
          Total Paid: Rs. {total}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/views/mechanic/payment_received')}
        style={{
          backgroundColor: '#22C55E',
          padding: 14,
          borderRadius: 8,
          marginTop: 30,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Confirm Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentWaitingPage;
