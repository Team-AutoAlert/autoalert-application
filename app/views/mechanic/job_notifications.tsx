'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, Modal,
  StyleSheet, Dimensions, Alert, RefreshControl
} from 'react-native'
import { useRouter } from 'expo-router'
import { FontAwesome5 } from "@expo/vector-icons"
import { viewJobNotifications, acceptJobNotification } from '../../services/mechanic/order_service'

const mechanicId = 'kkrmadhu1999@gmail.com' // Ideally fetched from auth context

const JobNotifications = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const fetchJobs = async () => {
    try {
      const res = await viewJobNotifications(mechanicId)
      if (res.success) {
        setJobs(res.data)
      }
    } catch (err) {
      Alert.alert('Error', 'Could not fetch job notifications.')
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await fetchJobs()
    setRefreshing(false)
  }, [])

  const handleJobClick = (job: any) => {
    setSelectedJob(job)
    setModalVisible(true)
  }

  const handleAccept = async () => {
    try {
      const response = await acceptJobNotification(selectedJob._id, mechanicId)
      if (response.success) {
        Alert.alert('Success', 'Job Accepted')
        setModalVisible(false)
        const [longitude, latitude] = selectedJob.driverLocation.coordinates
        router.push({
          pathname: '/views/mechanic/locate_driver',
          params: {
            lat: latitude.toString(),
            lng: longitude.toString(),
            jobId: selectedJob._id,
            mechanicId: mechanicId,
            driverId: selectedJob.driverId
          },
        })
      } else {
        Alert.alert('Error', 'Job acceptance failed.')
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to accept job')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔔 Job Notifications</Text>

      <ScrollView
        style={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {jobs.map((job) => (
          <TouchableOpacity key={job._id} style={styles.card} onPress={() => handleJobClick(job)}>
            <View style={styles.cardHeader}>
              <FontAwesome5 name="car-side" size={24} color="#1e88e5" />
              <Text style={styles.vehicle}>Vehicle ID: {job.vehicleId}</Text>
              <Text style={styles.distance}>Driver: {job.driverId}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={[styles.tag, { backgroundColor: '#e53935' }]}>Problem</Text>
              <Text style={styles.problem}>{job.breakdownDetails}</Text>
            </View>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => handleJobClick(job)}>
              <Text style={styles.acceptText}>View</Text>
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
                <Text style={styles.modalItem}>🚗 Vehicle ID: {selectedJob.vehicleId}</Text>
                <Text style={styles.modalItem}>👤 Driver ID: {selectedJob.driverId}</Text>
                <Text style={styles.modalItem}>📄 Problem: {selectedJob.breakdownDetails}</Text>
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
