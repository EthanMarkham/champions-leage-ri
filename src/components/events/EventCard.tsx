import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDetailedEventList } from "@/lib/event";
import { dateToMonthYearDisplay } from "@/lib/date";
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
  return (
    <Card key={event.id} className="flex gap-4 p-4 max-w-3xl">
      <Image
        src={event.layout.course.image}
        alt={event.layout.course.name}
        width={160}
        height={160}
        className="rounded-full object-cover aspect-square"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-2xl font-bold mb-4">{`${event.layout.course.name} - ${event.layout.name}`}</h2>
        <div className="space-y-1.5">
          <EventDetail label="When:" value={dateToMonthYearDisplay(event.time)} />
          <EventDetail label="Total Rounds Played:" value={event.totalScoreSheets.toString()} />
          <EventDetail label="Hot Round:" value={`${event.bestScore} by ${event.bestScoreUsername}`} />
          <EventDetail label="Average Score:" value={event.averageScore ? event.averageScore.toString() : "---"} />
        </div>
        <Link href={`/events/${event.id}`} passHref>
          <Button className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">View Event</Button>
        </Link>
      </div>
    </Card>
  );
};

export default EventCard;
