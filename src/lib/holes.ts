import { Hole } from "@prisma/client";

export function getTotalPar(holes: Hole[]) {
  return holes.reduce((prev, cur) => prev + cur.par, 0);
}
