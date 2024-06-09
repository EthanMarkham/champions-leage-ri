import { getRelativeScoreColor } from "@/utils/scoreUtils";
import React from "react";

interface ScoreSpreadProps {
  scores: number[];
}

const ScoreSpread: React.FC<ScoreSpreadProps> = ({ scores }) => {
  const scoreCounts: { [key: number]: number } = scores.reduce((acc, score) => {
    acc[score] = (acc[score] || 0) + 1;
    return acc;
  }, {} as any);

  const totalScores = scores.length;
  const scoreEntries = Object.entries(scoreCounts).sort((a, b) => Number(a[0]) - Number(b[0]));

  return (
    <div className="flex w-full rounded-lg border-base-300 shadow-sm border overflow-hidden">
      {scoreEntries.map(([score, count]) => {
        const percentage = ((count / totalScores) * 100).toFixed(2);
        return (
          <div
            key={score + "_" + count}
            title={`${score}: ${percentage}%`}
            className="h-8 flex items-center justify-center text-md font-bold"
            style={{
              flex: `0 0 ${percentage}%`,
              backgroundColor: getRelativeScoreColor(parseInt(score)),
            }}
          >
            {count}
          </div>
        );
      })}
    </div>
  );
};

export default ScoreSpread;
