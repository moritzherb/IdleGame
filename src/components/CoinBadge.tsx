import { View } from 'react-native';

import { useGame } from '@/state/store';
import { colors } from '@/theme';
import { CoinIcon } from './Icons';
import { Txt } from './Txt';

export function CoinBadge() {
  const coins = useGame((s) => s.coins);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: colors.white,
        borderRadius: 999,
        paddingLeft: 6,
        paddingRight: 14,
        height: 38,
        borderBottomWidth: 4,
        borderBottomColor: colors.bgDeep,
      }}
    >
      <CoinIcon size={26} />
      <Txt size={18} weight="bold">
        {coins.toLocaleString('en-US')}
      </Txt>
    </View>
  );
}
