import React, { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface SpinnerPageProps extends HTMLAttributes<HTMLDivElement> {
  spinnerProps?: HTMLAttributes<HTMLDivElement>;
}

const SpinnerPage = forwardRef<HTMLDivElement, SpinnerPageProps>(({ spinnerProps, ...props }, ref) => {
  return (
    <div {...props} className={twMerge("flex items-center justify-center", props.className)} ref={ref}>
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div
          {...spinnerProps}
          className={twMerge(
            "border-t-transparent border-solid animate-spin rounded-full border-slate-400 border-2 h-12 w-12",
            spinnerProps && spinnerProps.className
          )}
        ></div>
      </div>
    </div>
  );
});

SpinnerPage.displayName = 'SpinnerPage';

export default SpinnerPage;
