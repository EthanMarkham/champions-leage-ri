"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/svg/Logo";
import Button from "@/components/inputs/Button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Fragment, useEffect } from "react";

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Rules", href: "/rules" },
];

const mapLinksToCurrent = (currentPath: string, items: NavigationItem[]) => {
  const pathStart = currentPath.slice(1).split("/")[0];
  return items.map((item) => ({
    ...item,
    current: pathStart === item.href.slice(1).split("/")[0],
  }));
};

const NavigationLinks: React.FC<{ links: NavigationItem[] }> = ({ links }) => (
  <div className="hidden sm:ml-6 sm:flex items-center">
    <div className="flex space-x-4">
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={twMerge(
            item.current ? "underline underline-offset-4 text-white" : "text-gray-200 hover:text-gray-400",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  </div>
);

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
              "block rounded-md px-3 py-2 text-base font-medium",
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

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log("here");
  }, [pathname]);

  return (
    <Menu as="nav" className="bg-gray-800 text-white shadow-lg">
      {({ open, close }) => (
        <>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between md:justify-start h-16 items-center">
              <div className="flex items-center relative">
                <MenuButton className="relative inline-flex md:hidden items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </MenuButton>
                <Logo fill="white" className="w-32" />
              </div>
              <div className="hidden md:flex md:items-center grow">
                <NavigationLinks links={mapLinksToCurrent(pathname, navigation)} />
              </div>
              <div className="items-center space-x-4 hidden md:flex">
                <Button
                  onClick={() => {
                    router.push("/scores/upload");
                  }}
                  icon={<ArrowUpTrayIcon className="h-5 w-5 !m-0" aria-hidden="true" />}
                >
                  <span className="sr-only">Submit Your Round</span>
                </Button>
              </div>
            </div>
          </div>
          <MenuItems className="md:hidden">
            <MobileMenu
              links={mapLinksToCurrent(pathname, [...navigation, { name: "Submit", href: "/scores/upload" }])}
              closeMenu={close}
            />
          </MenuItems>
        </>
      )}
    </Menu>
  );
};
