import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { haptics } from '@/services/haptics';
import { colors } from '@/theme';

type Props = { value: boolean; onChange: (v: boolean) => void; label: string };

export function Toggle({ value, onChange, label }: Props) {
  const t = useSharedValue(value ? 1 : 0);
  useEffect(() => {
    t.value = withTiming(value ? 1 : 0, { duration: 160 });
  }, [value, t]);

  const track = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(t.value, [0, 1], [colors.locked, colors.mint]),
  }));
  const knob = useAnimatedStyle(() => ({ transform: [{ translateX: t.value * 26 }] }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => {
        onChange(!value);
        haptics.tap();
      }}
    >
      <Animated.View style={[{ width: 62, height: 36, borderRadius: 18, padding: 4 }, track]}>
        <Animated.View style={[{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#fff' }, knob]} />
      </Animated.View>
    </Pressable>
  );
}
