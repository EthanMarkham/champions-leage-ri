import { useState, useMemo } from "react";
import { getTotalPayments } from "@/utils";
import { useError } from "@/hooks";
import type { ScoreSheetGroupDetails } from "@/types";

interface UseScoreCardPageState {
  playerList: Map<number, any>;
  setPlayerList: React.Dispatch<React.SetStateAction<Map<number, any>>>;
  selectedScoreSheet: number | null;
  setSelectedScoreSheet: React.Dispatch<React.SetStateAction<number | null>>;
  error: any;
  setError: (error: any) => void;
  amountDue: number;
}

const useScoreCardPageState = (scoreSheetGroup: ScoreSheetGroupDetails): UseScoreCardPageState => {
  const [playerList, setPlayerList] = useState<Map<number, any>>(() => new Map());
  const [selectedScoreSheet, setSelectedScoreSheet] = useState<number | null>(null);
  const [error, setError] = useError();

  const amountDue = useMemo(() => {
    const payments = getTotalPayments(scoreSheetGroup);
    const playerCount = playerList.size;
    return 5.0 * playerCount - payments;
  }, [playerList, scoreSheetGroup]);

  return {
    playerList,
    setPlayerList,
    selectedScoreSheet,
    setSelectedScoreSheet,
    error,
    setError,
    amountDue,
  };
};

export default useScoreCardPageState;
