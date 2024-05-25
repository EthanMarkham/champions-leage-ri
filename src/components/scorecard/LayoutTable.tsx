import { getCourses } from "@/lib/courses";
import { getTotalDistance, getTotalPar } from "@/lib/holes";
import { TabGroup, TabList, Tab, TabPanel, TabPanels } from "@headlessui/react";

type LayoutProps = Awaited<ReturnType<typeof getCourses>>[number]["layouts"];

interface LayoutTableProps {
  layouts: LayoutProps;
}

const LayoutTable = (props: LayoutTableProps) => {
  return (
    <div className="overflow-x-auto">
      <TabGroup>
        <TabList className="flex gap-4">
          {props.layouts.map(({ name, id }) => (
            <Tab
              key={id}
              className="rounded-full py-1 px-3 text-sm font-semibold text-gray-600 focus:outline-none hover:bg-gray-200 selected:bg-gray-300 selected:text-black"
            >
              {name}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-3">
          {props.layouts.map(({ name, id, holes }) => (
            <TabPanel key={name} className="rounded-xl bg-gray-100 p-3">
              <table className="min-w-full table-auto border-collapse">
                <tbody>
                  <tr className="bg-gray-300 text-black">
                    {Array.from({ length: holes.length }, (_, i) => (
                      <td key={i + 1} className="p-3 border border-gray-400">
                        <span className="block">{i + 1}</span>
                        <span className="block text-xs font-light">{holes[i].distance}</span>
                      </td>
                    ))}
                    <th className="p-3 border border-gray-400">{getTotalDistance(holes)}</th>
                  </tr>
                </tbody>
              </table>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default LayoutTable;
