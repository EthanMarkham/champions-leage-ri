import { getScoreColorHex } from "@/lib/score";
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
      <PopoverButton className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-800 rounded-lg border border-blue-300 hover:border-blue-500 text-sm cursor-pointer font-semibold text-black/50 focus:outline-none">
        {total}
      </PopoverButton>
      <Transition
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          as="div"
          className="z-20 p-2 bg-gray-700/80 backdrop-blur-sm shadow-lg rounded-lg"
          anchor={{
            to: "bottom start",
            padding: '10px',
            gap: '5px'
          }}
        >
          <div className="grid grid-cols-5 md:grid-cols-9 gap-[1px] ">
            {scoreSheet.scores.map((score, i) => (
              <div key={score.id} className="flex flex-col items-center text-center text-white p-2">
                <p className="text-lg font-bold">{holes[i].hole}</p>
                <p className="text-xs font-light">{holes[i].distance}</p>
                <p
                  className="py-1 my-1 w-full rounded-md"
                  style={{ backgroundColor: getScoreColorHex(score, holes[i]) }}
                >
                  {score.score}
                </p>
              </div>
            ))}
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
