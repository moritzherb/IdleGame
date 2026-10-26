import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = { size?: number; color?: string };

export function CoinIcon({ size = 22 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={11} fill="#E09B12" />
      <Circle cx={12} cy={11} r={10} fill="#FFC53D" />
      <Circle cx={12} cy={11} r={6.5} fill="none" stroke="#E09B12" strokeWidth={1.6} />
      <Path d="M9.5 7.5 L12 6 L12 16" stroke="#E09B12" strokeWidth={2} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function StarIcon({ size = 20, color = '#FFC53D' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z"
        fill={color}
        stroke="rgba(0,0,0,0.15)"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 22, color = '#8F8474' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7.5 10V7.5a4.5 4.5 0 0 1 9 0V10" stroke={color} strokeWidth={2.6} fill="none" />
      <Rect x={4.5} y={10} width={15} height={11} rx={3} fill={color} />
      <Circle cx={12} cy={15.5} r={1.8} fill="#fff" />
    </Svg>
  );
}

export function GearIcon({ size = 24, color = '#2D2342' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M10.3 2h3.4l.5 2.6 1.9.8 2.2-1.5 2.4 2.4-1.5 2.2.8 1.9 2.6.5v3.4l-2.6.5-.8 1.9 1.5 2.2-2.4 2.4-2.2-1.5-1.9.8-.5 2.6h-3.4l-.5-2.6-1.9-.8-2.2 1.5-2.4-2.4 1.5-2.2-.8-1.9L2 13.7v-3.4l2.6-.5.8-1.9-1.5-2.2 2.4-2.4 2.2 1.5 1.9-.8z"
        fill={color}
      />
      <Circle cx={12} cy={12} r={3.4} fill="#fff" />
    </Svg>
  );
}

export function BackIcon({ size = 24, color = '#2D2342' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M15 4.5L7.5 12l7.5 7.5" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function CrownIcon({ size = 26, color = '#FFC53D' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" fill={color} stroke="rgba(0,0,0,0.2)" strokeWidth={1} strokeLinejoin="round" />
    </Svg>
  );
}
