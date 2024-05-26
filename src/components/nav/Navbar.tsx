"use client";

import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Logo from "../svg/Logo";
import MobileMenu from "./MobileMenu";
import MobileMenuButton from "./MobileMenuButton";
import NavigationLinks from "./NavigationLinks";

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

const Navbar: React.FC = () => {
  const pathname = usePathname();
  return (
    <Disclosure as="nav" className="bg-gray-800 text-gray-100 shadow-lg">
      {({ open }) => (
        <>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between md:justify-start h-16 items-center">
              <div className="flex items-center relative">
                <MobileMenuButton open={open} />
                <Logo fill="white" className="w-32" />
              </div>
              <div className="hidden md:flex md:items-center grow">
                <NavigationLinks links={mapLinksToCurrent(pathname, navigation)} />
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/scores/upload"
                  className="flex items-center bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded transition duration-300"
                >
                  <ArrowUpTrayIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Submit Your Round</span>
                </Link>
                {/*<ProfileMenu /> */}
              </div>
            </div>
          </div>
          <DisclosurePanel className="md:hidden">
            <MobileMenu
              links={mapLinksToCurrent(pathname, [...navigation, { name: "Submit", href: "/scores/upload" }])}
            />
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
