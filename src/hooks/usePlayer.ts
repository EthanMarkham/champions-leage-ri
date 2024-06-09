// src\hooks\usePlayer.ts

import { useMemo, useCallback } from "react";

interface ScoreSheet {
  id: number;
  playerName: string;
  scores: { score: number }[];
}

type PlayerList = Map<number, any>;
type SetPlayerList = React.Dispatch<React.SetStateAction<Map<number, any>>>;
type SetSelectedScoreSheet = React.Dispatch<React.SetStateAction<number | null>>;

export const usePlayer = (
  scoreSheet: ScoreSheet,
  playerList: PlayerList,
  setPlayerList: SetPlayerList,
  setSelectedScoreSheet: SetSelectedScoreSheet
) => {
  const playerAdded = useMemo(() => typeof playerList.get(scoreSheet.id) !== "undefined", [playerList, scoreSheet.id]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (playerAdded) {
        setPlayerList((cur) => {
          const newList = new Map(cur);
          newList.delete(scoreSheet.id);
          return newList;
        });
      } else {
        setSelectedScoreSheet(scoreSheet.id);
      }
    },
    [setSelectedScoreSheet, scoreSheet.id, playerAdded, setPlayerList]
  );

  return { playerAdded, handleClick };
};
