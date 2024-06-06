"use client";

import React, { useState } from "react";
import { useTransition, animated } from "@react-spring/web";
import ConfirmPlayerSection from "@/components/modals/UserScoreCardManagement/ConfirmPlayerSection";
import AddPlayerSection from "@/components/modals/UserScoreCardManagement/AddPlayerSection";
import { XMarkIcon } from "@heroicons/react/16/solid";

const UserScoreCardManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const transitions = useTransition(isAdd, {
    from: {
      opacity: 0,
      transform: "rotateY(90deg)",
    },
    enter: {
      opacity: 1,
      transform: "rotateY(0deg)",
    },
    leave: {
      opacity: 0,
      transform: "rotateY(-90deg)",
    },
    config: {
      tension: 80,
      friction: 20,
    },
  });

  const closeDialog = () => {
    setIsOpen(false);
    setIsAdd(false);
  };

  return (
    <dialog id="userScoreCardManagementModal" className="modal" onClick={() => setIsOpen(true)} onClose={closeDialog}>
      <div className="modal-box overflow-visible relative overflow-x-hidden">
        <form method="dialog" className="absolute top-1 right-1">
          <button className="btn btn-primary btn-ghost btn-sm" onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-4 h-4" />
          </button>
        </form>

        <div className="w-full relative h-[172px] perspective-[1000px]">
          {transitions((style, item) =>
            item ? (
              <animated.div
                style={style}
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center backface-hidden"
              >
                <AddPlayerSection />
              </animated.div>
            ) : (
              <animated.div
                style={style}
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center backface-hidden"
              >
                <ConfirmPlayerSection />
              </animated.div>
            )
          )}
        </div>
        <div className="modal-action flex w-full">
          <button className="btn btn-secondary btn-outline" onClick={() => setIsAdd((cur) => !cur)}>
            {isAdd ? "Cancel" : "Add New"}
          </button>
          <button className="btn btn-primary">Confirm</button>
        </div>
      </div>
    </dialog>
  );
};

export default UserScoreCardManagement;
