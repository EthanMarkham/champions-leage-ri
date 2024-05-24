import Select from "@/components/inputs/Select";
import { isCurrentMonthYear } from "@/lib/date";
import { getAllEvents } from "@/lib/event";
import { getScoresByEventId } from "@/lib/scorecard";
import { usePathname } from "next/navigation";

export const revalidate = 3600; // revalidate the data at most every hour

const normalizeScores = (scores: Awaited<ReturnType<typeof getScoresByEventId>>) =>
  scores
    .flatMap((s) => s.scoreSheets)
    .map((s) => ({ ...s, total: s.scores.reduce((prev, cur) => prev + cur.score, 0) }));

interface PageProps {
  params: { id: string };
}
export default async function Page({ params }: PageProps) {
  const events = await getAllEvents();

  // const id = searchParams.get('id');
  console.log({ params });
  const scoreSheets = await getScoresByEventId(parseInt(params.id));
  const scores = scoreSheets ? normalizeScores(scoreSheets) : [];

  return (
    <section className="flex gap-4 flex-col items-center">
      <Select
        id="eventSelector"
        defaultValue={params.id}
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
    </section>
  );
}
