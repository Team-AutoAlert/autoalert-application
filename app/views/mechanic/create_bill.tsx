import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';

const CreateBill = () => {
  const [timestamp, setTimestamp] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [services, setServices] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString();
    setTimestamp(formatted);
  }, []);

  const addService = () => {
    if (!serviceName || !price) {
      Alert.alert('Error', 'Please enter both service name and price');
      return;
    }
    const newService = { name: serviceName, price: parseFloat(price) };
    setServices([...services, newService]);
    setServiceName('');
    setPrice('');
  };

  const total = services.reduce((sum, item) => sum + item.price, 0);

  const handleCreateBill = () => {
    if (services.length === 0) {
      Alert.alert('Error', 'Please add at least one service');
      return;
    }

    router.push({
      pathname: '/views/mechanic/bill',
      params: {
        timestamp,
        services: JSON.stringify(services),
        total: total.toFixed(2),
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 8, color: '#FFFFFF', textAlign: 'center'}}>
        Job Completed at:
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 16, color: '#D1D5DB', textAlign: 'center' }}>{timestamp}</Text>

      <TextInput
        placeholder="Service Name"
        placeholderTextColor="#9CA3AF"
        value={serviceName}
        onChangeText={setServiceName}
        style={{
          backgroundColor: '#374151',
          color: '#FFFFFF',
          padding: 12,
          marginBottom: 10,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#4B5563',
        }}
      />

      <TextInput
        placeholder="Price"
        placeholderTextColor="#9CA3AF"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          backgroundColor: '#374151',
          color: '#FFFFFF',
          padding: 12,
          marginBottom: 10,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#4B5563',
        }}
      />

      <TouchableOpacity
        onPress={addService}
        style={{
          backgroundColor: '#3B82F6',
          padding: 14,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Add Service</Text>
      </TouchableOpacity>

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#FFFFFF' }}>
            Bill Summary
          </Text>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 6,
              borderBottomColor: '#4B5563',
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: '#E5E7EB' }}>{item.name}</Text>
            <Text style={{ color: '#E5E7EB' }}>Rs. {item.price.toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#FFFFFF' }}>
            Total: Rs. {total.toFixed(2)}
          </Text>
        )}
      />

      <TouchableOpacity
        onPress={handleCreateBill}
        style={{
          backgroundColor: '#10B981',
          padding: 16,
          borderRadius: 6,
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>Create Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBill;
