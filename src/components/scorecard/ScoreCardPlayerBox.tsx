"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { getTotalStrokes } from "@/lib/scorecard";
import { MouseEventHandler, createRef } from "react";
import { getTotalPar } from "@/lib/holes";
import { twMerge } from "tailwind-merge";
import ScoreSpread from "./ScoreSpread";

interface ScoreSheet {
  id: number;
  playerName: string;
  scores: { score: number }[];
}

interface ScoreCardPlayerBoxProps {
  scoreSheet: ScoreSheet;
  holes: { par: number }[];
  submitted: boolean;
}

const ScoreCardPlayerBox: React.FC<ScoreCardPlayerBoxProps> = ({ scoreSheet, holes, submitted }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    (document.getElementById("userScoreCardManagementModal") as any)?.showModal();
    document.getElementById(`scoreAdd_${scoreSheet.playerName}`)?.setAttribute("value", "butts");
  };

  const totalPar = getTotalPar(holes);
  const totalStrokes = getTotalStrokes(scoreSheet.scores);
  const score = totalStrokes - totalPar;

  const ref = createRef<HTMLInputElement>();

  return (
    <div
      className="indicator p-4 border rounded-lg bg-base-200 shadow-lg flex flex-col items-start space-y-4 w-full max-w-[450px]"
      key={scoreSheet.id}
    >
      <input id={`scoreAdd_${scoreSheet.playerName}`} ref={ref} type="hidden" />
      <span className="indicator-item indicator-top indicator-end translate-x-[1px] translate-y-[-30px]">
        <button
          className="btn btn-secondary btn-sm rounded-full"
          data-player={scoreSheet.playerName}
          onClick={handleClick}
        >
          <PlusIcon className="w-4 h-4 pointer-events-none" />
          <span className="">Add</span>
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
        <div className="score-stat">
          <span>Strokes:</span>
          <span>{totalStrokes}</span>
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
