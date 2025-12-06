import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { COLORS } from '../utils/constants';

// PROPS here describe what parent components can pass in.
interface PrimaryButtonProps {
  title: string; // text on the button
  onPress: (event: GestureResponderEvent) => void; // function to call when tapped
  style?: ViewStyle; // optional styling from parent
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primaryBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.background,
    fontWeight: '600',
    fontSize: 16,
  },
});
