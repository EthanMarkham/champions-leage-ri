import ScoreExpander from "@/components/scorecard/ScoreExpander";

import { dateToMonthYearDisplay } from "@/lib/date";
import { getEventById } from "@/lib/event";
import { getUserScoresByEventId } from "@/lib/scorecard";
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
      <div className="text-sm breadcrumbs w-full">
        <ul>
          <li>
            <Link href={"/events"}>Events</Link>
          </li>
          <li>
            {event
              ? `${event.layout.course.name} - ${event.layout.name} - ${dateToMonthYearDisplay(event.time)}`
              : "Event not found"}
          </li>
        </ul>
      </div>

      <div className="flex flex-col w-full gap-4">
        {scoreSheets.length > 0 ? (
          scoreSheets.map(({ user, scoreSheets, average, best }) => (
            <div key={user.id + "_scores"} className="relative card">
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
                  <ScoreExpander scoreSheet={scoreSheet} key={scoreSheet.id} holes={event!.layout.holes} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No scores available</p>
        )}
      </div>
    </>
  );
}
