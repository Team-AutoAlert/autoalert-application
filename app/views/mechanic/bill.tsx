import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { completeServiceRequest } from '../../services/mechanic/order_service';

const BillPage = () => {
  const { services, timestamp, total } = useLocalSearchParams();
  const { jobId, mechanicId } = useLocalSearchParams();

  const parsedServices = JSON.parse(services as string) as { name: string; price: number }[];
  const serviceTotal = parseFloat(total as string);

  const commissionRate = 0.10;
  const taxRate = 0.08;

  const commission = serviceTotal * commissionRate;
  const tax = serviceTotal * taxRate;
  const finalTotal = serviceTotal + commission + tax;

  const handleSendBill = async () => {
    try {
      await completeServiceRequest(jobId as string, mechanicId as string, parsedServices);

      router.push({
        pathname: '/views/mechanic/payment_waiting',
        params: {
          total: serviceTotal.toFixed(2),
          services: JSON.stringify(parsedServices),
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send bill. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 }}>
        Bill Summary
      </Text>

      <Text style={{ color: '#9CA3AF', textAlign: 'center',marginBottom: 10 }}>Completed At: {timestamp}</Text>

      <FlatList
        data={parsedServices}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
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
        )}
      />

      {/* Breakdown */}
      <View style={{ marginTop: 16 }}>
        <Text style={{ color: '#D1D5DB', fontSize: 16, textAlign: 'center',marginBottom: 4 }}>
          Service Total: Rs. {serviceTotal.toFixed(2)}
        </Text>
        <Text style={{ color: '#D1D5DB', fontSize: 16, textAlign: 'center',marginBottom: 4 }}>
          Commission (10%): Rs. {commission.toFixed(2)}
        </Text>
        <Text style={{ color: '#D1D5DB', fontSize: 16, textAlign: 'center',marginBottom: 12 }}>
          Tax (8%): Rs. {tax.toFixed(2)}
        </Text>
        <Text style={{ color: '#10B981', fontSize: 18, fontWeight: 'bold',textAlign: 'center' }}>
          Total to Pay: Rs. {finalTotal.toFixed(2)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: '#6B7280',
            padding: 14,
            borderRadius: 8,
            width: '45%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSendBill}
          style={{
            backgroundColor: '#3B82F6',
            padding: 14,
            borderRadius: 8,
            width: '50%',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Send Bill</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BillPage;
