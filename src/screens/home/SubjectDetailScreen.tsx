// src/screens/home/SubjectDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useAppContext } from '../../context/AppContext';
import { COLORS } from '../../utils/constants';
import { computeLateThresholdMinutes, formatTimeLabel } from '../../utils/timeUtils';
import PrimaryButton from '../../components/PrimaryButton';

type Props = NativeStackScreenProps<HomeStackParamList, 'SubjectDetail'>;

const SubjectDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const { subjects, sections } = useAppContext();

  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Subject not found.</Text>
      </View>
    );
  }

  const section = sections.find(sec => sec.id === subject.sectionId);
  const hours = subject.totalClassHours ?? 0;
  const latePercent = subject.lateThresholdPercent ?? 0;
  const lateMinutes = computeLateThresholdMinutes(hours, latePercent);

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={styles.meta}>
            Section:{' '}
            <Text style={styles.bold}>{section?.name ?? 'Unknown'}</Text>
            {'\n'}
            Day:{' '}
            <Text style={styles.bold}>
              {subject.dayOfWeek || 'Not set'}
            </Text>
            {'\n'}
            Time:{' '}
            <Text style={styles.bold}>
              {formatTimeLabel(subject.classStartTime) || 'Not set'} (
              {hours || '?'} hours)
            </Text>
            {'\n'}
            Late after ~{Math.round(lateMinutes)} minutes (
            {latePercent}%)
          </Text>
        </View>

        <View style={styles.actionsCard}>
          <Text style={styles.actionsTitle}>Actions</Text>

          <PrimaryButton
            title="Add Student"
            onPress={() =>
              navigation.navigate('AddStudentOptions', { subjectId })
            }
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Students"
            onPress={() =>
              navigation.navigate('StudentList', { subjectId })
            }
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Get Attendance"
            onPress={() =>
              navigation.navigate('TakeAttendance', { subjectId })
            }
            style={styles.actionButton}
          />
          <PrimaryButton
            title="View Saved Attendance"
            onPress={() =>
              navigation.navigate('SubjectAttendance', { subjectId })
            }
            style={styles.actionButton}
          />
          <PrimaryButton
            title="Settings"
            onPress={() =>
              navigation.navigate('SubjectSettings', { subjectId })
            }
            style={[styles.actionButton, styles.settingsButton]}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SubjectDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  infoCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  bold: {
    fontWeight: '600',
  },
  actionsCard: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 16,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  actionButton: {
    marginBottom: 8,
  },
  settingsButton: {
    backgroundColor: COLORS.accentYellow,
  },
});
