import { getScoreColorHex, getScoreColorClass } from "@/lib/score";
import { getUserScoresByEventId } from "@/lib/scorecard";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Hole } from "@prisma/client";
import { twMerge } from "tailwind-merge";

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
          className="z-20 flex flex-wrap overflow-hidden justify-start max-w-[90vw] w-fit gap-1"
          anchor={{ to: "bottom start", gap: "4px" }}
        >
          {scoreSheet.scores.map((score, i) => (
            <div className="text-center text-white [&>p]:p-x2 w-12 bg-gray-800 rounded-lg overflow-hidden">
              <p className="text-lg pt-2 font-bold">{holes[i].hole}</p>
              <p className="text-xs font-light pb-1">{holes[i].distance}</p>
              <p className="py-2" style={{ backgroundColor: getScoreColorHex(score, holes[i]) }}>
                {score.score}
              </p>
            </div>
          ))}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
