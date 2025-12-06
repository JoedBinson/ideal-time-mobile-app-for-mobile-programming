import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // STATE: local username/password values typed by user
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAppContext(); // from Context

  const handleLogin = () => {
    const ok = login(username, password);
    if (!ok) {
      Alert.alert('Login failed', 'Invalid username or password.');
      return;
    }
    // After successful login, go to TeacherSetup
    navigation.replace('TeacherSetup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleLogin} color={COLORS.primaryBlue} />
      <Text style={styles.hint}>Demo: teacher / 1234</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  hint: {
    marginTop: 12,
    textAlign: 'center',
    color: '#6B7280',
  },
});
