import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/constants';

interface ProfileHeaderProps {
  fullName: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ fullName }) => {
  return (
    <View style={styles.container}>
      {/* Circle with initials */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {fullName
            .split(' ')
            .map(part => part[0]?.toUpperCase() ?? '')
            .slice(0, 2)
            .join('')}
        </Text>
      </View>
      <Text style={styles.name}>{fullName}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: COLORS.background,
    fontSize: 28,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
});
