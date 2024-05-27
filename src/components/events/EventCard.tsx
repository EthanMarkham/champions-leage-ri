import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDetailedEventList } from "@/lib/event";
import { dateToMonthYearDisplay, dateStarted } from "@/lib/date";
import Card from "@/components/ui/Card";
import { Button } from "@headlessui/react";

type EventDetailsType = Awaited<ReturnType<typeof getDetailedEventList>>[0];

const EventDetail: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex justify-start text-sm py-0.5 gap-2">
    <span className="font-light text-gray-600">{label}</span>
    <span className="font-medium text-gray-800">{value || "-"}</span>
  </div>
);

const EventCard: React.FC<EventDetailsType> = (event) => {
  const isPast = dateStarted(event.time);
  return (
    <Card key={event.id} className="flex flex-col md:flex-row gap-6 p-6 w-full mx-auto shadow-lg rounded-lg">
      <Image
        src={event.layout.course.image}
        alt={event.layout.course.name}
        width={160}
        height={160}
        className="rounded-full object-cover aspect-square mx-auto"
      />
      <div className="flex flex-col flex-1 w-full">
        <hgroup className="mb-3 text-center">
          <h2 className="text-md md:text-xl font-bold text-center md:text-left">
            {event.layout.course.name}
            <span className="hidden sm:inline-block">{` - ${event.layout.name}`}</span>
          </h2>
          <h3 className="text-sm text-gray-400 inline sm:hidden">{event.layout.name}</h3>
        </hgroup>
        <div className="space-y-2">
          <EventDetail label="When:" value={dateToMonthYearDisplay(event.time)} />
          {isPast && (
            <>
              <EventDetail label="Total Rounds Played:" value={event.totalScoreSheets.toString()} />
              <EventDetail label="Hot Round:" value={`${event.bestScore} by ${event.bestScoreUsername}`} />
              <EventDetail label="Average Score:" value={event.averageScore ? event.averageScore.toString() : "---"} />
            </>
          )}
        </div>
      </div>
      {isPast && (
        <Link href={`/events/${event.id}`} passHref>
          <Button className="mt-4 inline-block bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-md py-2 px-4 mx-auto md:mx-0">
            View Scores
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default EventCard;
