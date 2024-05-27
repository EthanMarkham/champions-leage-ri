import { Transition } from "@headlessui/react";
import SpinnerPage, { SpinnerPageProps } from "@/components/ui/SpinnerPage";
import { twMerge } from "tailwind-merge";

interface SpinnerCoverProps extends SpinnerPageProps {
  show: boolean;
}
const SpinnerCover = ({ show, spinnerProps, className }: SpinnerCoverProps) => {
  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <SpinnerPage
        className={twMerge("z-10 absolute top-0 left-0 w-full h-full pointer-events-none", className)}
        spinnerProps={{
          ...spinnerProps,
          className: twMerge("border-white border-t-transparent border-4", spinnerProps?.className),
        }}
      />
    </Transition>
  );
};

export default SpinnerCover;
