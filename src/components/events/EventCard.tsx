import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDetailedEventList } from "@/lib/event";
import { dateToMonthYearDisplay } from "@/lib/date";

type EventDetailsType = Awaited<ReturnType<typeof getDetailedEventList>>[0];

const EventDetail: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex justify-between text-sm py-1">
    <span className="font-light text-gray-600">{label}</span>
    <span className="font-medium text-gray-800">{value || "-"}</span>
  </div>
);

const EventCard: React.FC<EventDetailsType> = (event) => {
  return (
    <div
      key={event.id}
      className="flex border border-gray-300 rounded-lg bg-white shadow-lg p-6 space-x-6 hover:shadow-xl transition-shadow duration-300 items-center text-gray-800"
    >
      <Image
        src={event.layout.course.image}
        alt={event.layout.course.name}
        width={50}
        height={50}
        className="rounded-full aspect-square object-cover w-40 h-40"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-3">{`${event.layout.course.name} - ${event.layout.name}`}</h2>
        <div className="space-y-1">
          <EventDetail label="When:" value={dateToMonthYearDisplay(event.time)} />
          <EventDetail label="Total Rounds Played:" value={event.totalScoreSheets.toString()} />
          <EventDetail label="Hot Round:" value={`${event.bestScore} by ${event.bestScoreUsername}`} />
          <EventDetail label="Average Score:" value={event.averageScore + ""} />
        </div>
        <Link href={`/events/${event.id}`} passHref>
          <span className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">View Event</span>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
