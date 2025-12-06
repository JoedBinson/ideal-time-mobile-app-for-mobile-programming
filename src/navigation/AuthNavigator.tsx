import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/auth/LoginScreen';
import TeacherSetupScreen from '../screens/auth/TeacherSetupScreen';

export type AuthStackParamList = {
  Login: undefined;
  TeacherSetup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* Login screen first */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      {/* After login, teacher fills basic profile */}
      <Stack.Screen
        name="TeacherSetup"
        component={TeacherSetupScreen}
        options={{ title: 'Set Up Profile' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
