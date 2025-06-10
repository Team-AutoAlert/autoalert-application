import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';
import { fetchUserProfile } from '../../../services/driver/user_service';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = useAuth(); // Get userId from AuthContext
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      if (!userId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }

      const result = await fetchUserProfile(userId);
      if (result.success) {
        setUserProfile(result.user);
      } else {
        setError(result.message);
        Alert.alert("Error", result.message);
      }
      setLoading(false);
    };

    getUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#e53935" />
        <Text style={styles.loadingText}>Loading User Profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => setLoading(true)} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!userProfile) {
    return (
      <View style={[styles.container, styles.noProfileContainer]}>
        <Text style={styles.noProfileText}>No user profile found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      
      {/* Profile Icon */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: userProfile.profilePicture || 'https://img.icons8.com/ios-filled/100/000000/user-male-circle.png' }}
          style={styles.avatar}
        />
      </View>
      {/* Profile Info Box */}
      <View style={styles.infoBox}>
        <View style={styles.infoField}><Text style={styles.infoText}>First Name : {userProfile.firstName}</Text></View>
        <View style={styles.infoField}><Text style={styles.infoText}>Last Name : {userProfile.lastName}</Text></View>
        {/* Assuming language is part of userProfile or can be inferred, for now, static */}
        <View style={styles.infoField}><Text style={styles.infoText}>Language : {userProfile.language || 'English'}</Text></View>
        <View style={styles.infoField}>
          <Text style={styles.infoText}>Email : {userProfile.email}</Text>
          {/* Assuming emailVerified status from backend response if available */}
          {userProfile.status === 'active' && <Text style={styles.verified}>Verified</Text>}
        </View>
        <View style={styles.infoField}><Text style={styles.infoText}>Number : {userProfile.phoneNumber}</Text></View>
        <View style={styles.infoField}><Text style={styles.infoText}>Address : {userProfile.address || 'N/A'}</Text></View>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#222',
    fontFamily: 'monospace',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    fontFamily: 'monospace',
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#b3e5fc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'monospace',
  },
  noProfileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProfileText: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'monospace',
    marginTop: 50,
  },
});
