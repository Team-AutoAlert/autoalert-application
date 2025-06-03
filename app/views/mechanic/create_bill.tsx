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

  
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Job Completed at:</Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>{timestamp}</Text>

      <TextInput
        placeholder="Service Name"
        value={serviceName}
        onChangeText={setServiceName}
        style={{
          backgroundColor: '#fff',
          padding: 12,
          marginBottom: 10,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#d1d5db',
        }}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          backgroundColor: '#fff',
          padding: 12,
          marginBottom: 10,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#d1d5db',
        }}
      />

      <TouchableOpacity
        onPress={addService}
        style={{
          backgroundColor: '#3b82f6',
          padding: 14,
          borderRadius: 6,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: '600' }}>Add Service</Text>
      </TouchableOpacity>

      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 10 }}>Bill Summary</Text>
        )}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
            <Text>{item.name}</Text>
            <Text>Rs. {item.price.toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={() => (
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
            Total: Rs. {total.toFixed(2)}
          </Text>
        )}
      />

      <TouchableOpacity
        onPress={handleCreateBill}
        style={{
          backgroundColor: '#10b981',
          padding: 16,
          borderRadius: 6,
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Create Bill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateBill;
