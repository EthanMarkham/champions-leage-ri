import { getTotalPar } from "@/lib/holes";
import { getScoreColorClass } from "@/lib/score";
import { getScoreSheetDetails, getTotalStrokes } from "@/lib/scorecard";
import { Hole } from "@prisma/client";

type ScoreSheetGroup = Awaited<ReturnType<typeof getScoreSheetDetails>>;

interface ScoreTableProps {
  scoreSheets: Exclude<ScoreSheetGroup, null>["scoreSheets"];
  courseName: string;
  layoutName: string;
  holes: Hole[];
}

const ScoreTable = ({ scoreSheets, holes }: ScoreTableProps) => {
  const totalScore = getTotalPar(holes);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 border border-gray-700">POS</th>
            <th className="p-3 border border-gray-700">NAME</th>
            <th className="p-3 border border-gray-700">SCORE</th>
            {Array.from({ length: holes.length }, (_, i) => (
              <th key={i + 1} className="p-3 border border-gray-700">
                <span className="block">{i + 1}</span>
                <span className="block text-xs font-light">{holes[i].distance}`</span>
              </th>
            ))}
            <th className="p-3 border border-gray-700">ALL</th>
          </tr>
        </thead>
        <tbody>
          {scoreSheets?.map(({ playerName, id, scores }, index) => (
            <tr key={id} className={index % 2 === 0 ? "bg-gray-700 text-white" : "bg-gray-600 text-white"}>
              <td className="p-3 border border-gray-700">{index + 1}</td>
              <td className="p-3 border border-gray-700">{playerName}</td>
              <td className="p-3 border border-gray-700">{getTotalStrokes(scores) - totalScore}</td>
              {scores.map((score, holeIndex) => (
                <td
                  key={holeIndex}
                  className={`p-3 border border-gray-700 ${getScoreColorClass(score, holes[holeIndex])}`}
                >
                  {score.score}
                </td>
              ))}
              <td className="p-3 border border-gray-700">{getTotalStrokes(scores)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
