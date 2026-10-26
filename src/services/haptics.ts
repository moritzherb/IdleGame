import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

import { useGame } from '@/state/store';

function enabled() {
  return Platform.OS !== 'web' && useGame.getState().settings.haptics;
}

export const haptics = {
  tap() {
    if (enabled()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  bump() {
    if (enabled()) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },
  success() {
    if (enabled()) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  error() {
    if (enabled()) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
};
