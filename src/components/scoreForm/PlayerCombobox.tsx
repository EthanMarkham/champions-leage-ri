// components/PlayerCombobox.tsx
"use client";

import { Button, Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { useCallback, useState, useEffect, Dispatch, SetStateAction, Fragment } from "react";
import { getUsers, UserSearchModel } from "@/lib/users";
import { debounce } from "@/lib/util";

interface PlayerComboboxProps {
  selectedPeople: UserSearchModel[];
  setSelectedPeople: Dispatch<SetStateAction<UserSearchModel[]>>;
}

const searchFunction = async (name?: string): Promise<UserSearchModel[]> => {
  return await getUsers({ name, limit: 10, orderByField: "name" });
};

const PlayerCombobox: React.FC<PlayerComboboxProps> = ({ selectedPeople, setSelectedPeople }) => {
  const [query, setQuery] = useState("");
  const [filteredPeople, setFilteredPeople] = useState<UserSearchModel[]>([]);
  const removePerson = (id: number) => {
    setSelectedPeople((prev) => prev.filter((person) => person.id !== id));
  };

  const fetchItems = async (query: string) => {
    try {
      const result = await searchFunction(query);
      const filteredResult = result.filter(
        (item) => !selectedPeople.some((selectedPerson) => selectedPerson.id === item.id)
      );
      setFilteredPeople(filteredResult);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const debouncedFetchItems = useCallback(debounce(fetchItems, 100), [selectedPeople]);

  useEffect(() => {
    debouncedFetchItems(query);
  }, [query, debouncedFetchItems]);

  return (
    <Combobox
      as="div"
      value={selectedPeople}
      onChange={setSelectedPeople}
      multiple
      name="players"
      onClose={() => setQuery("")}
      className="relative"
    >
      <ComboboxInput
        aria-label="Add Players"
        className={twMerge(
          "w-full rounded-lg border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-sm text-gray-900",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500"
        )}
        value={query}
        displayValue={(person: UserSearchModel) => person?.name}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2.5 top-2.5" />
      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredPeople.length === 0 && (
            <div className="cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
          )}
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                }`
              }
              onClick={() => setQuery("")}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>{person.name}</span>
                  {selected && (
                    <span className="absolute flex inset-y-0 left-0 items-center pl-3 text-indigo-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Transition>
      <Transition
        as="div"
        enter="transition ease-in-out duration-300 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        show={selectedPeople.length > 0}
      >
        <div className="flex flex-wrap gap-4 w-full max-w-full py-4">
          {selectedPeople.map((person) => (
            <div
              key={person.id}
              className={twMerge(
                "flex items-center justify-between p-2",
                "bg-gray-100 border shadow-sm border-gray-200 rounded-md",
                "hover:shadow-lg transition-all duration-300 ease-in-out"
              )}
            >
              <span className="text-xs md:text-sm">{person.name}</span>
              <Button
                className="bg-red-500/70 hover:bg-red-500 rounded-full -translate-y-2 translate-x-1 hover:shadow-sm"
                onClick={() => removePerson(person.id)}
              >
                <span className="sr-only">Remove Player</span>
                <XMarkIcon className="w-3 h-3 text-white" />
              </Button>
            </div>
          ))}
        </div>
      </Transition>
    </Combobox>
  );
};

export default PlayerCombobox;
