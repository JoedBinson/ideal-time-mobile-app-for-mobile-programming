import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'EditStudent'>;

const EditStudentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { studentId } = route.params;
  const { students, updateStudent } = useAppContext();

  const [studentNumber, setStudentNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');

  useEffect(() => {
    const s = students.find(st => st.id === studentId);
    if (s) {
      setStudentNumber(s.studentNumber);
      setFullName(s.fullName);
      setBarcodeValue(s.barcodeValue);
    }
  }, [studentId, students]);

  const handleSave = () => {
    if (!studentNumber.trim() || !fullName.trim() || !barcodeValue.trim()) {
      Alert.alert('Required', 'Please fill all fields.');
      return;
    }

    Alert.alert(
      'Save changes?',
      'Update this student’s information?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          style: 'destructive',
          onPress: () => {
            updateStudent(studentId, {
              studentNumber: studentNumber.trim(),
              fullName: fullName.trim(),
              barcodeValue: barcodeValue.trim(),
            });
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Student Number</Text>
      <TextInput
        style={styles.input}
        value={studentNumber}
        onChangeText={setStudentNumber}
      />

      <Text style={styles.label}>Full Name ("LastName, FirstName MI")</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Barcode Value</Text>
      <TextInput
        style={styles.input}
        value={barcodeValue}
        onChangeText={setBarcodeValue}
      />

      <Button title="Save Changes" onPress={handleSave} color={COLORS.primaryBlue} />
    </View>
  );
};

export default EditStudentScreen;

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
    marginBottom: 16,
  },
});
