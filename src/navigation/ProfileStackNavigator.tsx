import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AppSettingsScreen from '../screens/settings/AppSettingsScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';

export type ProfileStackParamList = {
  Profile: undefined;
  AppSettings: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Stack.Screen
        name="AppSettings"
        component={AppSettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
