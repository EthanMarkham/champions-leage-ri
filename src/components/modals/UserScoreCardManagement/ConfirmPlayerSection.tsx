"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useSpring, animated } from "@react-spring/web";
import { twMerge } from "tailwind-merge";

var debounce = require("lodash.debounce");

interface User {
  id: number;
  name: string;
}

interface ConfirmPlayerSectionProps {}

const ConfirmPlayerSection: React.FC<ConfirmPlayerSectionProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [previousQuery, setPreviousQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchUsers = async (query: string) => {
    if (query !== previousQuery) {
      if (query.length >= 1) {
        setIsLoading(true);
        const response = await fetch(`/api/users?name=${query}`);
        const userData = await response.json();
        setUsers(userData);
        setPreviousQuery(query);
        setIsLoading(false);

        const matchedUser = userData.find((u: User) => u.name === query);
        if (matchedUser && inputRef.current) {
          inputRef.current.setAttribute("data-id", matchedUser.id.toString());
        } else if (inputRef.current) {
          inputRef.current.removeAttribute("data-id");
        }
        if (!matchedUser) {
          setIsOpen(true);
        }
      } else {
        setIsOpen(false);
        setUsers([]);
      }
    }
  };

  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 300), [previousQuery]);

  useEffect(() => {
    debouncedFetchUsers(query);
    return () => {
      debouncedFetchUsers.cancel();
    };
  }, [query, debouncedFetchUsers]);

  const animationProps = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scaleY(1)" : "scaleY(0)",
    transformOrigin: "top",
    maxHeight: isOpen ? 200 : 0,
    overflow: "hidden",
    config: { tension: 250, friction: 20 },
  });

  const handleUserClick = (user: User) => {
    if (inputRef.current) {
      inputRef.current.value = user.name;
      inputRef.current.setAttribute("data-id", user.id.toString());
    }
    setQuery(user.name);
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (!e.currentTarget?.contains(document.activeElement)) {
        setIsOpen(false);
      }
    }, 0);
  };

  return (
    <>
      <h3 className="font-bold text-lg">Confirm the Player!</h3>
      <form id="addPlayerForm" className="w-full mt-1">
        <div className="w-full text-left rounded-lg shadow-md cursor-default sm:text-sm relative" onBlur={handleBlur}>
          <input
            ref={inputRef}
            className="w-full input input-bordered focus:outline-none py-2 pl-3 pr-10 text-lg leading-5"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          {isOpen && (
            <animated.div
              style={animationProps}
              className={twMerge(
                "absolute left-0 right-0 rounded-md shadow-lg ring-1 overflow-y-auto z-10",
                "ring-black ring-opacity-5 focus:outline-none",
                "text-base sm:text-sm bg-white/70 backdrop-blur"
              )}
              onMouseDown={(e) => e.preventDefault()}
            >
              {isLoading ? (
                <div className="cursor-default select-none relative py-2 px-4">Loading...</div>
              ) : users.length === 0 && query.length > 1 ? (
                <div className="cursor-default select-none relative py-2 px-4">No results found.</div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className={`cursor-default select-none relative py-2 px-4 ${
                      inputRef.current?.value === user.name ? "text-base-300 bg-primary" : "text-neutral"
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                    <span
                      className={`${
                        inputRef.current?.value === user.name ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {user.name}
                    </span>
                  </div>
                ))
              )}
            </animated.div>
          )}
        </div>
      </form>
    </>
  );
};

export default ConfirmPlayerSection;
