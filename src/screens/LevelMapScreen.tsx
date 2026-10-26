import { router } from 'expo-router';
import { useMemo, useRef } from 'react';
import { ScrollView, ScrollViewInstance, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Avatar } from '@/components/Avatar';
import { LevelNode, NodeState } from '@/components/LevelNode';
import { Screen } from '@/components/Screen';
import { TopBar } from '@/components/TopBar';
import { Txt } from '@/components/Txt';
import { levels } from '@/levels';
import { highestUnlocked, useGame } from '@/state/store';
import { colors } from '@/theme';

const SPACING = 120;
const PAD = 90;

export function LevelMapScreen() {
  const { width, height } = useWindowDimensions();
  const results = useGame((s) => s.results);
  const unlocked = highestUnlocked(results);
  const scroll = useRef<ScrollViewInstance>(null);

  const contentHeight = levels.length * SPACING + PAD * 2;

  // Level 1 sits at the bottom and the path winds upwards.
  const points = useMemo(
    () =>
      levels.map((_, i) => ({
        x: width / 2 + Math.sin(i * 0.85) * (width * 0.26),
        y: contentHeight - PAD - i * SPACING,
      })),
    [width, contentHeight],
  );

  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const prev = points[i - 1];
      const midY = (prev.y + p.y) / 2;
      return `C${prev.x} ${midY} ${p.x} ${midY} ${p.x} ${p.y}`;
    })
    .join(' ');

  const current = Math.min(unlocked, levels.length);

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: 20 }}>
        <TopBar title="Levels" back />
      </View>
      <ScrollView
        ref={scroll}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          const y = points[current - 1].y - height / 2;
          scroll.current?.scrollTo({ y: Math.max(0, y), animated: false });
        }}
      >
        <View style={{ height: contentHeight }}>
          <Svg width={width} height={contentHeight} style={{ position: 'absolute' }}>
            <Path d={pathD} stroke={colors.bgDeep} strokeWidth={18} fill="none" strokeLinecap="round" />
            <Path
              d={pathD}
              stroke="#fff"
              strokeWidth={4}
              fill="none"
              strokeDasharray="2 14"
              strokeLinecap="round"
            />
          </Svg>

          {levels.map((level, i) => {
            const state: NodeState = level.id < unlocked ? 'done' : level.id === unlocked ? 'current' : 'locked';
            const p = points[i];
            const nodeW = (level.boss ? 84 : 66) + 40;
            const labelOnLeft = p.x > width / 2;
            return (
              <View key={level.id} style={{ position: 'absolute', left: p.x - nodeW / 2, top: p.y - 45 }}>
                <LevelNode
                  level={level}
                  state={state}
                  stars={results[level.id]?.stars ?? 0}
                  onPress={() => router.push(`/level/${level.id}`)}
                />
                {state !== 'locked' ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: level.boss ? 40 : 18,
                      [labelOnLeft ? 'right' : 'left']: nodeW - 6,
                      flexDirection: labelOnLeft ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      gap: 6,
                      width: 140,
                    }}
                  >
                    <Avatar owner={level.owner} size={30} />
                    <Txt
                      size={13}
                      weight="semibold"
                      color={colors.inkSoft}
                      numberOfLines={1}
                      style={{ flexShrink: 1, textAlign: labelOnLeft ? 'right' : 'left' }}
                    >
                      {level.owner.name}
                    </Txt>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}
