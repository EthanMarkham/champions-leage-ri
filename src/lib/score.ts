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
