import { View, Text, TouchableOpacity, FlatList, Modal } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

interface Transaction {
  id: number;
  date: string;
  number: string;
  amount: string;
  type: string;
  time: string;
  source: "sos" | "nearby";
  details: any;
}

const transactions: Transaction[] = [
  {
    id: 1,
    date: "14 Oct 2024",
    number: "762870347",
    amount: "-1.09",
    type: "Call",
    time: "13.48",
    source: "sos",
    details: {
      date: "14/Oct/2014",
      duration: "5 min",
      charge: "Rs.10",
      type: "Call",
    },
  },
  {
    id: 2,
    date: "12 Oct 2024",
    number: "722870347",
    amount: "-1.29",
    type: "SMS",
    time: "13.48",
    source: "sos",
    details: {
      date: "12/Oct/2024",
      type: "SMS",
      charge: "Rs.5",
      duration: "-",
    },
  },
  {
    id: 3,
    date: "14 Oct 2024",
    number: "762870347",
    amount: "-1.09",
    type: "Call",
    time: "13.48",
    source: "nearby",
    details: {
      service1: 1000,
      service2: 200,
      service3: 5500,
      commission: "5%",
      tax: "10%",
      total: "Rs.7705.00",
    },
  },
];

export default function AccountActivity() {
  const [filter, setFilter] = useState<"sos" | "nearby">("sos");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = transactions.filter((t) => t.source === filter);

  const openModal = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-gray-800 px-4 pt-10">
      <Text className="text-white text-2xl text-center mb-4">Account Activity</Text>

      {/* Filter Buttons */}
      <View className="flex-row justify-center space-x-4 mb-4">
        <TouchableOpacity
          onPress={() => setFilter("nearby")}
          className={`px-4 py-2 rounded-full ${filter === "nearby" ? "bg-blue-400" : "bg-gray-600"}`}
        >
          <Text className="text-white">Nearby</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilter("sos")}
          className={`px-4 py-2 rounded-full ${filter === "sos" ? "bg-red-300" : "bg-gray-600"}`}
        >
          <Text className="text-white">SOS</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View className="flex-row justify-between px-2 pb-2 border-b border-gray-500">
        <Text className="text-white font-bold">Date</Text>
        <Text className="text-white font-bold">Number</Text>
        <Text className="text-white font-bold">Amount</Text>
      </View>

      {/* Transaction List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View className="flex-row justify-between px-2 py-3 border-b border-gray-700">
              <View>
                <Text className="text-white">{item.date}</Text>
                <Text className="text-xs text-gray-300">{item.time}</Text>
              </View>
              <Text className="text-white">{item.number}</Text>
              <View>
                <Text className="text-red-400">{item.amount}</Text>
                <Text className="text-xs text-gray-300 text-right">{item.type}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for Transaction Details */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50 px-4">
          <View className="bg-gray-200 p-6 rounded-xl w-full">
            <Text className="text-lg font-bold mb-4">Transaction History</Text>
            <Text className="mb-2 font-bold">{selectedTransaction?.number}</Text>
            {filter === "sos" ? (
              <>
                <Text>Date: {selectedTransaction?.details.date}</Text>
                <Text>Duration: {selectedTransaction?.details.duration}</Text>
                <Text>Charge: {selectedTransaction?.details.charge}</Text>
                <Text>Type: {selectedTransaction?.details.type}</Text>
              </>
            ) : (
              <>
                <Text>Service 1: Rs.{selectedTransaction?.details.service1}</Text>
                <Text>Service 2: Rs.{selectedTransaction?.details.service2}</Text>
                <Text>Service 3: Rs.{selectedTransaction?.details.service3}</Text>
                <Text>Commission: {selectedTransaction?.details.commission}</Text>
                <Text>Tax: {selectedTransaction?.details.tax}</Text>
                <Text>Total: {selectedTransaction?.details.total}</Text>
              </>
            )}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-6 bg-red-400 py-2 px-4 rounded-full"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
