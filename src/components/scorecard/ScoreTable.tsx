import type { ScoreSheetGroupDetails } from "@/types";
import { getScoreColor } from "@/utils/scoreUtils";
import { Hole } from "@prisma/client";
import React from "react";

type GroupDetails = Exclude<ScoreSheetGroupDetails, null>;

interface ScoreTableProps {
  holes: Hole[];
  scoreSheetGroup: GroupDetails;
  totalScore: number;
}

const ScoreTable: React.FC<ScoreTableProps> = ({ holes, scoreSheetGroup, totalScore }) => {
  return (
    <div className="overflow-x-auto border shadow border-base-300 rounded-lg">
      <table className="table table-xs lg:table-md table-pin-rows table-pin-cols bg-base-300 border-base-100 shadow-lg">
        <thead>
          <tr>
            <th>Hole</th>
            {holes.map(({ hole, id }) => (
              <td key={id} className="text-center">
                {hole}
              </td>
            ))}
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {scoreSheetGroup.scoreSheets.map(({ playerName, scores, total, id }: any) => (
            <tr key={id}>
              <th>{playerName}</th>
              {scores.map((score: any, i: number) => (
                <td
                  className="text-center"
                  style={{ backgroundColor: getScoreColor(score.score, holes[i].par) }}
                  key={score.id}
                >
                  {score.score}
                </td>
              ))}
              <td>
                {total}&nbsp;({total - totalScore})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
