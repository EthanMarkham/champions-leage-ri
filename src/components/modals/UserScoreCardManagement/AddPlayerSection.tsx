"use client";

import React, { useState, useCallback } from "react";

import { useError } from "@/hooks";

import Input from "@/components/ui/Input";
import { useAddPlayer } from "@/hooks/useAddPlayer";

interface AddPlayerSectionProps {
  toggleSection: () => void;
  setPlayerList: React.Dispatch<React.SetStateAction<Map<number, any>>>;
  selectedScoreSheet: number;
  setSelectedScoreSheet: React.Dispatch<React.SetStateAction<number | null>>;
}

const AddPlayerSection: React.FC<AddPlayerSectionProps> = ({
  toggleSection,
  selectedScoreSheet,
  setPlayerList,
  setSelectedScoreSheet,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useError();
  const [emailError, setEmailError] = useError();
  const mutation = useAddPlayer();

  const handleAddAction = useCallback(async () => {
    if (!name) {
      setNameError("Name is required");
    }
    const playerData = await mutation.mutateAsync({ name, email });
    setPlayerList((cur) => {
      const newPlayerList = new Map(cur);
      newPlayerList.set(selectedScoreSheet, parseInt(playerData.id));
      return newPlayerList;
    });
    setSelectedScoreSheet(null);
  }, [name, email, setPlayerList, setSelectedScoreSheet, selectedScoreSheet]);

  return (
    <>
      <h3 className="font-bold text-lg">Add New Player!</h3>
      <div className="flex flex-col gap-4 p-2">
        <Input
          type="text"
          label="Name:"
          placeholder="First Last"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          container="w-full"
        />
        <Input
          type="email"
          label="Email:"
          placeholder="Optional@example.com"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          container="w-full"
        />
      </div>
      <div className="action-row">
        <button type="button" className="btn btn-outline grow" onClick={toggleSection}>
          Go Back
        </button>
        <button type="button" className="btn btn-primary grow" onClick={handleAddAction}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default AddPlayerSection;
