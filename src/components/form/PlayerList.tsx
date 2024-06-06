"use client";

import { useState } from "react";
import AssignPlayerModal from "../modals/AssignPlayerModal";

interface User {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  // Add more users
];

const players: Player[] = [
  { id: 1, name: "Player 1" },
  { id: 2, name: "Player 2" },
  // Add more players
];

const PlayerList: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Assign Players to Users</h1>
      <ul className="space-y-2">
        {players.map((player) => (
          <li key={player.id} className="flex justify-between items-center p-2 border rounded">
            <span>{player.name}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => openModal(player)}>
              Assign
            </button>
          </li>
        ))}
      </ul>
      {selectedPlayer && (
        <AssignPlayerModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          player={selectedPlayer}
        />
      )}
    </div>
  );
};

export default PlayerList;
