import Card from "@/components/ui/Card";
import { getCourses } from "@/lib/courses";
import Image from "next/image";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Courses() {
  const courses = await getCourses();

  return (
    <section className="flex flex-col items-center justify-between p-4">
      <div className="flex flex-col w-full gap-4">
        {courses.map((c) => (
          <Card key={c.id} className="flex flex-col sm:flex-row items-center sm:gap-4 p-4">
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
              <p className="text-gray-500">
                {c.layouts.length} layout{c.layouts.length !== 1 && "s"}
              </p>
              <p className="text-gray-500">{`${c.street}, ${c.city}, ${c.state} ${c.zipCode}`}</p>
              <p className="text-gray-500">{c.note}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
