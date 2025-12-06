import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AttendanceHistoryScreen from '../screens/attendance/AttendanceHistoryScreen';

export type AttendanceStackParamList = {
  AttendanceHistoryRoot: undefined;
};

const Stack = createNativeStackNavigator<AttendanceStackParamList>();

const AttendanceStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AttendanceHistoryRoot"
        component={AttendanceHistoryScreen}
        options={{ title: 'Attendance' }}
      />
    </Stack.Navigator>
  );
};

export default AttendanceStackNavigator;
