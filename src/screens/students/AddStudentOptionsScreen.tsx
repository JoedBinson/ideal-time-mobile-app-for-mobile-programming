import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'AddStudentOptions'>;

const AddStudentOptionsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { subjectId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>
      <Text style={styles.subtitle}>Choose how you want to add a student:</Text>

      <PrimaryButton
        title="Manual Input"
        onPress={() => navigation.navigate('AddStudentManual', { subjectId })}
        style={{ marginTop: 16 }}
      />
      <PrimaryButton
        title="Use ID (Scan Barcode)"
        onPress={() => navigation.navigate('AddStudentScan', { subjectId })}
        style={{ marginTop: 8 }}
      />
    </View>
  );
};

export default AddStudentOptionsScreen;

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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textDark,
  },
});
