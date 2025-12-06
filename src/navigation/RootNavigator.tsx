import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAppContext } from '../context/AppContext';
import SplashScreen from '../screens/auth/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

// Stack navigator type (root level)
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  // We use Context to decide whether to show Auth or Main (guarded route)
  const { isLoggedIn } = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash is first screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* Auth stack: Login + TeacherSetup */}
        {!isLoggedIn && <Stack.Screen name="Auth" component={AuthNavigator} />}
        {/* Main tabs: only available when logged in */}
        {isLoggedIn && <Stack.Screen name="Main" component={MainTabNavigator} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
