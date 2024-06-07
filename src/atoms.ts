// atoms.ts
import { atom } from "jotai";

export const playerListAtom = atom<Map<number, number>>(new Map());

export const dialogOpenAtom = atom(false);
