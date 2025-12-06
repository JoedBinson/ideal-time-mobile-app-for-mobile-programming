import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'SectionForm'>;

const SectionFormScreen: React.FC<Props> = ({ route, navigation }) => {
  const { sectionId } = route.params || {};
  const { sections, addSection, updateSection } = useAppContext();

  // STATE: local form value for section name
  const [name, setName] = useState('');

  useEffect(() => {
    if (sectionId) {
      const existing = sections.find(s => s.id === sectionId);
      if (existing) setName(existing.name);
    }
  }, [sectionId, sections]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter a section name (e.g. BSIT-2A).');
      return;
    }

    if (sectionId) {
      updateSection(sectionId, name.trim());
    } else {
      addSection(name.trim());
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Section Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. BSIT-2A"
        value={name}
        onChangeText={setName}
      />
      <Button
        title={sectionId ? 'Update Section' : 'Create Section'}
        onPress={handleSave}
        color={COLORS.primaryBlue}
      />
    </View>
  );
};

export default SectionFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
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
});
