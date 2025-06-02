import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

const profile = {
  firstName: 'Jimmy',
  lastName: 'Cooper',
  language: 'English',
  email: 'Cooper@gmail.com',
  number: '0774323223',
  address: 'Peradeniya Kandy',
  emailVerified: true,
};

const UserProfile = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Profile Icon */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/user-male-circle.png' }}
          style={styles.avatar}
        />
      </View>
      {/* Profile Info Box */}
      <View style={styles.infoBox}>
        <View style={styles.infoField}><Text style={styles.infoText}>First Name : {profile.firstName}</Text></View>
        <View style={styles.infoField}><Text style={styles.infoText}>Last Name : {profile.lastName}</Text></View>
        <View style={styles.infoField}><Text style={styles.infoText}>Language : {profile.language}</Text></View>
        <View style={styles.infoField}>
          <Text style={styles.infoText}>Email : {profile.email}</Text>
          {profile.emailVerified && <Text style={styles.verified}>Verified</Text>}
        </View>
        <View style={styles.infoField}><Text style={styles.infoText}>Number : {profile.number}</Text></View>
        <View style={styles.infoField}><Text style={styles.infoText}>Address : {profile.address}</Text></View>
      </View>
      {/* Edit Button */}
      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editBtnText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    paddingTop: 30,
  },
  backBtn: {
    position: 'absolute',
    left: 18,
    top: 30,
    zIndex: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: '#90caf9',
    backgroundColor: '#fff',
  },
  infoBox: {
    borderWidth: 3,
    borderColor: '#90caf9',
    borderRadius: 8,
    padding: 8,
    width: 340,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  infoField: {
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#90caf9',
    borderRadius: 12,
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  infoText: {
    fontFamily: 'monospace',
    fontSize: 18,
    color: '#222',
    textAlign: 'center',
  },
  verified: {
    color: '#2196f3',
    fontFamily: 'monospace',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: '#b3e5fc',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#90caf9',
    marginTop: 10,
  },
  editBtnText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
