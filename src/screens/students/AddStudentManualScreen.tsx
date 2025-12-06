import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'AddStudentManual'>;

// Helper: format "FirstName MI LastName" -> "LastName, FirstName MI"
const formatFullName = (firstName: string, middleInitial: string, lastName: string): string => {
  const mi = middleInitial.trim() ? ` ${middleInitial.trim()}` : '';
  return `${lastName.trim()}, ${firstName.trim()}${mi}`;
};

const AddStudentManualScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const { addStudent } = useAppContext();

  // STATE for form fields
  const [studentNumber, setStudentNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');

  const handleSave = () => {
    if (!studentNumber.trim() || !firstName.trim() || !lastName.trim() || !barcodeValue.trim()) {
      Alert.alert('Required', 'Please fill student number, names, and barcode value.');
      return;
    }

    const fullName = formatFullName(firstName, middleInitial, lastName);

    addStudent(subjectId, {
      studentNumber: studentNumber.trim(),
      fullName,
      barcodeValue: barcodeValue.trim(),
    });

    Alert.alert('Success', 'Student added.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Student Number</Text>
      <TextInput
        style={styles.input}
        value={studentNumber}
        onChangeText={setStudentNumber}
        keyboardType="numeric"
      />

      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

      <Text style={styles.label}>Middle Initial (optional)</Text>
      <TextInput style={styles.input} value={middleInitial} onChangeText={setMiddleInitial} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

      <Text style={styles.label}>Barcode Value</Text>
      <TextInput
        style={styles.input}
        value={barcodeValue}
        onChangeText={setBarcodeValue}
        placeholder="e.g. 2021301334 FirstName LastName BSIT"
      />

      <Button title="Save Student" onPress={handleSave} color={COLORS.primaryBlue} />
    </View>
  );
};

export default AddStudentManualScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
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
