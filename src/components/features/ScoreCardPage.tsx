"use client";

import React, { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { getTotalPar, getCurrencyFormatter } from "@/utils";
import { useScoreCardPageState, useSubmitScoreCard } from "@/hooks";
import ScoreCardPlayerBox from "@/components/scorecard/ScoreCardPlayerBox";
import ScoreTable from "@/components/scorecard/ScoreTable";
import MissingPlayersWarning from "@/components/scorecard/MissingPlayers";
import UserScoreCardManagement from "@/components/modals/UserScoreCardManagement/UserScoreCardManagement";
import Alert from "@/components/ui/Alert";
import { useAlert } from "@/contexts/AlertContext";
import { useConfirmation } from "@/contexts/ConfirmationContext";
import type { ScoreSheetGroupDetails } from "@/types";
import SpinnerPage from "../ui/SpinnerPage";
import { useRouter } from "next/navigation";

interface ScoreCardPageProps {
  scoreSheetGroup: NonNullable<ScoreSheetGroupDetails>;
}

export default function ScoreCardPage({ scoreSheetGroup }: ScoreCardPageProps) {
  const { playerList, setPlayerList, selectedScoreSheet, setSelectedScoreSheet, amountDue } =
    useScoreCardPageState(scoreSheetGroup);
  const { submit, submissionResult } = useSubmitScoreCard("/api/scorecard");
  const { setAlert } = useAlert();
  const { confirm } = useConfirmation();
  const holes = scoreSheetGroup.event.layout.holes;
  const router = useRouter();
  
  const handleSubmitEvent = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (playerList.size < 2) {
        setAlert("At least two users must be submitted", "warning");
        return;
      }
      if (playerList.size !== scoreSheetGroup.scoreSheets.length) {
        const missingPlayers = scoreSheetGroup.scoreSheets.filter((s) => !playerList.has(s.id));
        const isConfirmed = await confirm(<MissingPlayersWarning missingPlayers={missingPlayers} />);
        if (!isConfirmed) {
          return;
        }
      }
      await submit({
        playerMap: Object.fromEntries(playerList),
        scoreSheetGroupId: scoreSheetGroup.id,
      });
    },
    [playerList, scoreSheetGroup.id]
  );

  useEffect(() => {
    if (!submissionResult.data) {
      return
    }
    if (submissionResult.data.error) {
      setAlert(submissionResult.data.error);
    }
    if (submissionResult.data.redirect) {
      router.push(`/${submissionResult.data.redirect}`);

    }
    console.log(submissionResult.data);
  }, [submissionResult.data]);

  return (
    <section className="flex flex-col space-y-6 p-2 md:p-4 lg:p-6 w-full overflow-x-hidden max-w-[1200px] mx-auto relative">
      {submissionResult.isLoading && (
        <SpinnerPage className="absolute left-0 right-0 top-0 bottom-0 z-[43000] bg-black/70 backdrop-blur text-white" />
      )}
      <Alert className="absolute z-50 top-2 left-2 max-w-max" />

      {!scoreSheetGroup.submitted && (
        <>
          <div className="flex flex-wrap gap-2 justify-start lg:justify-end items-center !mt-0">
            {/*
            amountDue > 0 && (
              <div className="stat text-xs w-fit h-fit grow">
                <div className="stat-desc">Amount Due</div>
                <div className="stat-value">{currencyFormatter.format(amountDue)}</div>
              </div>
            )
              */}

            {!scoreSheetGroup.submitted && (
              <div className="flex gap-2">
                {/*amountDue > 0 && <button className="btn btn-success">Add Funds</button>*/}
                <button className="btn btn-secondary" onClick={handleSubmitEvent}>
                  Submit Round
                </button>
              </div>
            )}
          </div>

          <div className={twMerge("flex flex-row flex-wrap justify-center lg:justify-start gap-8")}>
            {scoreSheetGroup.scoreSheets.map((scoreSheet) => (
              <ScoreCardPlayerBox
                key={scoreSheet.id}
                scoreSheet={scoreSheet}
                holes={holes}
                playerList={playerList}
                setPlayerList={setPlayerList}
                setSelectedScoreSheet={setSelectedScoreSheet}
                isSelected={selectedScoreSheet === scoreSheet.id}
              />
            ))}
          </div>
        </>
      )}

      <div>
        <h3 className="text-xl font-medium my-2">Scores</h3>
        <ScoreTable holes={holes} scoreSheetGroup={scoreSheetGroup} totalScore={getTotalPar(holes)} />
      </div>

      {selectedScoreSheet && (
        <UserScoreCardManagement
          playerList={playerList}
          setPlayerList={setPlayerList}
          selectedScoreSheet={selectedScoreSheet}
          setSelectedScoreSheet={setSelectedScoreSheet}
        />
      )}
    </section>
  );
}
