// src/screens/home/SectionsScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator';
import { useAppContext } from '../../context/AppContext';
import { COLORS } from '../../utils/constants';

type Props = NativeStackScreenProps<HomeStackParamList, 'Sections'>;

const SectionsScreen: React.FC<Props> = ({ navigation }) => {
  const { sections } = useAppContext();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Sections</Text>
        <Button
          title="Add Section"
          onPress={() => navigation.navigate('SectionForm', {})}
          color={COLORS.primaryBlue}
        />
      </View>

      {sections.length === 0 ? (
        <Text style={styles.empty}>No sections yet. Tap "Add Section" to create one.</Text>
      ) : (
        <FlatList
          data={sections}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('SectionDetail', { sectionId: item.id })
              }
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              {item.course && (
                <Text style={styles.cardSubtitle}>{item.course}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SectionsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 8,
  },
  empty: {
    color: '#6B7280',
  },
  card: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
});
