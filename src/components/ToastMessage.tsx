import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/constants';

interface ToastMessageProps {
  visible: boolean;  // PROP: show/hide
  text: string;      // PROP: message text
}

const ToastMessage: React.FC<ToastMessageProps> = ({ visible, text }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    opacity: 0.9,
  },
  text: {
    color: COLORS.background,
    textAlign: 'center',
  },
});
