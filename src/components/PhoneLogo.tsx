import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

const APP_COLORS = ['#FF6B57', '#FFC53D', '#2FCB95', '#4DA3FF', '#C86BFA', '#FF8A3D', '#3DC7D9', '#FF4FA3', '#7FB33A'];

function Sparkle({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <Path
      d={`M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z`}
      fill={color}
    />
  );
}

export function PhoneLogo({ size = 220 }: { size?: number }) {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
    );
  }, [t]);

  const bob = useAnimatedStyle(() => ({
    transform: [{ translateY: -8 * t.value }, { rotate: `${-7 + t.value * 2}deg` }],
  }));

  return (
    <Animated.View style={[{ width: size, height: size }, bob]}>
      <Svg width={size} height={size} viewBox="0 0 200 200">
        <Rect x={52} y={14} width={96} height={176} rx={22} fill="#2D2342" />
        <Rect x={58} y={20} width={84} height={164} rx={17} fill="#BFE8FF" />
        <Rect x={86} y={24} width={28} height={7} rx={3.5} fill="#2D2342" />
        <G>
          {APP_COLORS.map((c, i) => (
            <Rect
              key={i}
              x={66 + (i % 3) * 25}
              y={42 + Math.floor(i / 3) * 27}
              width={18}
              height={18}
              rx={5}
              fill={c}
            />
          ))}
        </G>
        <Rect x={66} y={128} width={68} height={22} rx={8} fill="#fff" opacity={0.85} />
        <Rect x={72} y={135} width={36} height={4} rx={2} fill="#9AB8CC" />
        <Rect x={72} y={142} width={24} height={3} rx={1.5} fill="#C5D8E5" />
        <Circle cx={100} cy={170} r={5} fill="#fff" opacity={0.7} />
        <Path d="M64 36 L82 36 L64 70 Z" fill="#fff" opacity={0.35} />
        <Sparkle x={160} y={42} s={16} color="#FFC53D" />
        <Sparkle x={38} y={120} s={11} color="#FF6B57" />
        <Sparkle x={168} y={150} s={8} color="#2FCB95" />
      </Svg>
    </Animated.View>
  );
}
