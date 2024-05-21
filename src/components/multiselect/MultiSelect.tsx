import React, { useState, useEffect, useCallback } from "react";
import { ArrowDown, CloseIcon } from "../svg";

interface MultiselectProps<T> {
  searchFunction: (query: string) => Promise<T[]>;
  getItemLabel: (item: T) => string;
  getItemId: (item: T) => number;
  onSelectionChange: (selectedItems: T[]) => void;
  placeHolderText?: string;
  containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export type MultiSelectExtensionProp<T> = Pick<
  MultiselectProps<T>,
  "onSelectionChange" | "containerProps" | "placeHolderText"
>;

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const Multiselect = <T,>({
  searchFunction,
  getItemLabel,
  getItemId,
  onSelectionChange,
  containerProps,
  placeHolderText,
}: MultiselectProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<T[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems, onSelectionChange]);

  const fetchItems = async (query: string) => {
    try {
      const result = await searchFunction(query);
      const filteredResult = result.filter(
        (item) => !selectedItems.some((selectedItem) => getItemId(selectedItem) === getItemId(item))
      );
      setItems(filteredResult.slice(0, 4));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const debouncedFetchItems = useCallback(debounce(fetchItems, 200), [selectedItems]);

  useEffect(() => {
    if (query) {
      debouncedFetchItems(query);
    } else {
      setItems([]);
    }
  }, [query, debouncedFetchItems]);

  const handleSelect = (item: T) => {
    setSelectedItems([...selectedItems, item]);
    setShowDropdown(false);
    setQuery("");
  };

  const handleRemove = (item: T) => {
    setSelectedItems(selectedItems.filter((i) => getItemId(i) !== getItemId(item)));
  };

  const handleSearchClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (showDropdown) {
      setShowDropdown(false);
    } else {
      debouncedFetchItems(query);
      setShowDropdown(true);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center mx-auto" {...containerProps}>
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-2 flex border border-gray-300 bg-white rounded-lg shadow-sm">
              <input
                placeholder={placeHolderText || "Search..."}
                className="flex-1 w-full p-2 outline-none text-gray-800"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
              />
              <button className="flex items-center justify-center w-8 h-8 text-gray-600" onClick={handleSearchClick}>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          {showDropdown && items.length > 0 && (
            <div className="absolute top-full mt-0.5 bg-white z-40 w-full rounded-lg shadow-lg max-h-48 overflow-y-auto border border-gray-300">
              <div className="flex flex-col w-full">
                {items.map((item) => (
                  <div
                    key={getItemId(item)}
                    className="cursor-pointer px-4 py-2 hover:bg-teal-100"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="w-full text-gray-900">{getItemLabel(item)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-2 w-full">
          {selectedItems.map((item) => (
            <div
              key={getItemId(item)}
              className="flex items-center space-x-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full border border-teal-300"
            >
              <div className="text-xs">{getItemLabel(item)}</div>
              <div onClick={() => handleRemove(item)} className="cursor-pointer">
                <CloseIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
