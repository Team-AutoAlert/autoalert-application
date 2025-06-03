import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Assuming you pass the call type (voice/video) and mechanic data as props or context
// For now, using placeholders
const callType: 'voice' | 'video' = 'video'; // 'voice' or 'video'
const mechanicName = "David White";
const initialChargedAmount = "1000.00"; // Placeholder

export default function CallViewScreen() {
  const router = useRouter();
  const [callActive, setCallActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [chargedAmount, setChargedAmount] = useState(initialChargedAmount);
  const [isCameraFront, setIsCameraFront] = useState(true); // For video calls

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (callActive) {
      timer = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1);
      }, 1000);
    } else if (!callActive && callDuration > 0) {
      // Call ended, stop timer and potentially finalize charge
      clearInterval(timer!);
      // TODO: Finalize charged amount based on duration and call type
      // setChargedAmount(calculateCharge(callDuration, callType));
    }

    return () => clearInterval(timer!);
  }, [callActive, callDuration]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleEndCall = () => {
    setCallActive(false);
    // TODO: Implement Twilio logic to end the call
  };

  const handleSwitchCamera = () => {
    setIsCameraFront(prevState => !prevState);
    // TODO: Implement Twilio logic to switch camera
  };

  const handlePay = () => {
    console.log('Initiating payment for', chargedAmount);
    // TODO: Implement payment processing logic
    // After successful payment, navigate to feedback page:
    // router.push('/views/driver/call/feedback');
  };

  return (
    <View style={styles.container}>
      {/* Mechanic Connected Header */}
      <View style={styles.connectedHeader}>
        <Text style={styles.connectedHeaderText}>Mechanic</Text>
        <Text style={styles.connectedHeaderText}>Connected</Text>
        {/* Mechanic Icon Placeholder */}
        {/* Replace with an actual icon or image */}
        <View style={styles.mechanicIconHeader} />
      </View>

      {callActive ? (
        // Call Ongoing State
        <View style={styles.activeCallContainer}>
          {callType === 'video' && (
            // Video Feed Placeholder
            <View style={styles.videoFeedsContainer}>
              <View style={styles.videoFeedPlaceholder}>
                {/* TODO: Integrate Twilio remote video feed here */}
                <Text style={{ color: '#fff' }}>Remote Video Feed Placeholder</Text>
              </View>
              <View style={styles.localVideoFeedPlaceholder}>
                {/* TODO: Integrate Twilio local video feed here */}
                <Text style={{ color: '#fff' }}>Local Video</Text>
                <TouchableOpacity style={styles.switchCameraButton} onPress={handleSwitchCamera}>
                  <MaterialCommunityIcons name={isCameraFront ? "camera-switch-outline" : "camera-switch"} size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Text style={[styles.callStatusText, callType === 'video' && styles.callStatusTextVideo]}>Call Ongoing</Text>
          <Text style={[styles.callDurationText, callType === 'video' && styles.callDurationTextVideo]}>{formatDuration(callDuration)}</Text>
        </View>
      ) : (
        // Call Ended State
        <View style={styles.endedCallContainer}>
          <Text style={styles.callEndedText}>Call Ended</Text>
          <Text style={styles.chargedAmountText}>Charged amount:</Text>
          <Text style={styles.chargedAmountValue}>Rs. {chargedAmount}</Text>
          <Text style={styles.rateMechanicText}>Rate the Mechanic</Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePay}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* End Call Button */}
      <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
        <FontAwesome5 name="phone" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    justifyContent: 'space-between', // Distribute content vertically
    paddingBottom: 40,
  },
  connectedHeader: {
    backgroundColor: '#ffc0cb', // Pink background
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  connectedHeaderText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222', // Dark text
    fontFamily: 'monospace',
    marginHorizontal: 4,
  },
  mechanicIconHeader: {
    width: 30,
    height: 30,
    backgroundColor: '#6c757d', // Placeholder color
    borderRadius: 15,
    marginLeft: 8,
    // You would replace this with an Image or Icon component
  },
  activeCallContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  videoFeedsContainer: {
    width: '100%',
    flex: 1,
    position: 'relative',
    marginBottom: 20,
  },
  videoFeedPlaceholder: {
    width: '100%',
    flex: 1,
    backgroundColor: '#444', // Dark placeholder for video
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideoFeedPlaceholder: {
    width: 100,
    height: 150,
    backgroundColor: '#555',
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchCameraButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    zIndex: 2,
  },
  callStatusText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  callStatusTextVideo: {
    fontSize: 18,
  },
  callDurationText: {
    fontSize: 48,
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  callDurationTextVideo: {
    fontSize: 32,
  },
  endedCallContainer: {
    backgroundColor: '#343a40',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 2,
  },
  callEndedText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'monospace',
    marginBottom: 16,
  },
  chargedAmountText: {
    fontSize: 18,
    color: '#ccc',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  chargedAmountValue: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rateMechanicText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  payButton: {
    backgroundColor: '#a0c4ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderColor: '#fff',
    borderWidth: 2,
  },
  payButtonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});
