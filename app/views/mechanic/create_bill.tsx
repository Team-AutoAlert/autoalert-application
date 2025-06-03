import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { router } from 'expo-router';

const CreateBill = () => {
  const [timestamp, setTimestamp] = useState('');
  const [services, setServices] = useState<{ name: string; price: number }[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString();
    setTimestamp(formatted);
  }, []);

  const handleAddService = () => {
    if (!serviceName || !servicePrice) {
      Alert.alert('Error', 'Please enter both service name and price.');
      return;
    }

    const price = parseFloat(servicePrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    setServices([...services, { name: serviceName, price }]);
    setServiceName('');
    setServicePrice('');
  };

  const handleDeleteService = (index: number) => {
    const updated = [...services];
    updated.splice(index, 1);
    setServices(updated);
  };

  const handleCreateBill = () => {
    const timestamp = new Date().toLocaleString();
    const total = services.reduce((sum, s) => sum + s.price, 0);
    router.push({
      pathname: '/views/mechanic/bill',
      params: {
        services: JSON.stringify(services),
        timestamp,
        total: total.toFixed(2),
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#1F2937', padding: 20 }}>
      
      <Text style={{ fontSize: 18, fontWeight: '800', marginBottom: 8, color: '#FFFFFF',textAlign: 'center' }}>
        Job Completed at:
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20, color: '#D1D5DB', textAlign: 'center' }}>{timestamp}</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center',marginBottom: 16 }}>
        Bill Preparation
      </Text>
      <TextInput
        placeholder="Service Name"
        placeholderTextColor="#9CA3AF"
        value={serviceName}
        onChangeText={setServiceName}
        style={{
          backgroundColor: '#374151',
          color: '#FFFFFF',
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Price (Rs)"
        placeholderTextColor="#9CA3AF"
        value={servicePrice}
        onChangeText={setServicePrice}
        keyboardType="numeric"
        style={{
          backgroundColor: '#374151',
          color: '#FFFFFF',
          padding: 12,
          borderRadius: 8,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleAddService}
        style={{
          backgroundColor: '#3B82F6',
          padding: 14,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Add Service</Text>
      </TouchableOpacity>

      <FlatList
        data={services}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#374151',
              padding: 12,
              borderRadius: 6,
              marginBottom: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#FBBF24', fontSize: 16 }}>Rs. {item.price.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => handleDeleteService(index)}>
                <Text style={{ color: '#EF4444', marginLeft: 16 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={() =>
          services.length > 0 ? (
            <Text
              style={{
                textAlign: 'right',
                fontSize: 16,
                fontWeight: '600',
                color: '#10B981',
                marginTop: 8,
              }}
            >
              Total: Rs. {services.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
            </Text>
          ) : null
        }
      />

      <TouchableOpacity
        onPress={handleCreateBill}
        disabled={services.length === 0}
        style={{
          backgroundColor: services.length === 0 ? '#6B7280' : '#10B981',
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 24,
        }}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>Create Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBill;
