// src\utils\scoreUtils.ts

import { add, multiply, subtract } from "mathjs";
import type { HoleWithPar, HoleWithDistance, ScoreWithScore, ScoreSheetGroupDetails } from "@/types";

export function getTotalPar(holes: HoleWithPar[]) {
  return holes.reduce((prev, cur) => prev + cur.par, 0);
}

export function getTotalDistance(holes: HoleWithDistance[]) {
  return holes.reduce((prev, cur) => prev + cur.distance, 0);
}

export const calculateScore = (holes: HoleWithPar[], scores: ScoreWithScore[]) => {
  const totalPar = getTotalPar(holes);
  const totalStrokes = getTotalStrokes(scores);
  return totalStrokes - totalPar;
};

export function getTotalStrokes(scores: ScoreWithScore[]) {
  return scores.reduce((prev, cur) => prev + cur.score, 0);
}

export const getScoreSheetAmountOwed = (scoreSheet: ScoreSheetGroupDetails) => {
  return subtract(getTotalCost(scoreSheet), getTotalPayments(scoreSheet));
};

export const getTotalPayments = (scoreSheet: ScoreSheetGroupDetails) => {
  return scoreSheet?.payments.reduce((acc, cur) => add(acc, cur.amount), 0) || 0;
};

export const getTotalCost = (scoreSheet: ScoreSheetGroupDetails) => {
  const numberOfRounds = scoreSheet?.scoreSheets.length || 0;
  return multiply(numberOfRounds, 5);
};

export function getScoreColor(score: number, par: number): string {
  if (score === 1) {
    return "var(--color-ace)";
  }

  const diff = score - par;

  if (diff === 0) {
    return "current";
  }

  if (diff > 0) {
    const bogeyDiff = Math.min(diff, 4);
    return `var(--color-bogey${bogeyDiff})`;
  }

  switch (diff) {
    case -1:
      return "var(--color-birdie)";
    case -2:
      return "var(--color-eagle)";
    case -3:
      return "var(--color-albatross)";
    case -4:
      return "var(--color-condor)";
    default:
      return "current";
  }
}

export function getRelativeScoreColor(score: number): string {
  if (score === 0) {
    return "2D3748";
  }

  if (score > 0) {
    const bogeyDiff = Math.min(score, 4);
    return `var(--color-bogey${bogeyDiff})`;
  }

  switch (score) {
    case -1:
      return "var(--color-birdie)";
    case -2:
      return "var(--color-eagle)";
    case -3:
      return "var(--color-albatross)";
    case -4:
      return "var(--color-condor)";
    default:
      return "current";
  }
}
