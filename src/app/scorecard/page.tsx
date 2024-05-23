import Select from "@/components/inputs/Select";
import { getCourses } from "@/lib/courses";
import { isCurrentMonthYear } from "@/lib/date";
import { getAllEvents } from "@/lib/event";
import { getScoresByEventId } from "@/lib/scorecard";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Scores() {
  const events = await getAllEvents();
  const currentEvent = events.find((e) => isCurrentMonthYear(e.time));
  events.forEach((e) => {
    console.log(e.time, isCurrentMonthYear(e.time));
  });
  const scores = currentEvent ? await getScoresByEventId(currentEvent.id) : [];

  console.log({ events, scores, currentEvent });
  console.log(isCurrentMonthYear(new Date("2024-05-01T00:00:00.000Z"))); // Correct usage

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Select
        label={"Select an Event"}
        selectProps={{ id: "eventSelector", defaultValue: currentEvent ? currentEvent.id : undefined }}
        options={events.map((e) => ({ value: e.id, label: e.layout.name }))}
      />
      <div className="flex flex-col w-full"></div>
    </main>
  );
}
