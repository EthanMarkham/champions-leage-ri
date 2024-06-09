"use client";

import React, { useState } from "react";

import { useTransition, animated } from "@react-spring/web";
import { PlusCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

import ConfirmPlayerSection from "@/components/modals/UserScoreCardManagement/ConfirmPlayerSection";
import AddPlayerSection from "@/components/modals/UserScoreCardManagement/AddPlayerSection";

interface UserScoreCardManagementProps {
  playerList: Map<number, any>;
  setPlayerList: React.Dispatch<React.SetStateAction<Map<number, any>>>;
  selectedScoreSheet: number;
  setSelectedScoreSheet: React.Dispatch<React.SetStateAction<number | null>>;
}

const UserScoreCardManagement: React.FC<UserScoreCardManagementProps> = ({
  playerList,
  setPlayerList,
  selectedScoreSheet,
  setSelectedScoreSheet,
}) => {
  const [isAdd, setIsAdd] = useState(false);
  const transitions = useTransition(isAdd, {
    from: { opacity: 0, transform: "translateZ(-100%)" },
    enter: { opacity: 1, transform: "translateZ(0)" },
    leave: { opacity: 0, transform: "translateZ(100%)" },
    config: { tension: 100, friction: 20 },
  });

  return (
    <dialog className="modal" open={true}>
      <div className="modal-box overflow-visible relative shadow-xl">
        <div className="flex justify-end gap-1 -mt-2">
          <button className="btn btn-primary btn-ghost btn-sm" onClick={() => setSelectedScoreSheet(null)}>
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div
          className={twMerge(
            "w-full relative h-[220px] perspective-[1000px]",
            "[&>div>.action-row]:mt-4 [&>div>.action-row]:flex [&>div>.action-row]:w-full [&>div>.action-row]:gap-1"
          )}
        >
          {transitions((style, item) =>
            item ? (
              <animated.div
                style={style}
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center backface-hidden"
              >
                <AddPlayerSection
                  toggleSection={() => setIsAdd(false)}
                  setPlayerList={setPlayerList}
                  selectedScoreSheet={selectedScoreSheet}
                  setSelectedScoreSheet={setSelectedScoreSheet}
                />
              </animated.div>
            ) : (
              <animated.div
                style={style}
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center backface-hidden"
              >
                <ConfirmPlayerSection
                  playerList={playerList}
                  setPlayerList={setPlayerList}
                  selectedScoreSheet={selectedScoreSheet}
                  setSelectedScoreSheet={setSelectedScoreSheet}
                  toggleSection={() => setIsAdd(true)}
                />
              </animated.div>
            )
          )}
        </div>
        <div className="modal-action flex w-full"></div>
      </div>
    </dialog>
  );
};

export default UserScoreCardManagement;
