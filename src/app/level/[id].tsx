import { useLocalSearchParams } from 'expo-router';

import { LevelScreen } from '@/screens/LevelScreen';

export default function LevelRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // key forces a fresh screen state when replacing one level with the next
  return <LevelScreen key={id} id={Number(id)} />;
}
