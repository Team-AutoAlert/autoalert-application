import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useKeepAwake } from 'expo-keep-awake';

const { width, height } = Dimensions.get('window');

// Fallback video URL in case the passed URL doesn't work
const FALLBACK_VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoPlayerScreen() {
  const router = useRouter();
  const { videoUri } = useLocalSearchParams();

  // Add error state
  const [error, setError] = useState<string | null>(null);

  const player = useVideoPlayer(videoUri as string || FALLBACK_VIDEO_URL, player => {
    console.log('Player initialized with URI:', videoUri || FALLBACK_VIDEO_URL);
    
    // Add event listeners for debugging
    player.addListener('statusChange', ({ status, error }) => {
      console.log('Player status changed:', status);
      if (error) {
        console.error('Player error:', error);
        setError(error.message);
      }
    });

    // Try to play the video
    try {
      player.play();
    } catch (err) {
      console.error('Error playing video:', err);
      setError(err instanceof Error ? err.message : 'Failed to play video');
    }
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  useKeepAwake();

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    setIsFullscreen(!isFullscreen);
  };
  
  const goBack = async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <VideoView
          style={isFullscreen ? styles.fullscreenVideo : styles.video}
          player={player}
          contentFit="contain"
          nativeControls
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: width * (9 / 16),
  },
  fullscreenVideo: {
    width: height,
    height: width,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    margin: 20,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
  },
});
