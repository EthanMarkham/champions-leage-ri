"use client";

import { UserScoreCardManagement } from "@/components/modals";
import ScoreCardPlayerBox from "@/components/scorecard/ScoreCardPlayerBox";
import ScoreTable from "@/components/scorecard/ScoreTable";
import { getTotalPar } from "@/lib/holes";
import { getScoreSheetAmountOwed, getScoreSheetDetails } from "@/lib/scorecard";
import { getCurrencyFormatter } from "@/lib/util";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAtom } from "jotai";
import { playerListAtom } from "@/atoms";

const queryClient = new QueryClient();

interface ScoreCardPageProps {
  scoreSheetGroup: Awaited<ReturnType<typeof getScoreSheetDetails>>;
}

export default function ScoreCardPage({ scoreSheetGroup }: ScoreCardPageProps) {
  const [playerList, setPlayerList] = useAtom(playerListAtom);

  const holes = scoreSheetGroup?.event.layout.holes;
  if (!holes) {
    return <div className="alert alert-error">Oops! Score sheet not found...</div>;
  }

  const amountDue = getScoreSheetAmountOwed(scoreSheetGroup);
  const currencyFormatter = getCurrencyFormatter();

  const handleConfirm = (scoreSheetId: number, dataId: number) => {
    setPlayerList((cur) => {
      const newMap = new Map(cur);
      newMap.set(scoreSheetId, dataId);
      return newMap;
    });
  };

  const handleRemove = (scoreSheetId: number) => {
    setPlayerList((cur) => {
      const newMap = new Map(cur);
      newMap.delete(scoreSheetId);
      return newMap;
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-col space-y-6 p-2 md:p-4 lg:p-6 w-full max-w-[1200px] mx-auto">
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
            <ScoreCardPlayerBox
              key={scoreSheet.id}
              scoreSheet={scoreSheet}
              holes={holes}
              submitted={Boolean(playerList.get(scoreSheet.id))}
              onConfirm={(dataId) => handleConfirm(scoreSheet.id, dataId)}
              onRemove={() => handleRemove(scoreSheet.id)}
            />
          ))}
        </form>

        <div>
          <h3 className="text-xl font-medium my-2">Scores</h3>
          <ScoreTable holes={holes} scoreSheetGroup={scoreSheetGroup} totalScore={getTotalPar(holes)} />
        </div>

        <UserScoreCardManagement />
      </section>
    </QueryClientProvider>
  );
}
