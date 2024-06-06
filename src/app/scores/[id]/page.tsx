import { UserScoreCardManagement } from "@/components/modals";
import ScoreCardPlayerBox from "@/components/scorecard/ScoreCardPlayerBox";
import ScoreSpread from "@/components/scorecard/ScoreSpread";
import ScoreTable from "@/components/scorecard/ScoreTable";
import { getTotalPar } from "@/lib/holes";
import { getScoreSheetAmountOwed, getScoreSheetDetails } from "@/lib/scorecard";
import { getCurrencyFormatter } from "@/lib/util";
import React from "react";

interface Params {
  id: string;
}

function parseAndValidateId(id: string | string[] | undefined): number | null {
  if (!id || Array.isArray(id)) {
    console.error("ID should be a single string, received:", id);
    return null;
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    console.error("ID is not a valid number:", id);
    return null;
  }

  return numericId;
}

async function fetchScoreSheetGroup(id: string) {
  const numericId = parseAndValidateId(id);
  if (numericId === null) {
    return null;
  }
  const scoreSheetGroup = await getScoreSheetDetails(numericId);
  return scoreSheetGroup;
}

//export const revalidate = 3600; // revalidate the data at most every hour

export default async function ScoreCardPage({ params }: { params: Params }) {
  const scoreSheetGroup = await fetchScoreSheetGroup(params.id);
  const holes = scoreSheetGroup?.event.layout.holes;

  if (!scoreSheetGroup || !holes) {
    return <div className="alert alert-error">Oops! Score sheet not found...</div>;
  }

  const amountDue = getScoreSheetAmountOwed(scoreSheetGroup);
  const currencyFormatter = getCurrencyFormatter();

  return (
    <section className="flex flex-col space-y-6 p-6 !pt-10 w-full max-w-[1000px] mx-auto">
      <form className="flex gap-4 lg:gap-10 flex-wrap">
        {scoreSheetGroup.scoreSheets.map((scoreSheet) => (
          <ScoreCardPlayerBox key={scoreSheet.id} scoreSheet={scoreSheet} />
        ))}

        <div className="flex gap-8 justify-around md:justify-end grow">
          {amountDue > 0 && (
            <div className="indicator -translate-y-4">
              <div className="stat text-xs w-fit h-fit">
                <span className="indicator-item indicator-bottom indicator-center">
                  <button className="btn btn-success btn-xs p-1 h-fit">Add Funds</button>
                </span>
                <div className="stat-desc">Amount Due</div>
                <div className="stat-value">{currencyFormatter.format(amountDue)}</div>
              </div>
            </div>
          )}

          {!scoreSheetGroup.submitted && (
            <div className="flex justify-around items-center">
              <button className="btn btn-secondary">
                Submit<span className="hidden lg:inline">&nbsp;Round</span>
              </button>
            </div>
          )}
        </div>
      </form>

      <div className="divider"></div>

      <div className="base-300">
        <div className="text-xl font-medium my-2">Scores</div>
        <ScoreTable holes={holes} scoreSheetGroup={scoreSheetGroup} totalScore={getTotalPar(holes)} />
      </div>

      <div className="divider"></div>

      <div className="base-300">
        <div className="text-xl font-medium my-2">Spread It</div>
        {scoreSheetGroup.scoreSheets.map((scoreSheet) => (
          <div key={scoreSheet.id}>
            <span className="label p-0">{scoreSheet.playerName}</span>
            <ScoreSpread
              key={scoreSheet.id + "_spread"}
              scores={scoreSheet.scores.map(({ score }, i) => score - holes[i].par)}
            />
          </div>
        ))}
      </div>

      <UserScoreCardManagement />
    </section>
  );
}
