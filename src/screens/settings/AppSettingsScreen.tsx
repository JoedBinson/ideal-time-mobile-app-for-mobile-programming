import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../utils/constants';

const AppSettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Settings</Text>
      <Text>Here we can later add toggles like sound on/off.</Text>
    </View>
  );
};

export default AppSettingsScreen;

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
});
