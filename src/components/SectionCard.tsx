import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';
import { Section } from '../utils/types';

interface SectionCardProps {
  section: Section; // full section object from context
  onPress: () => void; // what to do when teacher taps the card
  onEdit?: () => void; // optional: tap edit icon
}

const SectionCard: React.FC<SectionCardProps> = ({ section, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{section.name}</Text>
    </TouchableOpacity>
  );
};

export default SectionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryBlue,
  },
});
