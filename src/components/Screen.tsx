import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/theme';

export function Screen({ children, padded = true }: { children: ReactNode; padded?: boolean }) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        paddingTop: insets.top + 8,
        paddingBottom: insets.bottom + 8,
        paddingHorizontal: padded ? 20 : 0,
      }}
    >
      {children}
    </View>
  );
}
