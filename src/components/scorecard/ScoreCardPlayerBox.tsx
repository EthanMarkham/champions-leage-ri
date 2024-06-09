"use client";

import React from "react";

import { twMerge } from "tailwind-merge";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";

import { calculateScore } from "@/utils";
import { usePlayer } from "@/hooks";

import ScoreSpread from "@/components/scorecard/ScoreSpread";


interface ScoreSheet {
  id: number;
  playerName: string;
  scores: { score: number }[];
}

interface ScoreCardPlayerBoxProps {
  scoreSheet: ScoreSheet;
  holes: { par: number }[];
  playerList: Map<number, any>;
  setPlayerList: React.Dispatch<React.SetStateAction<Map<number, any>>>;
  setSelectedScoreSheet: React.Dispatch<React.SetStateAction<number | null>>;
  isSelected: boolean;
}

const ScoreCardPlayerBox: React.FC<ScoreCardPlayerBoxProps> = ({
  scoreSheet,
  holes,
  playerList,
  setPlayerList,
  setSelectedScoreSheet,
  isSelected,
}) => {
  const { playerAdded, handleClick } = usePlayer(scoreSheet, playerList, setPlayerList, setSelectedScoreSheet);
  const score = calculateScore(holes, scoreSheet.scores);

  return (
    <div
      className={twMerge(
        "indicator p-4 border rounded-lg bg-base-200 shadow-lg flex flex-col items-start space-y-4 w-full max-w-[450px]",
        isSelected && "shadow-primary shadow-2xl"
      )}
      key={scoreSheet.id}
    >
      <span className="indicator-item indicator-top indicator-end translate-x-[1px] translate-y-[-10px]">
        <button
          className={twMerge("btn btn-sm rounded-full", playerList.get(scoreSheet.id) ? "btn-error" : "btn-secondary")}
          data-player={scoreSheet.playerName}
          onClick={handleClick}
        >
          {!playerAdded ? (
            <>
              <PlusIcon className="w-4 h-4 pointer-events-none" />
              <span className="">Add</span>
            </>
          ) : (
            <>
              <MinusIcon className="w-4 h-4 pointer-events-none" />
              <span className="">Remove</span>
            </>
          )}
        </button>
      </span>

      <div
        className={twMerge(
          "card flex flex-row gap-4 items-center lg:space-y-0 lg:space-x-6",
          "[&>.score-stat]:text-sm [&>.score-stat>span:first-child]:text-gray-600 [&>.score-stat>span:first-child]:mr-2 [&>.score-stat>span:last-child]:font-bold"
        )}
        key={`${scoreSheet.id}_${scoreSheet.playerName}`}
      >
        <div className="font-semibold text-lg">{scoreSheet.playerName}</div>
        <div className="score-stat">
          <span>Score:</span>
          <span>{score}</span>
        </div>
      </div>
      <ScoreSpread
        key={scoreSheet.id + "_spread"}
        scores={scoreSheet.scores.map(({ score }, i) => score - holes[i].par)}
      />
    </div>
  );
};

export default ScoreCardPlayerBox;
