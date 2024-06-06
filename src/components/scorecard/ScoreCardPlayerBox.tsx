"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { getTotalStrokes } from "@/lib/scorecard";
import { MouseEventHandler, createRef } from "react";

interface ScoreSheet {
  id: number;
  playerName: string;
  scores: { score: number }[];
}

interface ScoreCardPlayerBoxProps {
  scoreSheet: ScoreSheet;
}

const ScoreCardPlayerBox: React.FC<ScoreCardPlayerBoxProps> = ({ scoreSheet }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = function (event) {
    event.preventDefault();
    (document.getElementById("userScoreCardManagementModal") as any)?.showModal();
    document.getElementById("scoreAdd_" + scoreSheet.playerName)?.setAttribute("value", "butts");

    console.log(ref.current?.value);
  };
  const ref = createRef<HTMLInputElement>();
  return (
    <div className="indicator mb-8" key={scoreSheet.id}>
      <input id={"scoreAdd_" + scoreSheet.playerName} ref={ref} type="hidden" />

      <span className="indicator-item indicator-bottom indicator-start translate-x-[1px]">
        <button
          className="btn btn-primary btn-outline btn-xs p-0.5 h-fit rounded-full"
          data-player={scoreSheet.playerName}
          onClick={handleClick}
        >
          <PlusIcon className="w-4 h-4 pointer-events-none select-none !cursor-pointer" />
          <span className="sr-only">Confirm Player</span>
        </button>
      </span>
      <div className="text-right" key={`${scoreSheet.id}_${scoreSheet.playerName}`}>
        <div className="stat-desc">Udisc: {scoreSheet.playerName}</div>
        <div className="stat-value">{getTotalStrokes(scoreSheet.scores)}</div>
      </div>
    </div>
  );
};

export default ScoreCardPlayerBox;
