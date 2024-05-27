// components/PlayerCombobox.tsx
"use client";

import { Button, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { ChevronDownIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { useCallback, useState, useEffect, Dispatch, SetStateAction, Fragment } from "react";
import { getUsers, UserSearchModel } from "@/lib/users";
import { debounce } from "@/lib/util";
import AddPlayerModal from "../modals/AddPlayerModal";

interface PlayerComboboxProps {
  selectedPeople: UserSearchModel[];
  setSelectedPeople: Dispatch<SetStateAction<UserSearchModel[]>>;
}

const searchFunction = async (name?: string): Promise<UserSearchModel[]> => {
  return await getUsers({ name, limit: 10, orderByField: "name" });
};

const PlayerCombobox: React.FC<PlayerComboboxProps> = ({ selectedPeople, setSelectedPeople }) => {
  const [query, setQuery] = useState("");
  const [people, setPeople] = useState<UserSearchModel[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchItems = async (query: string) => {
    try {
      const result = await searchFunction(query);
      setPeople(result);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const debouncedFetchItems = useCallback(debounce(fetchItems, 100), [selectedPeople]);

  useEffect(() => {
    debouncedFetchItems(query);
  }, [query, debouncedFetchItems]);

  const addPlayer = (player: { id: number; name: string }) => {
    setSelectedPeople((prevSelected) => [...prevSelected, player]);
  };

  return (
    <>
      <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
        <div className="relative">
          <ListboxButton
            className={twMerge(
              "w-full min-h-[2.5rem] rounded-lg border border-gray-300 bg-white py-1.5 pr-8 pl-3 text-sm text-gray-900",
              "focus:outline-none focus:ring-2 focus:ring-indigo-200 relative flex items-center"
            )}
          >
            <span className="block truncate">
              {selectedPeople.length > 0 ? selectedPeople.map((person) => person.name).join(", ") : "Select people"}
            </span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400 absolute right-2.5" />
            <Button
              className="absolute right-8 flex items-center text-gray-400 hover:text-gray-500"
              onClick={() => setIsModalOpen(true)}
              type="button"
              as="div"
            >
              <PlusIcon className="h-5 w-5" />
            </Button>
          </ListboxButton>
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="duration-300 ease-out"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              {people.map((person) => (
                <ListboxOption
                  key={person.id}
                  value={person}
                  className={({ active }) =>
                    twMerge(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}>
                        {person.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      <AddPlayerModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} addPlayer={addPlayer} />
    </>
  );
};

export default PlayerCombobox;
