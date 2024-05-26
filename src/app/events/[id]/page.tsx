import Select from "@/components/inputs/Select";
import Card from "@/components/ui/Card";
import { getUserScoresByEventId } from "@/lib/scorecard";

export const revalidate = 3600; // revalidate the data at most every hour

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const scoreSheets = await getUserScoresByEventId(parseInt(params.id));

  return (
    <section className="flex gap-4 flex-col items-center">
      <div className="flex flex-col w-full max-w-xl gap-4">
        {scoreSheets.map(({ user, scoreSheets, average, best }) => (
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
            <div className="border-t flex gap-2 p-2 w-full">
              {scoreSheets.map((scoreSheet, index) => (
                <div
                  key={index}
                  className="p-1 w-12 h-12 text-center bg-gray-300 leading-9 font-bold rounded-full border border-gray-800"
                >
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
