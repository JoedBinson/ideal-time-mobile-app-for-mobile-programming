import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/constants';
import { AttendanceStatus } from '../utils/types';

interface AttendanceStatusBadgeProps {
  status: AttendanceStatus;   // PROP: 'PRESENT' | 'LATE' | 'ABSENT'
}

const AttendanceStatusBadge: React.FC<AttendanceStatusBadgeProps> = ({ status }) => {
  let backgroundColor = COLORS.statusPresent;
  let label = 'Present';

  if (status === 'LATE') {
    backgroundColor = COLORS.statusLate;
    label = 'Late';
  } else if (status === 'ABSENT') {
    backgroundColor = COLORS.statusAbsent;
    label = 'Absent';
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default AttendanceStatusBadge;

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
