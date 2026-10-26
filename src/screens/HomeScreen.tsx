import { router } from 'expo-router';
import { View } from 'react-native';

import { GameButton } from '@/components/GameButton';
import { IconButton } from '@/components/IconButton';
import { GearIcon } from '@/components/Icons';
import { PhoneLogo } from '@/components/PhoneLogo';
import { Screen } from '@/components/Screen';
import { TopBar } from '@/components/TopBar';
import { Txt } from '@/components/Txt';
import { levelCount } from '@/levels';
import { highestUnlocked, useGame } from '@/state/store';
import { colors } from '@/theme';

export function HomeScreen() {
  const results = useGame((s) => s.results);
  const next = Math.min(highestUnlocked(results), levelCount);

  return (
    <Screen>
      <TopBar
        left={
          <IconButton label="Settings" onPress={() => router.push('/settings')}>
            <GearIcon />
          </IconButton>
        }
      />

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <PhoneLogo size={230} />
        <Txt
          size={54}
          weight="bold"
          style={{
            marginTop: 8,
            letterSpacing: -1,
            textShadowColor: colors.bgDeep,
            textShadowOffset: { width: 0, height: 4 },
            textShadowRadius: 0,
          }}
        >
          Phone Tidy
        </Txt>
        <Txt size={17} weight="medium" color={colors.inkSoft}>
          Every phone is a mess. Fix it.
        </Txt>
      </View>

      <View style={{ gap: 14, paddingBottom: 12 }}>
        <GameButton size="lg" label="Play" sublabel={`Level ${next}`} onPress={() => router.push(`/level/${next}`)} />
        <GameButton label="Levels" color={colors.sky} onPress={() => router.push('/map')} />
      </View>
    </Screen>
  );
}
