import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const nearbyTransactions = [
  { id: 1, name: 'Rizan Mohomad', date: '16 oct', time: '13.48', type: 'Call', amount: '10.09' },
  { id: 2, name: 'Nisal Hettiaya', date: '14 oct', time: '6.48', type: 'Call', amount: '40.09' },
  { id: 3, name: 'Fayaz Fazul', date: '13 oct', time: '1.44', type: 'Call', amount: '100.02' },
  { id: 4, name: 'King Charls', date: '12 oct', time: '13.08', type: 'SMS', amount: '1.09' },
  { id: 5, name: 'Remond Luthar', date: '10 oct', time: '23.48', type: 'Call', amount: '44.22' },
  { id: 6, name: 'Richard Hamilton', date: '4 oct', time: '09.08', type: 'Call', amount: '66.69' },
  { id: 7, name: 'Jimmy Hardy', date: '10 sep', time: '21.48', type: 'Call', amount: '44.22' },
  { id: 8, name: 'David Copperfeild', date: '4 aug', time: '06.33', type: 'Call', amount: '66.69' },
];

const sosTransactions = [
  { id: 1, name: 'Ava Smith', date: '15 oct', time: '11.22', type: 'Call', amount: '20.00' },
  { id: 2, name: 'Liam Brown', date: '13 oct', time: '15.30', type: 'SMS', amount: '5.50' },
  { id: 3, name: 'Olivia Wilson', date: '11 oct', time: '17.10', type: 'Call', amount: '30.75' },
  { id: 4, name: 'Noah Lee', date: '9 oct', time: '19.00', type: 'Call', amount: '12.99' },
];

const Account = () => {
  const [activeTab, setActiveTab] = useState('Nearby');
  const transactions = activeTab === 'Nearby' ? nearbyTransactions : sosTransactions;

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Account Activity</Text>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Nearby' && styles.activeTab]}
          onPress={() => setActiveTab('Nearby')}
        >
          <Text style={[styles.tabText, activeTab === 'Nearby' && styles.activeTabText]}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'SOS' && styles.activeTab]}
          onPress={() => setActiveTab('SOS')}
        >
          <Text style={[styles.tabText, activeTab === 'SOS' && styles.activeTabText]}>SOS</Text>
        </TouchableOpacity>
      </View>
      {/* Transaction List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.row}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
            </View>
            <Text style={styles.amount}>Rs.{item.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    color: '#e53935',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    marginBottom: 18,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  tab: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 36,
    marginHorizontal: 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#222',
    borderColor: '#fff',
  },
  tabText: {
    color: '#222',
    fontSize: 22,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollArea: {
    flex: 1,
    width: '100%',
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
  },
  name: {
    color: '#222',
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  date: {
    color: '#222',
    fontSize: 16,
    fontFamily: 'monospace',
    marginRight: 16,
  },
  time: {
    color: '#222',
    fontSize: 16,
    fontFamily: 'monospace',
    marginRight: 16,
  },
  type: {
    color: '#222',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  amount: {
    color: '#e53935',
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});