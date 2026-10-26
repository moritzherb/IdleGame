import { Text, TextProps } from 'react-native';

import { colors, fonts } from '@/theme';

type Props = TextProps & {
  size?: number;
  weight?: keyof typeof fonts;
  color?: string;
};

export function Txt({ size = 16, weight = 'semibold', color = colors.ink, style, ...rest }: Props) {
  return <Text {...rest} style={[{ fontFamily: fonts[weight], fontSize: size, color }, style]} />;
}
