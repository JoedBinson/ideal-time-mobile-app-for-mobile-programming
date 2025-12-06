import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';
import { computeLateThresholdMinutes } from '../../utils/timeUtils';

type Props = NativeStackScreenProps<HomeStackParamList, 'SubjectSettings'>;

const SubjectSettingsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const { subjects, updateSubject } = useAppContext();

  const subject = subjects.find(s => s.id === subjectId);

  const [totalHours, setTotalHours] = useState('');
  const [latePercent, setLatePercent] = useState('');

  useEffect(() => {
    if (subject) {
      setTotalHours(subject.totalClassHours.toString());
      setLatePercent(subject.lateThresholdPercent.toString());
    }
  }, [subject]);

  if (!subject) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Subject not found.</Text>
      </View>
    );
  }

  const currentLateMinutes = computeLateThresholdMinutes(
    Number(totalHours || subject.totalClassHours),
    Number(latePercent || subject.lateThresholdPercent)
  );

  const handleSave = () => {
    const hoursNumber = Number(totalHours);
    const percentNumber = Number(latePercent);

    if (
      isNaN(hoursNumber) ||
      hoursNumber <= 0 ||
      isNaN(percentNumber) ||
      percentNumber <= 0 ||
      percentNumber >= 100
    ) {
      Alert.alert(
        'Invalid',
        'Total hours must be > 0 and late threshold must be between 1 and 99.'
      );
      return;
    }

    updateSubject(subjectId, {
      totalClassHours: hoursNumber,
      lateThresholdPercent: percentNumber,
    });

    Alert.alert('Saved', 'Subject settings updated.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subject Settings</Text>
      <Text style={styles.label}>Total Class Hours</Text>
      <TextInput
        style={styles.input}
        value={totalHours}
        onChangeText={setTotalHours}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Late Threshold (%)</Text>
      <TextInput
        style={styles.input}
        value={latePercent}
        onChangeText={setLatePercent}
        keyboardType="numeric"
      />

      <Text style={styles.info}>
        With these settings, a student is considered late if they arrive more than{' '}
        {Math.round(currentLateMinutes)} minutes after the start of class.
      </Text>

      <Button title="Save Settings" onPress={handleSave} color={COLORS.primaryBlue} />
    </View>
  );
};

export default SubjectSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 16,
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
  info: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
});
