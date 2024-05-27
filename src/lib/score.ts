import { Score, Hole } from "@prisma/client";

export function getScoreColorClass(score: Score, hole: Hole) {
  if (score.score < hole.par) {
    return "text-green-500";
  } else if (score.score > hole.par) {
    return "text-red-500";
  } else {
    return "text-gray-300";
  }
}

export function getScoreColorHex(score: Score, hole: Hole) {
  if (score.score < hole.par) {
    return "#22c55e";
  } else if (score.score > hole.par) {
    return "#dc2626";
  } else {
    return "#374151";
  }
}