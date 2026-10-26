import { router } from 'expo-router';
import { ReactNode } from 'react';
import { View } from 'react-native';

import { CoinBadge } from './CoinBadge';
import { IconButton } from './IconButton';
import { BackIcon } from './Icons';
import { Txt } from './Txt';

type Props = { title?: string; back?: boolean; left?: ReactNode; showCoins?: boolean };

export function TopBar({ title, back, left, showCoins = true }: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, gap: 12 }}>
      {back ? (
        <IconButton label="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <BackIcon />
        </IconButton>
      ) : (
        left
      )}
      <Txt size={24} weight="bold" style={{ flex: 1 }} numberOfLines={1}>
        {title}
      </Txt>
      {showCoins ? <CoinBadge /> : null}
    </View>
  );
}
