"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon, PlusIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState, Fragment } from "react";
import { getUsers, UserSearchModel } from "@/lib/users";
import AddPlayerModal from "../modals/AddPlayerModal";
import { twMerge } from "tailwind-merge";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect"; // Adjust the import path according to your project structure

interface PlayerComboboxProps {
  selected?: UserSearchModel | null;
  setSelected: (value: UserSearchModel | null) => void;
}

const searchFunction = async (name?: string): Promise<UserSearchModel[]> => {
  try {
    return await getUsers({ name, limit: 10, orderByField: "name" });
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const PlayerCombobox: React.FC<PlayerComboboxProps> = ({ selected, setSelected }) => {
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState<UserSearchModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useDebouncedEffect(
    () => {
      const fetchPlayers = async () => {
        const result = await searchFunction(query);
        setPlayers(result);
      };
      fetchPlayers();
    },
    [query],
    300
  );

  const handleSelect = (value: UserSearchModel | null) => {
    setQuery(value?.name || "");
    setSelected(value);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        <Combobox value={selected} onChange={handleSelect}>
          <div className="relative w-full">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg border border-gray-300 bg-white text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
              <ComboboxInput
                className="w-full border-none py-2 pr-10 pl-3 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                displayValue={(person: UserSearchModel) => person?.name || ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </ComboboxButton>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {players.map((player) => (
                  <ComboboxOption
                    key={player.id}
                    value={player}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                          {player.name}
                        </span>
                        {selected && (
                          <span className={"absolute inset-y-0 left-0 flex items-center pl-3"}>
                            <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">Add Player</span>
        </button>
      </div>
      <AddPlayerModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} addPlayer={setSelected} />
    </>
  );
};

export default PlayerCombobox;
