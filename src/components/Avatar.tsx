import { View } from 'react-native';

import type { Owner } from '@/levels/types';
import { Txt } from './Txt';

export function Avatar({ owner, size = 40 }: { owner: Owner; size?: number }) {
  const initials = owner.name
    .replace(/^(Dr\.|Mr\.|Ms\.|Captain|Coach|Chef|Agent|Mayor|Grandma|Grandpa)\s+/, '')
    .slice(0, 1);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: owner.color,
        borderWidth: 3,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Txt size={size * 0.45} weight="bold" color="#fff">
        {initials}
      </Txt>
    </View>
  );
}
