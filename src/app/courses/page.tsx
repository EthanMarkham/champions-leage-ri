import LayoutTable from "@/components/scorecard/LayoutTable";
import Card from "@/components/ui/Card";
import { getCourses } from "@/lib/courses";
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from "@headlessui/react";
import Image from "next/image";

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Courses() {
  const courses = await getCourses();

  return (
    <section className="flex flex-col items-center justify-between p-4">
      <div className="flex flex-col w-full gap-4">
        {courses.map((c) => (
          <Disclosure key={c.id}>
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row items-center sm:gap-4 relative">
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
                <DisclosureButton className="text-sm font-semibold text-black/50 focus:outline-none hover:text-black absolute top-2 right-2">
                  View layout{c.layouts.length !== 1 && "s"}
                </DisclosureButton>
              </div>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <DisclosurePanel className="w-full">
                  <LayoutTable layouts={c.layouts} />
                </DisclosurePanel>
              </Transition>
            </Card>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
