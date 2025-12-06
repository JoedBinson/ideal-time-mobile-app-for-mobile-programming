import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AttendanceStatusBadge from '../../components/AttendanceStatusBadge';
import CameraScanner from '../../components/CameraScanner';
import ToastMessage from '../../components/ToastMessage';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'TakeAttendance'>;

const TakeAttendanceScreen: React.FC<Props> = ({ route }) => {
  const { subjectId } = route.params;
  const { subjects, sections, recordAttendanceFromBarcode } = useAppContext();

  const subject = subjects.find(s => s.id === subjectId);
  const section = subject ? sections.find(sec => sec.id === subject.sectionId) : null;

  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');
  const [lastStatus, setLastStatus] = useState<string | null>(null);

  if (!subject) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Subject not found.</Text>
      </View>
    );
  }

  const handleBarcodeScanned = (value: string) => {
    const result = recordAttendanceFromBarcode(subjectId, value);
    if (!result.success) {
      setLastStatus(null);
      setToastText(result.message);
    } else {
      setLastStatus(result.status ?? null);
      setToastText(
        result.status === 'PRESENT'
          ? 'Attendance recorded: Present'
          : 'Attendance recorded: Late'
      );
    }
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.meta}>
        Section: {section?.name ?? 'Unknown'}
        {'\n'}
        Scan student IDs to record attendance.
      </Text>

      <View style={styles.scanner}>
        <CameraScanner onBarcodeScanned={handleBarcodeScanned} />
      </View>

      {lastStatus && (
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Last status:</Text>
          <AttendanceStatusBadge status={lastStatus as any} />
        </View>
      )}

      <ToastMessage visible={toastVisible} text={toastText} />
    </View>
  );
};

export default TakeAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 12,
  },
  scanner: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: COLORS.textDark,
  },
});
