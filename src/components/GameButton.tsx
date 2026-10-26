import { ReactNode, useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { haptics } from '@/services/haptics';
import { colors, radius, shade } from '@/theme';
import { Txt } from './Txt';

type Props = {
  label: string;
  sublabel?: string;
  onPress?: () => void;
  color?: string;
  textColor?: string;
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const LIP = 6;

const sizes = {
  lg: { height: 72, font: 30, px: 36 },
  md: { height: 56, font: 22, px: 26 },
  sm: { height: 44, font: 17, px: 18 },
};

// Chunky button with a darker "lip" underneath that the face sinks into when pressed.
export function GameButton({
  label,
  sublabel,
  onPress,
  color = colors.coral,
  textColor = colors.white,
  size = 'md',
  disabled,
  icon,
  style,
}: Props) {
  const [down, setDown] = useState(false);
  const s = sizes[size];
  const face = disabled ? colors.locked : color;

  return (
    <Pressable
      disabled={disabled}
      onPressIn={() => setDown(true)}
      onPressOut={() => setDown(false)}
      onPress={() => {
        haptics.tap();
        onPress?.();
      }}
      style={[{ height: s.height + LIP }, style]}
    >
      <View
        style={{
          position: 'absolute',
          top: LIP,
          left: 0,
          right: 0,
          height: s.height,
          borderRadius: radius.lg,
          backgroundColor: shade(face),
        }}
      />
      <View
        style={{
          height: s.height,
          marginTop: down ? LIP - 1 : 0,
          borderRadius: radius.lg,
          backgroundColor: face,
          paddingHorizontal: s.px,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {icon}
        <View style={{ alignItems: 'center' }}>
          <Txt size={s.font} weight="bold" color={disabled ? colors.inkSoft : textColor}>
            {label}
          </Txt>
          {sublabel ? (
            <Txt size={13} weight="medium" color={disabled ? colors.inkSoft : textColor} style={{ opacity: 0.85, marginTop: -4 }}>
              {sublabel}
            </Txt>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
