export function getTotalPar(holes: {par: number}[]) {
  return holes.reduce((prev, cur) => prev + cur.par, 0);
}

export function getTotalDistance(holes: {distance: number}[]) {
  return holes.reduce((prev, cur) => prev + cur.distance, 0);
}
