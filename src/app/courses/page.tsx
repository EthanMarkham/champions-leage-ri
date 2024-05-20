import { getCourses } from "@/utils/courses";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Courses() {
  const courses = await getCourses();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col w-full">
        {courses.map((c: any) => (
          <div>
            {c.name} - {c.layouts.length} layouts
          </div>
        ))}
      </div>
    </main>
  );
}
