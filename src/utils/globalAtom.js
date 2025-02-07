import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage('theme', 'light');

export const authAtom = atomWithStorage('isAuthenticated', false);
