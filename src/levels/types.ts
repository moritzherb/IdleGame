export type Owner = {
  name: string;
  role: string;
  color: string;
};

export type LevelDef = {
  id: number;
  owner: Owner;
  wallpaper: string;
  boss: boolean;
  intro?: string;
};
