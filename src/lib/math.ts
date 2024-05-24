export function roundTo(num: number, decimals: number): number {
  const rounder = Math.pow(10, decimals);
  return Math.round(num * rounder) / rounder;
}
