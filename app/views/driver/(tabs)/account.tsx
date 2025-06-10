import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { getDriverBills } from '../../../services/driver/payment_service';
import { format } from 'date-fns';
import { useAuth } from '../../../context/AuthContext';

interface Service {
  name: string;
  description: string;
  charge: number;
  _id: string;
}

interface PaymentBill {
  _id: string;
  alertId?: string;
  requestId?: string;
  driverId: string;
  mechanicId: string;
  amount: number;
  orderType: 'sos_alert' | 'nearby_mechanic';
  status: 'paid' | 'unpaid';
  callDuration?: number;
  services: Service[];
  createdAt: string;
  __v: number;
}

const Account = () => {
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState('Nearby');
  const [bills, setBills] = useState<PaymentBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchBills();
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [userId]);

  const fetchBills = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!userId) {
        throw new Error('User ID not found');
      }

      console.log('Fetching bills for userId:', userId);
      const response = await getDriverBills(userId);
      console.log('Bills response:', response);

      if (response.success && response.data) {
        // Sort bills by createdAt in descending order
        const sortedBills = response.data.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        console.log('Sorted bills:', sortedBills);
        setBills(sortedBills);
      } else {
        throw new Error(response.message || 'Failed to fetch bills');
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
      setError(error instanceof Error ? error.message : 'Failed to load bills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredBills = bills.filter(bill => 
    activeTab === 'Nearby' ? bill.orderType === 'nearby_mechanic' : bill.orderType === 'sos_alert'
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'HH.mm');
  };

  const renderTransactionList = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e53935" />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchBills}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredBills.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredBills.map((bill) => (
          <View key={bill._id} style={styles.transactionItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {bill.orderType === 'nearby_mechanic' 
                  ? bill.services.map(s => s.name).join(', ')
                  : `SOS Call (${bill.callDuration} min)`}
              </Text>
              <View style={styles.row}>
                <Text style={styles.date}>{formatDate(bill.createdAt)}</Text>
                <Text style={styles.time}>{formatTime(bill.createdAt)}</Text>
                <Text style={styles.type}>{bill.orderType === 'nearby_mechanic' ? 'Service' : 'Call'}</Text>
              </View>
            </View>
            <Text style={[styles.amount, bill.status === 'unpaid' && styles.unpaidAmount]}>
              Rs.{bill.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Activity</Text>
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
      {renderTransactionList()}
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
  unpaidAmount: {
    color: '#ff9800',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#e53935',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  retryButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'monospace',
  },
});