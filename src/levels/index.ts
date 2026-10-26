import type { LevelDef } from './types';

import level_001 from './level_001.json';
import level_002 from './level_002.json';
import level_003 from './level_003.json';
import level_004 from './level_004.json';
import level_005 from './level_005.json';
import level_006 from './level_006.json';
import level_007 from './level_007.json';
import level_008 from './level_008.json';
import level_009 from './level_009.json';
import level_010 from './level_010.json';
import level_011 from './level_011.json';
import level_012 from './level_012.json';
import level_013 from './level_013.json';
import level_014 from './level_014.json';
import level_015 from './level_015.json';
import level_016 from './level_016.json';
import level_017 from './level_017.json';
import level_018 from './level_018.json';
import level_019 from './level_019.json';
import level_020 from './level_020.json';
import level_021 from './level_021.json';
import level_022 from './level_022.json';
import level_023 from './level_023.json';
import level_024 from './level_024.json';
import level_025 from './level_025.json';
import level_026 from './level_026.json';
import level_027 from './level_027.json';
import level_028 from './level_028.json';
import level_029 from './level_029.json';
import level_030 from './level_030.json';

export const levels = [
  level_001,
  level_002,
  level_003,
  level_004,
  level_005,
  level_006,
  level_007,
  level_008,
  level_009,
  level_010,
  level_011,
  level_012,
  level_013,
  level_014,
  level_015,
  level_016,
  level_017,
  level_018,
  level_019,
  level_020,
  level_021,
  level_022,
  level_023,
  level_024,
  level_025,
  level_026,
  level_027,
  level_028,
  level_029,
  level_030,
] as LevelDef[];

export function getLevel(id: number): LevelDef | undefined {
  return levels[id - 1];
}

export const levelCount = levels.length;
