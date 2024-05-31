"use client";

import React, { useState } from "react";
import { getTotalPar } from "@/lib/holes";
import { getScoreColorClass } from "@/lib/score";
import { getScoreSheetDetails, getTotalStrokes } from "@/lib/scorecard";
import { Hole } from "@prisma/client";
import PlayerCombobox from "./PlayerComboBox";

type ScoreSheetGroup = Awaited<ReturnType<typeof getScoreSheetDetails>>;

interface ScoreTableProps {
  scoreSheets: Exclude<ScoreSheetGroup, null>["scoreSheets"];
  holes: Hole[];
}

const ScoreSheetBuilder: React.FC<ScoreTableProps> = ({ scoreSheets, holes }) => {
  const totalScore = getTotalPar(holes);

  return (
    <div className="space-y-4">
      {scoreSheets?.map(({ playerName, id, scores }, index) => (
        <div
          key={id}
          className={`p-4 rounded-lg ${index % 2 === 0 ? "bg-gray-700 text-white" : "bg-gray-600 text-white"}`}
        >
          <div className="flex items-center justify-between mb-2 gap-4">
            <div className="flex-1 max-w-[280px] items-center space-y-2">
              <div className="text-xs text-gray-400">UDisc: {playerName}</div>
              <PlayerCombobox  setSelected={(people) => console.log(people)} />
            </div>
            <div className="text-center">
              <div className="text-sm font-light">Score:</div>
              <div className="font-bold">{getTotalStrokes(scores) - totalScore}</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            {scores.map((score, holeIndex) => (
              <div key={holeIndex} className={`w-12 p-2 rounded ${getScoreColorClass(score, holes[holeIndex])}`}>
                <div className="text-xs text-center text-gray-400">{holeIndex + 1}</div>
                <div className="text-center">{score.score}</div>
              </div>
            ))}
            <div className="flex-1">
              <div className="w-24 p-2 rounded bg-gray-800 justify-end ml-auto">
                <div className="text-center font-bold">{getTotalStrokes(scores)}</div>
                <div className="text-xs text-center text-gray-400">Total</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScoreSheetBuilder;
