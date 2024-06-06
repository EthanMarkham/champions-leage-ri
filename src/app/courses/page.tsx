import LayoutTable from "@/components/scorecard/LayoutTable";
import { getCourses } from "@/lib/courses";
import Image from "next/image";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Courses() {
  const courses = await getCourses();

  return (
    <section className="flex flex-col items-center justify-between p-4">
      <div className="flex flex-col w-full gap-4">
        {courses.map((c) => (
          <div key={c.id} className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" className="peer" />
            <div className="collapse-title flex flex-col sm:flex-row items-center sm:gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={c.image}
                  alt={`${c.name} course image`}
                  width={100}
                  height={100}
                  className="aspect-square rounded-full"
                />
              </div>
              <div className="flex flex-col text-center sm:text-left sm:ml-4 w-full">
                <p className="text-lg font-bold">{c.name}</p>
                <p className="text-gray-500">{c.note}</p>
              </div>
              <div className="absolute top-2 right-2 text-sm font-semibold text-black/50 peer-checked:text-black">
                View layout{c.layouts.length !== 1 && "s"}
              </div>
            </div>
            <div className="collapse-content w-full">
              <LayoutTable layouts={c.layouts} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
