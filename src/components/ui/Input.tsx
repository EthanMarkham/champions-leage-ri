"use client";

import React from "react";
import { twJoin, twMerge } from "tailwind-merge";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  error?: string | null;
  container?: string;
}

const Input: React.FC<InputProps> = ({ error, container, className, label, ...props }) => {
  const inputClasses = twMerge("input input-bordered w-full mt-1 invalid:border-danger", className);
  const labelClasses = twMerge("input input-bordered flex items-center gap-2", error && "border-danger");

  return (
    <label className={twJoin("form-control", container)}>
      {error && (
        <div className="label">
          <p className="label-text-alt text-error translate-y-2">{error}</p>
        </div>
      )}
      {label ? (
        <label className={labelClasses}>
          {label}
          <input className="grow" aria-invalid={error ? "true" : undefined} {...props} />
        </label>
      ) : (
        <input className={inputClasses} aria-invalid={error ? "true" : undefined} {...props} />
      )}
    </label>
  );
};

export default Input;
