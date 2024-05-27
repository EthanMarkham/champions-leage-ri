
import Link from "next/link";
import { NavigationItem } from "@/components/nav/NavBar";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

const DesktopLinks: React.FC<{ links: NavigationItem[] }> = ({ links }) => {
  return (
    <div className="hidden md:flex md:items-center grow">
      <div className="hidden sm:ml-6 sm:flex items-center">
        <div className="flex space-x-4">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={twMerge(
                item.current ? "underline underline-offset-4 text-white" : "text-gray-300 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopLinks;
