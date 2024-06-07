"use client";

import React, { useState, useCallback, useRef } from "react";
import { useTransition, animated } from "@react-spring/web";
import ConfirmPlayerSection from "@/components/modals/UserScoreCardManagement/ConfirmPlayerSection";
import AddPlayerSection from "@/components/modals/UserScoreCardManagement/AddPlayerSection";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { playerListAtom } from "@/atoms";

interface Errors {
  confirm?: string;
  name?: string;
  email?: string;
}

const UserScoreCardManagement: React.FC = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [, setPlayerList] = useAtom(playerListAtom);

  const transitions = useTransition(isAdd, {
    from: { opacity: 0, transform: "translateZ(-100%)" },
    enter: { opacity: 1, transform: "translateZ(0)" },
    leave: { opacity: 0, transform: "translateZ(100%)" },
    config: { tension: 100, friction: 20 },
  });

  const closeDialog = () => {
    setIsAdd(false);
    setErrors({});
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const dialog = document.getElementById("userScoreCardManagementModal");
      const inputs = dialog?.querySelectorAll("input");

      setErrors({});

      if (!inputs) {
        setErrorHandler({ confirm: "Unknown error occurred" });
        return;
      }

      if (isAdd) {
        handleAddAction(inputs);
      } else {
        handleConfirmAction(inputs);
      }
    },
    [isAdd]
  );

  const setErrorHandler = (newErrors: Errors) => {
    setErrors(newErrors);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setErrors({});
    }, 2000); // Clear errors after 2 seconds
  };

  const handleAddAction = (inputs: NodeListOf<HTMLInputElement>) => {
    inputs.forEach((input) => {
      console.log({ name: input.getAttribute("name"), value: input.value });
    });
  };

  const handleConfirmAction = (inputs: NodeListOf<HTMLInputElement>) => {
    const input = inputs[0];

    if (!input) {
      return;
    }

    const dataId = input.getAttribute("data-id");

    if (!dataId) {
      setErrorHandler({ confirm: "Please select a player" });
      return;
    }

    const dialog = document.getElementById("userScoreCardManagementModal") as HTMLDialogElement;
    if (dialog) {
      const event = new CustomEvent("confirmAction", {
        detail: {
          name: input.getAttribute("name"),
          value: input.value,
          dataId,
        },
      });
      dialog.close();
      dialog.dispatchEvent(event);
    }
  };

  return (
    <dialog id="userScoreCardManagementModal" className="modal" onClose={closeDialog}>
      <div className="modal-box overflow-visible relative shadow-xl">
        <form method="dialog" className="absolute top-1 right-1">
          <button className="btn btn-primary btn-ghost btn-sm">
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
                <AddPlayerSection errors={{ name: errors.name, email: errors.email }} />
              </animated.div>
            ) : (
              <animated.div
                style={style}
                className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center backface-hidden"
              >
                <ConfirmPlayerSection error={errors.confirm} />
              </animated.div>
            )
          )}
        </div>
        <div className="modal-action flex w-full">
          <button className="btn btn-secondary btn-outline grow" onClick={() => setIsAdd((cur) => !cur)}>
            {isAdd ? "Cancel" : "Add New"}
          </button>
          <button className="btn btn-primary grow" onClick={handleSubmit}>
            {isAdd ? "Add" : "Confirm"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UserScoreCardManagement;
