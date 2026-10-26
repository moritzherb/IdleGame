import { ReactNode } from 'react';
import { Pressable } from 'react-native';

import { haptics } from '@/services/haptics';
import { colors } from '@/theme';

type Props = { onPress: () => void; children: ReactNode; label: string };

export function IconButton({ onPress, children, label }: Props) {
  return (
    <Pressable
      accessibilityLabel={label}
      hitSlop={8}
      onPress={() => {
        haptics.tap();
        onPress();
      }}
      style={({ pressed }) => ({
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: colors.bgDeep,
        transform: [{ translateY: pressed ? 2 : 0 }],
      })}
    >
      {children}
    </Pressable>
  );
}
