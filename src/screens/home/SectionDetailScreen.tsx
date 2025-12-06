// src/screens/home/SectionDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useAppContext } from '../../context/AppContext';
import SubjectCard from '../../components/SubjectCard';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'SectionDetail'>;

const SectionDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { sectionId } = route.params;
  const { sections, subjects } = useAppContext();

  const section = sections.find(s => s.id === sectionId);

  if (!section) {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Section not found.</Text>
      </View>
    );
  }

  const sectionSubjects = subjects.filter(s => s.sectionId === sectionId);

  return (
    <View style={styles.root}>
      <View style={styles.headerCard}>
        <Text style={styles.sectionName}>{section.name}</Text>
        <Text style={styles.subtitle}>Configure subjects for this section.</Text>
        <View style={styles.headerButtons}>
          <Button
            title="Edit Section Name"
            onPress={() =>
              navigation.navigate('SectionForm', {
                sectionId: section.id,
              })
            }
            color={COLORS.primaryBlue}
          />
        </View>
      </View>

      <View style={styles.contentCard}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Subjects</Text>
          <PrimaryButton
            title="Add Subject"
            onPress={() =>
              navigation.navigate('SubjectForm', {
                sectionId: section.id,
              })
            }
            style={styles.addSubjectButton}
          />
        </View>

        {sectionSubjects.length === 0 ? (
          <Text style={styles.emptyText}>No subjects yet. Add one to get started.</Text>
        ) : (
          <FlatList
            data={sectionSubjects}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SubjectCard
                subject={item}
                onPress={() =>
                  navigation.navigate('SubjectDetail', {
                    subjectId: item.id,
                  })
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default SectionDetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  headerCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  headerButtons: {
    marginTop: 12,
  },
  contentCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  addSubjectButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  emptyText: {
    color: '#6B7280',
  },
});
