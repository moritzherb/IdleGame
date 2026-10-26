import { Alert, Platform, View } from 'react-native';

import { GameButton } from '@/components/GameButton';
import { Screen } from '@/components/Screen';
import { Toggle } from '@/components/Toggle';
import { TopBar } from '@/components/TopBar';
import { Txt } from '@/components/Txt';
import { Settings, useGame } from '@/state/store';
import { colors, radius } from '@/theme';

const rows: { key: keyof Settings; label: string }[] = [
  { key: 'sound', label: 'Sound effects' },
  { key: 'music', label: 'Music' },
  { key: 'haptics', label: 'Vibration' },
];

export function SettingsScreen() {
  const settings = useGame((s) => s.settings);
  const setSetting = useGame((s) => s.setSetting);
  const resetProgress = useGame((s) => s.resetProgress);

  const confirmReset = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Reset all progress and coins?')) resetProgress();
      return;
    }
    Alert.alert('Reset progress?', 'This clears all levels and coins.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetProgress },
    ]);
  };

  return (
    <Screen>
      <TopBar title="Settings" back showCoins={false} />
      <View style={{ backgroundColor: colors.white, borderRadius: radius.lg, marginTop: 16, paddingHorizontal: 18 }}>
        {rows.map((row, i) => (
          <View
            key={row.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              borderTopWidth: i === 0 ? 0 : 2,
              borderTopColor: colors.bg,
            }}
          >
            <Txt size={19}>{row.label}</Txt>
            <Toggle label={row.label} value={settings[row.key]} onChange={(v) => setSetting(row.key, v)} />
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }} />
      <GameButton size="sm" label="Reset progress" color={colors.white} textColor={colors.coralDark} onPress={confirmReset} />
    </Screen>
  );
}
