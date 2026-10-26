# Phone Tidy

Casual puzzle game: clean up a messy phone, one character at a time.
Expo SDK 58 / React Native / TypeScript.

## Run it

```
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS). If your phone
and PC aren't on the same Wi-Fi, use `npx expo start --tunnel`.

## Layout

```
src/app/         routes (expo-router), thin wrappers around screens
src/screens/     screen components
src/components/  shared UI
src/levels/      level_XXX.json + loader
src/mechanics/   one module per puzzle mechanic
src/state/       zustand store, persisted to AsyncStorage
src/services/    haptics, audio, ads, analytics
assets/          all art, fonts and sounds
```

## Scripts

- `npm run typecheck` – TypeScript check
