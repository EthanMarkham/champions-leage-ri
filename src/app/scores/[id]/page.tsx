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
    <section className="flex flex-col space-y-6 p-2 md:p-4 lg:p-6 w-full max-w-[1000px] mx-auto">
      <div className="flex flex-wrap gap-2 justify-between items-center">
        {amountDue > 0 && (
          <div className="stat text-xs w-fit h-fit">
            <div className="stat-desc">Amount Due</div>
            <div className="stat-value">{currencyFormatter.format(amountDue)}</div>
          </div>
        )}

        {!scoreSheetGroup.submitted && (
          <div className="flex gap-2">
            {amountDue > 0 && <button className="btn btn-success">Add Funds</button>}
            <button className="btn btn-secondary">Submit Round</button>
          </div>
        )}
      </div>

      <form className="flex flex-row flex-wrap justify-center lg:justify-start gap-8">
        {scoreSheetGroup.scoreSheets.map((scoreSheet) => (
          <ScoreCardPlayerBox key={scoreSheet.id} scoreSheet={scoreSheet} holes={holes} submitted={false} />
        ))}
      </form>

      <div className="base-300 p-4 rounded-lg">
        <div className="text-xl font-medium my-2">Scores</div>
        <ScoreTable holes={holes} scoreSheetGroup={scoreSheetGroup} totalScore={getTotalPar(holes)} />
      </div>

      <UserScoreCardManagement />
    </section>
  );
}
