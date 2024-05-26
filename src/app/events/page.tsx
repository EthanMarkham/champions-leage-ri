import EventCard from "@/components/events/EventCard";
import PageWrapper from "@/components/ui/PageWrapper";
import { dateToMonthYearDisplay } from "@/lib/date";
import { getDetailedEventList } from "@/lib/event";
import Image from "next/image";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Events() {
  const events = await getDetailedEventList();
  return (
    <PageWrapper className="flex flex-col items-center justify-between">
      <section className="flex flex-col w-full  items-center">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </section>
    </PageWrapper>
  );
}
