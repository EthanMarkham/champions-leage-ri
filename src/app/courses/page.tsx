import Card from "@/components/ui/Card";
import { getCourses } from "@/lib/courses";
import Image from "next/image";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Courses() {
  const courses = await getCourses();

  return (
    <section className="flex flex-col items-center justify-between">
      <div className="flex flex-col w-full gap-4">
        {courses.map((c) => (
          <Card key={c.id}>
            <Image src={c.image} alt="?" width={100} height={100} className="aspect-square rounded-full inline-block" />
            <div key={c.id} className="inline-flex items-center divide-x-2 divide-gray-300 ml-4 [&>text]:px-2">
              <text className="text-lg font-bold">{c.name}</text>
              <text>{c.layouts.length} layouts</text>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
