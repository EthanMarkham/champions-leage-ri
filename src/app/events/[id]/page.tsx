import ScoreExpander from "@/components/scorecard/ScoreExpander";
import Card from "@/components/ui/Card";
import PageWrapper from "@/components/ui/PageWrapper";
import { dateToMonthYearDisplay } from "@/lib/date";
import { getEventById } from "@/lib/event";
import { getUserScoresByEventId } from "@/lib/scorecard";
import { Button } from "@headlessui/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const revalidate = 3600; // Revalidate the data at most every hour

type PageProps = Readonly<{
  params: { id: string };
}>;

export default async function Page({ params }: PageProps) {
  const eventId = parseInt(params.id);
  const event = await getEventById(eventId);
  const scoreSheets = await getUserScoresByEventId(eventId);

  return (
    <>
      <div className="w-full flex justify-start items-center overflow-hidden bg-gray-800/40 px-6 py-2.5 sm:px-3.5">
        <Link href="/events">
          <Button className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <ArrowUturnLeftIcon className="h-5 w-5 text-gray-900" />
          </Button>
        </Link>
        <h1 className="grow text-center font-bold text-black/50 tracking-widest text-sm sm:text-base">
          {event
            ? `${event.layout.course.name} - ${event.layout.name} - ${dateToMonthYearDisplay(event.time)}`
            : "Event not found"}
        </h1>
      </div>

      <PageWrapper className="flex gap-4 flex-col items-center">
        <div className="flex flex-col w-full gap-4">
          {scoreSheets.length > 0 ? (
            scoreSheets.map(({ user, scoreSheets, average, best }) => (
              <Card key={user.id} className="p-4 shadow-md rounded-lg relative overflow-visible">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <span className="text-lg font-semibold text-center md:text-left">{user.name}</span>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm mt-2 sm:mt-0">
                    <div className="font-semibold">
                      Best: <span className="font-normal">{best}</span>
                    </div>
                    <div className="font-semibold">
                      Average: <span className="font-normal">{average}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-2 flex gap-2 flex-wrap justify-start">
                  {scoreSheets.map((scoreSheet) => (
                    <ScoreExpander key={scoreSheet.id} {...scoreSheet} holes={event!.layout.holes} />
                  ))}
                </div>
              </Card>
            ))
          ) : (
            <p className="text-center">No scores available</p>
          )}
        </div>
      </PageWrapper>
    </>
  );
}
