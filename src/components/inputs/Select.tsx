import React from "react";
import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
interface Option {
  value: string | number;
  label: string;
  selected?: boolean;
}

interface SelectComponentProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  options: Option[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({ label, options, description, ...selectProps }) => {
  return (
    <div className="w-full max-w-md px-4">
      <Field>
        {label && <Label className="text-sm/6 font-medium text-white"> {label}</Label>}
        {description && <Description className="text-sm/6 text-white/50">{description}</Description>}
        <div className="relative">
          <Select
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            {...selectProps}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value} selected={option.selected}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  );
};

/*<div>
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
      
    </div>}*/

export default SelectComponent;
