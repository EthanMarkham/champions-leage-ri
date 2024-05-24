import Select from "@/components/inputs/Select";
import { getCourses } from "@/lib/courses";
import { isCurrentMonthYear } from "@/lib/date";
import { getAllEvents } from "@/lib/event";
import { getScoresByEventId } from "@/lib/scorecard";

export const revalidate = 3600; // revalidate the data at most every hour

const normalizeScores = (scores: Awaited<ReturnType<typeof getScoresByEventId>>) =>
  scores
    .flatMap((s) => s.scoreSheets)
    .map((s) => ({ ...s, total: s.scores.reduce((prev, cur) => prev + cur.score, 0) }));

export default async function Scores() {
  const events = await getAllEvents();
  const currentEvent = events.find((e) => isCurrentMonthYear(e.time)) || events[0];
  const scoreSheets = currentEvent ? await getScoresByEventId(currentEvent.id) : [];
  const scores = scoreSheets ? normalizeScores(scoreSheets) : [];

  return (
    <main className="flex gap-4 min-h-screen flex-col items-center p-24">
      <Select
        label={"Select an Event"}
        selectProps={{ id: "eventSelector", defaultValue: currentEvent ? currentEvent.id : undefined }}
        options={events.map((e) => ({ value: e.id, label: e.layout.course.name + " - " + e.layout.name }))}
      />
      <div className="flex flex-col w-full gap-2">
        {scores.map(({ playerName, total, userId }) => (
          <div
            key={userId}
            className="p-2 bg-gray-500 items-center flex flex-row gap-2 rounded-lg border-gray-200 border-2"
          >
            <span className="block">{playerName}</span>
            <span className="block">{total}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
