import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Player {
  id: number;
  playerName: string;
}

interface MissingPlayersWarningProps {
  missingPlayers: Player[];
}

const MissingPlayersWarning: React.FC<MissingPlayersWarningProps> = ({ missingPlayers }) => {
  return (
    <div className="bg-warning/10 border-l-4 border-warning p-4 rounded-md shadow-md text-neutral">
      <div className="flex items-center gap-1">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon className="h-8 w-8 text-warning" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Missing Players</h3>
        </div>
      </div>
      <div className="mt-2">
        <p>Some players are missing. Do you want to proceed?</p>
        <p className="mt-1">The following players will not be added:</p>
        <ul className="list-disc list-inside mt-2">
          {missingPlayers.map((player) => (
            <li className="ml-8" key={`missing${player.id}`}>{player.playerName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MissingPlayersWarning;
