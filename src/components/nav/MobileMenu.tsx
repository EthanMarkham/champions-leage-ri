import Link from "next/link";
import { NavigationItem } from "@/components/nav/NavBar_Bad";
import { MenuItems, MenuItem } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

const MobileMenu: React.FC<{ links: NavigationItem[]; closeMenu: () => void }> = ({ links, closeMenu }) => (
  <MenuItems className="space-y-1 px-2 pb-3 pt-2">
    {links.map((item) => (
      <MenuItem key={item.name} as={Fragment}>
        {({ active }) => (
          <Link
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={twMerge(
              item.current ? "underline text-white" : "text-gray-200 hover:underline",
              "block rounded-md px-3 py-2 text-base font-medium text-center",
              active ? "bg-gray-700" : ""
            )}
            onClick={closeMenu}
          >
            {item.name}
          </Link>
        )}
      </MenuItem>
    ))}
  </MenuItems>
);

export default MobileMenu;