import { Transition } from "@headlessui/react";
import SpinnerPage from "./SpinnerPage";

const SpinnerCover = ({ show }: { show: boolean }) => {
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
        className="bg-black/60 z-10 absolute top-0 left-0 w-full h-full pointer-events-none"
        spinnerProps={{ className: "border-white border-t-transparent border-4" }}
      />
    </Transition>
  );
};

export default SpinnerCover;

