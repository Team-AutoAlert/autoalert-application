'use client'

import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native'
//import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const jobs = [
  {
    id: 1,
    distance: '100m',
    vehicle: 'Honda Grace',
    problemType: 'Engine',
    problem: 'Engine Overheat',
  },
  {
    id: 2,
    distance: '150m',
    vehicle: 'Toyota Aqua',
    problemType: 'Battery',
    problem: 'Battery Dead',
  },
  {
    id: 3,
    distance: '200m',
    vehicle: 'Suzuki Wagon R',
    problemType: 'Flat Tyre',
    problem: 'Front tyre punctured',
  },
  {
    id: 4,
    distance: '200m',
    vehicle: 'Suzuki Wagon R',
    problemType: 'Flat Tyre',
    problem: 'Front tyre punctured',
  },
]

const JobNotifications = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const router = useRouter()

  const handleJobClick = (job: any) => {
    setSelectedJob(job)
    setModalVisible(true)
  }

  const handleAccept = () => {
    setModalVisible(false)
    router.push('/views/mechanic/locate_driver')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔔 Job Notifications</Text>
      <ScrollView style={styles.scroll}>
        {jobs.map((job) => (
          <TouchableOpacity key={job.id} style={styles.card} onPress={() => handleJobClick(job)}>
            <View style={styles.cardHeader}>
              <FontAwesome5 name="car-side" size={24} color="#1e88e5" />
              <Text style={styles.vehicle}>{job.vehicle}</Text>
              <Text style={styles.distance}>{job.distance}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={[styles.tag, getTagColor(job.problemType)]}>{job.problemType}</Text>
              <Text style={styles.problem}>{job.problem}</Text>
            </View>
            <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
              <Text style={styles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            {selectedJob && (
              <>
                <Text style={styles.modalTitle}>Job Details</Text>
                <Text style={styles.modalItem}>🚗 Vehicle: {selectedJob.vehicle}</Text>
                <Text style={styles.modalItem}>📍 Distance: {selectedJob.distance}</Text>
                <Text style={styles.modalItem}>🛠️ Problem Type: {selectedJob.problemType}</Text>
                <Text style={styles.modalItem}>📄 Problem: {selectedJob.problem}</Text>
              </>
            )}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalAccept} onPress={handleAccept}>
                <Text style={styles.modalText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
    </View>
  )
}

const getTagColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'engine':
      return { backgroundColor: '#e53935' }
    case 'battery':
      return { backgroundColor: '#ffb300' }
    case 'flat tyre':
      return { backgroundColor: '#43a047' }
    default:
      return { backgroundColor: '#607d8b' }
  }
}

export default JobNotifications

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center', 
  },
  scroll: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  vehicle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
  tagContainer: {
    marginBottom: 10,
  },
  tag: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    marginBottom: 6,
  },
  problem: {
    color: '#444',
    fontSize: 14,
  },
  acceptBtn: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  acceptText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: screenWidth * 0.85,
    padding: 20,
    borderRadius: 12,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  modalItem: {
    fontSize: 14,
    marginBottom: 6,
    color: '#555',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalAccept: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalCancel: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
