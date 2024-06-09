import { getTotalDistance, getTotalPar } from "@/utils";
import type { LayoutDetails } from "@/types";

interface LayoutTableProps {
  layouts: LayoutDetails;
}

const LayoutTable = (props: LayoutTableProps) => {
  return (
    <div className="overflow-x-auto">
      <div className="tabs tabs-boxed">
        {props.layouts.map(({ name, id }, index) => (
          <a
            key={id}
            className={`tab tab-lifted ${index === 0 ? "tab-active" : ""}`}
            data-toggle="tab"
            href={`#tab-${id}`}
          >
            {name}
          </a>
        ))}
      </div>
      <div className="tab-content">
        {props.layouts.map(({ name, id, holes }) => (
          <div key={name} id={`tab-${id}`} className="tab-pane p-3 bg-gray-100 rounded-xl">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutTable;
