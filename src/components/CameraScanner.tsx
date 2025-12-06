import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { COLORS } from '../utils/constants';

interface CameraScannerProps {
  onBarcodeScanned: (value: string) => void; // PROP: callback to parent
}

const CameraScanner: React.FC<CameraScannerProps> = ({ onBarcodeScanned }) => {
  const [value, setValue] = useState('');

  const handleSimulateScan = () => {
    if (!value.trim()) return;
    onBarcodeScanned(value.trim());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulated ID Scanner</Text>
      <Text style={styles.text}>
        The real barcode scanner requires a native module that is not available
        on Expo Go for this build. Type the ID barcode content to simulate scanning.
      </Text>

      <Text style={styles.label}>Barcode Content:</Text>

      <TextInput
        style={styles.input}
        placeholder="2021301334 FirstName LastName BSIT"
        value={value}
        onChangeText={setValue}
      />

      <Button title="Simulate Scan" onPress={handleSimulateScan} color={COLORS.primaryBlue} />
    </View>
  );
};

export default CameraScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.accentYellow,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF', // FIXED! No more COLORS.textLight
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
});
