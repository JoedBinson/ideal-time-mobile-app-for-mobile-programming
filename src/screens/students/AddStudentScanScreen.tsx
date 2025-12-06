import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import CameraScanner from '../../components/CameraScanner';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'AddStudentScan'>;

// Parses barcode like "2021301334 FirstName LastName BSIT"
const parseBarcode = (value: string) => {
  const parts = value.trim().split(/\s+/);
  if (parts.length < 3) {
    throw new Error('Unexpected barcode format.');
  }
  const studentNumber = parts[0];
  const course = parts[parts.length - 1];
  const nameParts = parts.slice(1, -1);
  // Assume last part of name is lastName, rest is first/middle
  const lastName = nameParts[nameParts.length - 1];
  const firstAndMiddle = nameParts.slice(0, -1).join(' ');
  return { studentNumber, fullNameRaw: firstAndMiddle + ' ' + lastName, course };
};

const formatFullNameFromRaw = (raw: string): string => {
  const tokens = raw.trim().split(/\s+/);
  if (tokens.length === 1) return raw;
  const lastName = tokens[tokens.length - 1];
  const firstAndMiddle = tokens.slice(0, -1).join(' ');
  return `${lastName}, ${firstAndMiddle}`;
};

const AddStudentScanScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const { addStudent } = useAppContext();

  const [barcodeValue, setBarcodeValue] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');

  const handleBarcodeScanned = (value: string) => {
    try {
      const { studentNumber, fullNameRaw } = parseBarcode(value);
      setBarcodeValue(value);
      setStudentNumber(studentNumber);
      setFullName(formatFullNameFromRaw(fullNameRaw));
    } catch (err) {
      Alert.alert('Error', 'Failed to read ID barcode. Please try again.');
    }
  };

  const handleSave = () => {
    if (!studentNumber.trim() || !fullName.trim() || !barcodeValue.trim()) {
      Alert.alert('Required', 'Missing student info from barcode. Please rescan or edit.');
      return;
    }

    addStudent(subjectId, {
      studentNumber: studentNumber.trim(),
      fullName: fullName.trim(),
      barcodeValue: barcodeValue.trim(),
    });

    Alert.alert('Success', 'Student added from ID.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <CameraScanner onBarcodeScanned={handleBarcodeScanned} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Barcode Value</Text>
        <TextInput
          style={styles.input}
          value={barcodeValue}
          onChangeText={setBarcodeValue}
          editable={false}
        />

        <Text style={styles.label}>Student Number</Text>
        <TextInput
          style={styles.input}
          value={studentNumber}
          onChangeText={setStudentNumber}
          editable={false}
        />

        <Text style={styles.label}>Full Name (parsed)</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          editable={true} // can fix errors
        />

        <Button title="Save Student" onPress={handleSave} color={COLORS.primaryBlue} />
      </View>
    </View>
  );
};

export default AddStudentScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scannerContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  form: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
});
