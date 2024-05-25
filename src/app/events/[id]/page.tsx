import Select from "@/components/inputs/Select";
import Card from "@/components/ui/Card";
import { getAllEvents } from "@/lib/event";
import { getUserScoresByEventId } from "@/lib/scorecard";

export const revalidate = 3600; // revalidate the data at most every hour

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const events = await getAllEvents();
  const scoreSheets = await getUserScoresByEventId(parseInt(params.id));
  console.log(scoreSheets);

  return (
    <section className="flex gap-4 flex-col items-center">
      <div className="w-full max-w-xl">
        {/*<Select
          id="eventSelector"
          defaultValue={params.id}
          options={events.map((e) => ({
            value: e.id,
            label: `${e.layout.course.name} - ${e.layout.name}`,
          }))}
          className="mb-4"
        /> */}
      </div>

      <div className="flex flex-col w-full max-w-xl gap-4">
        {Object.values(scoreSheets).map(({ user, scoreSheets, average, best }) => (
          <Card key={user.id} className="p-4 shadow-md">
            <div className="flex flex-row items-center justify-between mb-2">
              <span className="text-lg font-semibold">{user.name}</span>
              <div className="text-sm">
                <label className="font-semibold">Best:</label>&nbsp;{best}
              </div>
              <div className="text-sm">
                <label className="font-semibold">Average:</label>&nbsp;{average}
              </div>
            </div>
            <div className="border-t flex gap-2 p-2">
              {scoreSheets.map((scoreSheet, index) => (
                <div key={index} className="p-2 rounded-full border bg-gray-800 text-white">
                  {scoreSheet.total}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
