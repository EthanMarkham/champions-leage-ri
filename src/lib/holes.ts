import { Hole } from "@prisma/client";

export function getTotalPar(holes: Hole[]) {
  return holes.reduce((prev, cur) => prev + cur.par, 0);
}

export function getTotalDistance(holes: Hole[]) {
  return holes.reduce((prev, cur) => prev + cur.distance, 0);
}
