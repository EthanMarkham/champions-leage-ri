import { getUserScoresByEventId } from "@/lib/scorecard";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import ScoreTable from "./ScoreTable";
import { Hole } from "@prisma/client";

type ScoreDetails = Awaited<ReturnType<typeof getUserScoresByEventId>>[number]["scoreSheets"][number];

interface ScoreExpanderProps extends ScoreDetails {
  holes: Hole[];
}

export default function ScoreExpander({ total, id, holes, ...scoreSheet }: ScoreExpanderProps) {
  return (
    <Popover>
      <PopoverButton className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-800 rounded-lg border border-blue-300 hover:border-blue-500 text-sm cursor-pointer font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-white">
        {total}
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="bottom start"
          className="divide-y divide-white/5 rounded-xl bg-black/45 text-sm/6 [--anchor-gap:var(--spacing-5)]  z-20"
        >
          <ScoreTable showName={false} showPos={false} scoreSheets={[{ ...scoreSheet, id: id }]} holes={holes} />
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
