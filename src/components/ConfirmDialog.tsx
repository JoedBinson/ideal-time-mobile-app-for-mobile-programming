import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/constants';

interface ConfirmDialogProps {
  visible: boolean;        // PROP: shows/hides the dialog
  title: string;           // PROP: dialog title
  message: string;         // PROP: message to show
  confirmLabel?: string;   // optional button text
  cancelLabel?: string;    // optional button text
  onConfirm: () => void;   // called when user confirms
  onCancel: () => void;    // called when user cancels
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            <Button title={cancelLabel} onPress={onCancel} color="#6B7280" />
            <Button title={confirmLabel} onPress={onConfirm} color={COLORS.statusAbsent} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 16,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
