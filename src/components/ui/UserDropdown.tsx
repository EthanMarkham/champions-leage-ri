import React from "react";
import { animated } from "@react-spring/web";
import { twMerge } from "tailwind-merge";

interface User {
  id: number;
  name: string;
}

interface UserDropdownProps {
  users: User[];
  query: string;
  isOpen: boolean;
  animationProps: any;
  onUserClick: (user: User) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, query, isOpen, animationProps, onUserClick }) => {
  return (
    <>
      {isOpen && (
        <animated.div
          style={animationProps}
          className={twMerge(
            "absolute left-0 right-0 mt-1 rounded-md shadow-lg ring-1 overflow-y-auto z-10",
            "ring-black ring-opacity-5 focus:outline-none",
            "text-base sm:text-sm bg-white"
          )}
          onMouseDown={(e) => e.preventDefault()}
        >
          {users.length === 0 && query.length > 1 ? (
            <div className="cursor-default select-none relative py-2 px-4 text-neutral-500">
              No results found.
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className={twMerge(
                  "cursor-default select-none relative py-2 px-4",
                  query === user.name ? "text-white bg-primary" : "text-neutral-700"
                )}
                onClick={() => onUserClick(user)}
              >
                <span className={query === user.name ? "font-medium" : "font-normal"}>
                  {user.name}
                </span>
              </div>
            ))
          )}
        </animated.div>
      )}
    </>
  );
};

export default UserDropdown;
