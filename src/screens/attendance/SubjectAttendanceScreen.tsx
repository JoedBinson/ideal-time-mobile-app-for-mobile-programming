import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AttendanceStatusBadge from '../../components/AttendanceStatusBadge';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'SubjectAttendance'>;

const SubjectAttendanceScreen: React.FC<Props> = ({ route }) => {
  const { subjectId } = route.params;
  const { subjects, students, getAttendanceBySubject } = useAppContext();

  const subject = subjects.find(s => s.id === subjectId);
  const allRecords = getAttendanceBySubject(subjectId);

  // Group by dateKey
  const groupByDate: Record<string, typeof allRecords> = {};
  allRecords.forEach(record => {
    if (!groupByDate[record.dateKey]) groupByDate[record.dateKey] = [];
    groupByDate[record.dateKey].push(record);
  });

  const dates = Object.keys(groupByDate).sort().reverse(); // newest first

  if (!subject) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Subject not found.</Text>
      </View>
    );
  }

  const renderDateSection = (dateKey: string) => {
    const recs = groupByDate[dateKey];
    return (
      <View key={dateKey} style={styles.dateSection}>
        <Text style={styles.dateTitle}>{formatDateLabel(dateKey)}</Text>
        {recs.map(r => {
          const student = students.find(s => s.id === r.studentId);
          const time = new Date(r.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <View key={r.id} style={styles.row}>
              <View style={styles.rowInfo}>
                <Text style={styles.name}>{student?.fullName ?? 'Unknown'}</Text>
                <Text style={styles.sub}>
                  {student?.studentNumber ?? '??'} · {time}
                </Text>
              </View>
              <AttendanceStatusBadge status={r.status} />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject.name} - Saved Attendance</Text>
      {dates.length === 0 ? (
        <Text style={styles.empty}>No attendance records yet.</Text>
      ) : (
        <FlatList
          data={dates}
          keyExtractor={d => d}
          renderItem={({ item }) => renderDateSection(item)}
        />
      )}
    </View>
  );
};

export default SubjectAttendanceScreen;

const formatDateLabel = (dateKey: string): string => {
  const [year, month, day] = dateKey.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

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
    marginBottom: 12,
  },
  empty: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
  dateSection: {
    marginBottom: 16,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 6,
    alignItems: 'center',
  },
  rowInfo: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  sub: {
    fontSize: 12,
    color: '#6B7280',
  },
});
