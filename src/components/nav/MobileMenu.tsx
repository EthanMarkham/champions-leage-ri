import { classNames } from "@/lib/classNames";
import { DisclosureButton } from "@headlessui/react";
import { NavigationItem } from "./Navbar";
import Link from "next/link";

const MobileMenu: React.FC<{ links: NavigationItem[] }> = ({ links }) => (
  <DisclosureButton as="nav" className="sm:hidden">
    <div className="space-y-1 px-2 pb-3 pt-2">
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
          className={classNames(
            item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </DisclosureButton>
);

export default MobileMenu;
