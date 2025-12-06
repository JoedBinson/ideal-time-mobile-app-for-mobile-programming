// src/navigation/HomeStackNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SectionsScreen from '../screens/home/SectionsScreen';
import SectionFormScreen from '../screens/home/SectionFormScreen';
import SectionDetailScreen from '../screens/home/SectionDetailScreen';
import SubjectFormScreen from '../screens/home/SubjectFormScreen';
import SubjectDetailScreen from '../screens/home/SubjectDetailScreen';
import SubjectSettingsScreen from '../screens/home/SubjectSettingsScreen';

// student & attendance screens
import AddStudentOptionsScreen from '../screens/students/AddStudentOptionsScreen';
import AddStudentManualScreen from '../screens/students/AddStudentManualScreen';
import AddStudentScanScreen from '../screens/students/AddStudentScanScreen';
import StudentListScreen from '../screens/students/StudentListScreen';
import EditStudentScreen from '../screens/students/EditStudentScreen';
import TakeAttendanceScreen from '../screens/attendance/TakeAttendanceScreen';
import SubjectAttendanceScreen from '../screens/attendance/SubjectAttendanceScreen';

export type HomeStackParamList = {
  Sections: undefined;
  SectionForm: { sectionId?: string } | undefined;
  SectionDetail: { sectionId: string };
  SubjectForm: { sectionId: string; subjectId?: string } | undefined;
  SubjectDetail: { subjectId: string };
  SubjectSettings: { subjectId: string };

  AddStudentOptions: { subjectId: string };
  AddStudentManual: { subjectId: string };
  AddStudentScan: { subjectId: string };
  StudentList: { subjectId: string };
  EditStudent: { subjectId: string; studentId: string };

  TakeAttendance: { subjectId: string };
  SubjectAttendance: { subjectId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sections"
        component={SectionsScreen}
        options={{ title: 'Sections' }}
      />
      <Stack.Screen
        name="SectionForm"
        component={SectionFormScreen}
        options={{ title: 'Section' }}
      />
      <Stack.Screen
        name="SectionDetail"
        component={SectionDetailScreen}
        options={{ title: 'Section Details' }}
      />
      <Stack.Screen
        name="SubjectForm"
        component={SubjectFormScreen}
        options={{ title: 'Subject' }}
      />
      <Stack.Screen
        name="SubjectDetail"
        component={SubjectDetailScreen}
        options={{ title: 'Subject Details' }}
      />
      <Stack.Screen
        name="SubjectSettings"
        component={SubjectSettingsScreen}
        options={{ title: 'Subject Settings' }}
      />

      <Stack.Screen
        name="AddStudentOptions"
        component={AddStudentOptionsScreen}
        options={{ title: 'Add Student' }}
      />
      <Stack.Screen
        name="AddStudentManual"
        component={AddStudentManualScreen}
        options={{ title: 'Add Student (Manual)' }}
      />
      <Stack.Screen
        name="AddStudentScan"
        component={AddStudentScanScreen}
        options={{ title: 'Add Student (ID Scan)' }}
      />
      <Stack.Screen
        name="StudentList"
        component={StudentListScreen}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name="EditStudent"
        component={EditStudentScreen}
        options={{ title: 'Edit Student' }}
      />

      <Stack.Screen
        name="TakeAttendance"
        component={TakeAttendanceScreen}
        options={{ title: 'Take Attendance' }}
      />
      <Stack.Screen
        name="SubjectAttendance"
        component={SubjectAttendanceScreen}
        options={{ title: 'Attendance Records' }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
