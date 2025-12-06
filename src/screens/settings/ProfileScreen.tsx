import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { ProfileStackParamList } from '../../navigation/ProfileStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { teacherProfile, logout } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{teacherProfile?.fullName ?? 'Joed Binson Rauto'}</Text>

      <View style={{ height: 16 }} />

      <Button
        title="App Settings"
        onPress={() => navigation.navigate('AppSettings')}
        color={COLORS.primaryBlue}
      />
      <View style={{ height: 8 }} />
      <Button
        title="Logout"
        onPress={logout}
        color={COLORS.statusAbsent}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
});
