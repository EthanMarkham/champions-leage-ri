"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSpring } from "@react-spring/web";
import useUserSearch, { UserSearchRecord } from "@/hooks/useUserSearch";
import UserDropdown from "@/components/ui/UserDropdown";

interface ConfirmPlayerSectionProps {
  error?: string;
}

const ConfirmPlayerSection: React.FC<ConfirmPlayerSectionProps> = ({ error }) => {
  const { users, query, handleQueryChange, isLoading, inputRef } = useUserSearch();
  const [isOpen, setIsOpen] = useState(false);

  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    maxHeight: isOpen ? 200 : 0,
    overflow: "hidden",
    config: { tension: 250, friction: 20 },
  });

  const handleUserClick = (user: UserSearchRecord) => {
    handleQueryChange({ target: { value: user.name } } as React.ChangeEvent<HTMLInputElement>);
    if (inputRef.current) {
      inputRef.current.setAttribute("data-id", user.id.toString());
    }
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (!e.currentTarget?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleQueryChange(event);
    const newValue = event.target.value;

    if (inputRef.current) {
      const matchedUser = users.find((u) => u.name.toLowerCase() === newValue.toLowerCase());
      if (matchedUser) {
        inputRef.current.setAttribute("data-id", matchedUser.id.toString());
        handleQueryChange({ target: { value: matchedUser.name } } as React.ChangeEvent<HTMLInputElement>); // Correct the capitalization
      } else {
        inputRef.current.removeAttribute("data-id");
      }
    }

    setIsOpen(newValue.length > 0 && !isLoading);
  };

  return (
    <>
      <h3 className="font-bold text-lg">Confirm the Player</h3>
      <form id="addPlayerForm" className="w-full mt-4">
        <div className="w-full text-left rounded-lg shadow-md cursor-default sm:text-sm relative" onBlur={handleBlur}>
          <input
            name="confirmPlayer"
            ref={inputRef}
            className={`w-full input input-bordered ${
              error ? "input-error" : ""
            } focus:outline-none py-2 pl-3 pr-10 text-lg leading-5`}
            value={query}
            onChange={handleInputChange}
            onFocus={() => !isLoading && setIsOpen(true)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <UserDropdown
            users={users}
            query={query}
            isOpen={isOpen}
            animationProps={animationProps}
            onUserClick={handleUserClick}
          />
        </div>
      </form>
    </>
  );
};

export default ConfirmPlayerSection;
