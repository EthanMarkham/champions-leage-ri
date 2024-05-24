"use client";

import { Disclosure } from "@headlessui/react";
import Logo from "../svg/Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import NavigationLinks from "./NavigationLinks";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { it } from "node:test";

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Scores", href: "/scores" },
  { name: "Courses", href: "/courses" },
  { name: "Events", href: "/events" },
  { name: "Rules", href: "/rules" },
];

const mapLinksToCurrent = (currentPath: string, items: NavigationItem[]) => {
  const pathStart = currentPath.slice(1).split("/")[0];
  return items.map((item) => ({ ...item, current: pathStart === item.href.slice(1).split("/")[0] }));
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" suppressHydrationWarning={true}>
            <div className="relative flex h-fit items-center justify-between">
              <MobileMenuButton open={open} />
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Logo fill="white" />
                <NavigationLinks links={mapLinksToCurrent(pathname, navigation)} />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  href="/scores/upload"
                  className="rounded-lg bg-gray-800 p-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hidden md:block border-2 border-gray-200"
                >
                  <CheckIcon className="h-6 w-6 inline mr-1" aria-hidden="true" />
                  <span className="inline">Submit Your Round</span>
                </Link>
                {/*<ProfileMenu /> */}
              </div>
            </div>
          </div>
          <MobileMenu
            links={mapLinksToCurrent(pathname, [...navigation, { name: "Submit", href: "/scores/upload" }])}
          />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
