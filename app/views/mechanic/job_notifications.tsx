'use client'

import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const jobs = [
  {
    id: 1,
    distance: '100m',
    vehicle: 'Honda Grace',
    problemType: 'Engine',
    problem: 'Engine Over Heat',
  },
  {
    id: 2,
    distance: '150m',
    vehicle: 'Toyota',
    problemType: 'Battery',
    problem: 'Battery Dead',
  },
  // Add more mock jobs here
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
      <Text style={styles.title}>Job Notifications</Text>
      <ScrollView style={styles.list}>
        {jobs.map((job) => (
          <TouchableOpacity key={job.id} onPress={() => handleJobClick(job)} style={styles.card}>
            <Text>Live Address: {job.distance}</Text>
            <Text>{job.vehicle}</Text>
            <TouchableOpacity onPress={handleAccept} style={styles.acceptBtn}>
              <Text style={styles.btnText}>Accept</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            {selectedJob && (
              <>
                <Text style={styles.modalText}>Problem Type: {selectedJob.problemType}</Text>
                <Text>Problem: {selectedJob.problem}</Text>
                <Text>Vehicle: {selectedJob.vehicle}</Text>
                <Text>Distance: {selectedJob.distance}</Text>
              </>
            )}
            <View style={styles.modalBtnGroup}>
              <TouchableOpacity onPress={handleAccept} style={styles.modalAccept}>
                <Text style={styles.btnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default JobNotifications

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f2f2' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  list: { marginTop: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
  },
  acceptBtn: {
    backgroundColor: '#ff6b6b',
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold' },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalText: { fontSize: 16, marginBottom: 10, fontWeight: '500' },
  modalBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalAccept: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
  modalCancel: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    width: '45%',
    alignItems: 'center',
  },
})
