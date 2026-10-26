import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import type { LevelDef } from '@/levels/types';
import { haptics } from '@/services/haptics';
import { colors, shade } from '@/theme';
import { CrownIcon, LockIcon, StarIcon } from './Icons';
import { Txt } from './Txt';

export type NodeState = 'done' | 'current' | 'locked';

type Props = {
  level: LevelDef;
  state: NodeState;
  stars: number;
  onPress: () => void;
};

export function LevelNode({ level, state, stars, onPress }: Props) {
  const size = level.boss ? 84 : 66;
  const face =
    state === 'locked' ? colors.locked : level.boss ? colors.plum : state === 'current' ? colors.coral : colors.mint;

  const pulse = useSharedValue(1);
  useEffect(() => {
    if (state === 'current') pulse.value = withRepeat(withTiming(1.08, { duration: 700 }), -1, true);
  }, [state, pulse]);
  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  return (
    <View style={{ alignItems: 'center', width: size + 40 }}>
      {level.boss ? (
        <View style={{ marginBottom: -10, zIndex: 1 }}>
          <CrownIcon size={34} color={state === 'locked' ? colors.lockedDark : colors.sun} />
        </View>
      ) : null}
      <Animated.View style={pulseStyle}>
        <Pressable
          disabled={state === 'locked'}
          onPress={() => {
            haptics.tap();
            onPress();
          }}
          style={({ pressed }) => ({
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: face,
            borderBottomWidth: pressed ? 2 : 6,
            borderBottomColor: state === 'locked' ? colors.lockedDark : shade(face),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 4,
            borderTopColor: '#fff',
            borderLeftColor: '#fff',
            borderRightColor: '#fff',
          })}
        >
          {state === 'locked' ? (
            <LockIcon size={level.boss ? 30 : 24} />
          ) : (
            <Txt size={level.boss ? 32 : 26} weight="bold" color="#fff">
              {level.id}
            </Txt>
          )}
        </Pressable>
      </Animated.View>
      <View style={{ flexDirection: 'row', height: 20, marginTop: 2 }}>
        {state === 'done'
          ? [1, 2, 3].map((n) => <StarIcon key={n} size={18} color={n <= stars ? colors.sun : colors.locked} />)
          : null}
      </View>
    </View>
  );
}
