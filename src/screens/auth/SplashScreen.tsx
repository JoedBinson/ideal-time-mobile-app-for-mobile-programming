// src/screens/auth/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useAppContext } from '../../context/AppContext';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isLoggedIn } = useAppContext();

  // Animated value for fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    // After a short delay, decide where to go
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        // Not logged in → go to Auth stack (Login / TeacherSetup)
        navigation.replace('Auth');
      } else {
        // Logged in → go straight to Main (tabs)
        navigation.replace('Main');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [fadeAnim, isLoggedIn, navigation]);

  return (
    <View style={styles.container}>
      {/* Fading logo + title */}
      <Animated.View style={[styles.centerContent, { opacity: fadeAnim }]}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>I.D.eal Time</Text>
        <Text style={styles.subtitle}>Scan • Track • Attend</Text>
      </Animated.View>

      {/* Spinner at the bottom */}
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color={COLORS.primaryBlue} />
        <Text style={styles.loadingText}>Preparing your dashboard…</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // usually white
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  centerContent: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
  },
});
