import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<AuthStackParamList, 'TeacherSetup'>;

const TeacherSetupScreen: React.FC<Props> = ({ navigation }) => {
  const { setTeacherProfile } = useAppContext();
  const [fullName, setFullName] = useState('');

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return;
    }
    setTeacherProfile(fullName.trim());
    navigation.getParent()?.navigate('Main' as never); // go to Main tabs
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Up Your Profile</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="e.g. Juan Dela Cruz"
      />
      <Button title="Save and Continue" onPress={handleSave} color={COLORS.primaryBlue} />
    </View>
  );
};

export default TeacherSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
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
    marginBottom: 24,
  },
});
