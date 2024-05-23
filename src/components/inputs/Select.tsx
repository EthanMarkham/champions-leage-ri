import React from "react";

interface Option {
  value: string | number;
  label: string;
  selected?: boolean;
}

interface SelectComponentProps {
  label: string;
  selectProps: React.SelectHTMLAttributes<HTMLSelectElement>;
  options: Option[];
  additionalAttributes?: React.HTMLAttributes<HTMLSelectElement>;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  selectProps,
  options,
  additionalAttributes = {},
}) => {
  return (
    <div>
      <label htmlFor={selectProps.id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        {label}
      </label>
      <select
        {...selectProps}
        {...additionalAttributes}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} selected={option.selected}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
