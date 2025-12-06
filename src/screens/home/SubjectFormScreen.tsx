// src/screens/home/SubjectFormScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useAppContext } from '../../context/AppContext';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'SubjectForm'>;

const SubjectFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { sectionId, subjectId } = route.params || {};
  const { sections, subjects, addSubject, updateSubject } = useAppContext();

  const editing = !!subjectId;
  const section = sections.find(s => s.id === sectionId);
  const existingSubject = subjects.find(s => s.id === subjectId);

  const [name, setName] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [totalHours, setTotalHours] = useState('3');
  const [startTime, setStartTime] = useState('08:00');
  const [lateThresholdPercent, setLateThresholdPercent] = useState('15');

  useEffect(() => {
    if (existingSubject) {
      setName(existingSubject.name);
      setDayOfWeek(existingSubject.dayOfWeek);
      setTotalHours(String(existingSubject.totalClassHours));
      setStartTime(existingSubject.classStartTime);
      setLateThresholdPercent(String(existingSubject.lateThresholdPercent));
    }
  }, [existingSubject]);

  const handleSave = () => {
    if (!section) {
      Alert.alert('Error', 'Section not found.');
      return;
    }
    if (!name.trim() || !dayOfWeek.trim() || !totalHours.trim()) {
      Alert.alert('Missing', 'Please fill in all required fields.');
      return;
    }

    const totalClassHours = Number(totalHours) || 1;
    const threshold = Number(lateThresholdPercent) || 15;

    if (editing && subjectId) {
      // 🔹 IMPORTANT: this call assumes your context has:
      // updateSubject(subjectId, name, dayOfWeek, totalClassHours, startTime, threshold)
      updateSubject(
        subjectId,
        name.trim(),
        dayOfWeek.trim(),
        totalClassHours,
        startTime.trim(),
        threshold
      );
    } else {
      // 🔹 IMPORTANT: this call assumes your context has:
      // addSubject(sectionId, name, dayOfWeek, totalClassHours, startTime, threshold)
      addSubject(
        section.id,
        name.trim(),
        dayOfWeek.trim(),
        totalClassHours,
        startTime.trim(),
        threshold
      );
    }

    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {editing ? 'Edit Subject' : 'Add Subject'}{' '}
          {section ? `(${section.name})` : ''}
        </Text>

        <Text style={styles.label}>Subject Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Web Development"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Day of Week</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Monday"
          value={dayOfWeek}
          onChangeText={setDayOfWeek}
        />

        <Text style={styles.label}>Total Class Hours</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 3"
          value={totalHours}
          onChangeText={setTotalHours}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Class Start Time (HH:MM)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 08:00"
          value={startTime}
          onChangeText={setStartTime}
        />

        <Text style={styles.label}>Late Threshold (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 15"
          value={lateThresholdPercent}
          onChangeText={setLateThresholdPercent}
          keyboardType="numeric"
        />

        <Button
          title={editing ? 'Save Changes' : 'Create Subject'}
          onPress={handleSave}
          color={COLORS.primaryBlue}
        />
      </View>
    </View>
  );
};

export default SubjectFormScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 12,
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
    marginBottom: 10,
  },
});
