import React, { useState, useEffect, useCallback } from "react";

export interface MultiselectProps<T> {
  searchFunction: (query: string) => Promise<T[]>;
  getItemLabel: (item: T) => string;
  getItemId: (item: T) => number;
  onSelectionChange: (selectedItems: T[]) => void;
  containerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

const debounce = (func: (...args: any) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any) => {
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
      // Filter out items that are already selected
      const filteredResult = result.filter(
        (item) => !selectedItems.some((selectedItem) => getItemId(selectedItem) === getItemId(item))
      );
      setItems(filteredResult.slice(0, 4)); // Show only top 4 results
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const debouncedFetchItems = useCallback(debounce(fetchItems, 300), [selectedItems]);

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
    setQuery(""); // Clear query to reset search
  };

  const handleRemove = (item: T) => {
    setSelectedItems(selectedItems.filter((i) => getItemId(i) !== getItemId(item)));
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center mx-auto" {...containerProps}>
      <div className="w-full px-4">
        {/* Search Box */}
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-2 flex border border-gray-300 bg-white rounded-lg shadow-sm">
              <input
                placeholder="Search..."
                className="flex-1 w-full p-2 outline-none text-gray-800"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowDropdown(true)}
              />
              <button
                className="flex items-center justify-center w-8 h-8 text-gray-600"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            </div>
          </div>
          {showDropdown && items.length > 0 && (
            <div className="absolute top-full mt-1 bg-white z-40 w-full rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-300">
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
        {/* Selected Items Container */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <div
              key={getItemId(item)}
              className="flex items-center space-x-2 px-2 py-1 bg-teal-100 text-teal-700 rounded-full border border-teal-300"
            >
              <div className="text-sm">{getItemLabel(item)}</div>
              <div onClick={() => handleRemove(item)} className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 hover:text-teal-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
