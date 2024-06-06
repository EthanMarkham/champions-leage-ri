import { dateStarted, dateToMonthYearDisplay, isCurrentMonthYear } from "@/lib/date";
import { getDetailedEventList } from "@/lib/event";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Events() {
  const events = (await getDetailedEventList())
    .sort((a, b) => (a.time < b.time ? -1 : 1))
    .map((e) => ({
      ...e,
      started: dateStarted(e.time),
      current: isCurrentMonthYear(e.time),
      completed: dateStarted(e.time) && !isCurrentMonthYear(e.time),
    }));

  return (
    <section className="flex w-full justify-center items-center h-full overflow-auto relative">
      <input className="input absolute top-0 right-0" type="date" />
      <ul className="timeline timeline-snap-icon timeline-vertical translate-x-[-40%] md:translate-x-0">
        {events.map((event, i) => (
          <li key={event.id}>
            <div className="timeline-middle">
              {event.started ? (
                <CheckCircleIcon className="w-5 h-5 text-primary" />
              ) : (
                <ClockIcon className="w-5 h-5 text-base-300" />
              )}
            </div>

            <div
              className={twMerge(
                "mb-10 timeline-box min-w-[180px] tracking-tight",
                i % 2 === 0 ? "timeline-end md:text-end" : "timeline-end lg:timeline-start"
              )}
            >
              <time className="font-mono italic">{dateToMonthYearDisplay(event.time)}</time>
              <div className="text-lg font-black">{event.layout.course.name}</div>
              <div className="flex justify-between">
                <span className="text-md font-light ">{event.layout.name}</span>
                {event.started && (
                  <Link href={`/events/${event.id}`} className="link">
                    <ArrowTopRightOnSquareIcon className="w-5 h-6" />
                  </Link>
                )}
              </div>
              {event.completed && <div className="badge badge-neutral">Completed</div>}
              {event.current && <div className="badge badge-secondary">In-Progress</div>}
            </div>

            {event.completed ? <hr className="bg-primary" /> : <hr className="" />}
          </li>
        ))}
      </ul>
    </section>
  );
}
