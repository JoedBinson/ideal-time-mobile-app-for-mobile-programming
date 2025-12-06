// src/components/SubjectCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';
import { computeLateThresholdMinutes, formatTimeLabel } from '../utils/timeUtils';

interface SubjectCardProps {
  subject: Subject;
  onPress: () => void;
}

// If you don't have a separate Subject type exported, you can inline it:
type Subject = {
  id: string;
  sectionId: string;
  name: string;
  dayOfWeek: string;
  totalClassHours: number;
  classStartTime: string;
  lateThresholdPercent: number;
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onPress }) => {
  const lateMinutes = computeLateThresholdMinutes(
    subject.totalClassHours,
    subject.lateThresholdPercent
  );

  const displayName = subject.name && subject.name.trim().length > 0
    ? subject.name
    : 'Untitled Subject';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.meta}>
        {subject.dayOfWeek || 'Day not set'} •{' '}
        {formatTimeLabel(subject.classStartTime) || 'Time not set'}
      </Text>
      <Text style={styles.late}>
        Late after ~{Math.round(lateMinutes)} minutes (
        {subject.lateThresholdPercent ?? 0}
        %)
      </Text>
    </TouchableOpacity>
  );
};

export default SubjectCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  late: {
    fontSize: 12,
    color: COLORS.accentYellow,
  },
});
