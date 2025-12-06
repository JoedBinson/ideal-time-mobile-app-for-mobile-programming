import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/constants';
import { Student } from '../utils/types';

interface StudentListItemProps {
  student: Student;          // PROP: which student to render
  onEdit: () => void;        // PROP: called when "Edit" is tapped
  onDelete: () => void;      // PROP: called when "Delete" is tapped
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{student.fullName}</Text>
        <Text style={styles.subtitle}>ID: {student.studentNumber}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentListItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  edit: {
    color: COLORS.primaryBlue,
    fontWeight: '600',
    marginRight: 16,
  },
  delete: {
    color: COLORS.statusAbsent,
    fontWeight: '600',
  },
});
