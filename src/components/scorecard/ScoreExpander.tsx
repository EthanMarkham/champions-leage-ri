import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { getScoreColor } from "@/utils";
import { Hole } from "@prisma/client";

import Card from "@/components/ui/Card";

import type { ScoreSheetDetails } from "@/types";

interface ScoreExpanderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  scoreSheet: ScoreSheetDetails;
  holes: Hole[];
}

export default function ScoreExpander({ scoreSheet, holes, className, children, ...props }: ScoreExpanderProps) {
  return (
    <div className="dropdown dropdown-hover">
      {children ? (
        <div tabIndex={0} className="w-full">
          {children}
        </div>
      ) : (
        <label
          tabIndex={0}
          className={twMerge(
            "w-10 h-10 flex items-center justify-center rounded-lg",
            "font-semibold text-sm text-primary cursor-pointer",
            "bg-primary/20 border border-primary/50",
            "hover:border-blue-500 focus:outline-none"
          )}
        >
          {scoreSheet.total}
        </label>
      )}

      <Card
        tabIndex={0}
        className={twMerge(
          "z-20 dropdown-content backdrop-blur-sm shadow-lg rounded-lg w-[80vw]",
          "bg-primary/80 card-bordered border-primary",
          "[&>.card-body]:p-2"
        )}
      >
        <div className="grid grid-cols-6 md:grid-cols-9 gap-[1px]">
          {scoreSheet.scores.map((score, i) => (
            <div key={score.id} className="flex flex-col items-center text-center text-white p-2">
              <p className="text-lg font-bold">{holes[i].hole}</p>
              <p className="text-xs font-light">{holes[i].distance}</p>
              <p
                className="py-1 my-1 w-full rounded-md"
                style={{ backgroundColor: getScoreColor(score.score, holes[i].par) }}
              >
                {score.score}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
