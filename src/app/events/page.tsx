import EventCard from "@/components/events/EventCard";
import PageWrapper from "@/components/ui/PageWrapper";
import { dateToMonthYearDisplay } from "@/lib/date";
import { getDetailedEventList } from "@/lib/event";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Events() {
  const events = await getDetailedEventList();
  events.sort((a, b) => (a.time < b.time ? -1 : 1));
  return (
    <PageWrapper className="flex flex-col items-center justify-between gap-8">
      <section className="flex flex-col w-full items-center gap-8">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </section>
    </PageWrapper>
  );
}
