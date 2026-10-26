import { router } from 'expo-router';
import { View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { GameButton } from '@/components/GameButton';
import { Screen } from '@/components/Screen';
import { TopBar } from '@/components/TopBar';
import { Txt } from '@/components/Txt';
import { getLevel, levelCount } from '@/levels';
import { haptics } from '@/services/haptics';
import { highestUnlocked, useGame } from '@/state/store';
import { colors } from '@/theme';

// Placeholder until the phone renderer lands in milestone 2. The finish buttons
// exist so progress, coins and unlocking can be tested on device.
export function LevelScreen({ id }: { id: number }) {
  const level = getLevel(id);
  const results = useGame((s) => s.results);
  const completeLevel = useGame((s) => s.completeLevel);

  if (!level || id > highestUnlocked(results)) {
    return (
      <Screen>
        <TopBar back />
        <Txt size={20} style={{ textAlign: 'center', marginTop: 40 }}>
          This level is locked.
        </Txt>
      </Screen>
    );
  }

  const finish = (stars: number) => {
    completeLevel(level.id, stars, 20 + stars * 10);
    haptics.success();
    if (level.id < levelCount) router.replace(`/level/${level.id + 1}`);
    else router.back();
  };

  return (
    <Screen>
      <TopBar title={`Level ${level.id}`} back />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Avatar owner={level.owner} size={96} />
        <Txt size={30} weight="bold">
          {level.owner.name}
        </Txt>
        <Txt size={18} weight="medium" color={colors.inkSoft}>
          {level.owner.role}
        </Txt>
        {level.intro ? (
          <Txt size={20} weight="bold" color={colors.coral} style={{ marginTop: 8 }}>
            {level.intro}
          </Txt>
        ) : null}
      </View>
      <Txt size={14} color={colors.inkSoft} style={{ textAlign: 'center', marginBottom: 10 }}>
        Debug: finish this level
      </Txt>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {[1, 2, 3].map((n) => (
          <GameButton key={n} style={{ flex: 1 }} size="sm" color={colors.mint} label={'★'.repeat(n)} onPress={() => finish(n)} />
        ))}
      </View>
    </Screen>
  );
}
