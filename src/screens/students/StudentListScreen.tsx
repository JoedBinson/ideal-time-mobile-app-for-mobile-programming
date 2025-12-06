import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ConfirmDialog from '../../components/ConfirmDialog';
import StudentListItem from '../../components/StudentListItem';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'StudentList'>;

const StudentListScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const { students, deleteStudent } = useAppContext();

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const subjectStudents = students
    .filter(s => s.subjectId === subjectId)
    .sort((a, b) => a.fullName.localeCompare(b.fullName)); // already in "LastName, FirstName MI"

  const handleDeletePress = (studentId: string) => {
    setSelectedStudentId(studentId);
    setConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedStudentId) {
      deleteStudent(selectedStudentId);
    }
    setConfirmVisible(false);
    setSelectedStudentId(null);
  };

  return (
    <View style={styles.container}>
      {subjectStudents.length === 0 ? (
        <Text style={styles.empty}>No students yet for this subject.</Text>
      ) : (
        <FlatList
          data={subjectStudents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <StudentListItem
              student={item}
              onEdit={() =>
                navigation.navigate('EditStudent', {
                  subjectId,
                  studentId: item.id,
                })
              }
              onDelete={() => handleDeletePress(item.id)}
            />
          )}
        />
      )}

      <ConfirmDialog
        visible={confirmVisible}
        title="Delete student?"
        message="This will remove the student from this subject and their attendance records. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setConfirmVisible(false);
          setSelectedStudentId(null);
        }}
      />
    </View>
  );
};

export default StudentListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  empty: {
    marginTop: 16,
    textAlign: 'center',
    color: '#6B7280',
  },
});
