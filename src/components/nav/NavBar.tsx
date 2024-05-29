"use client";

import { Menu, MenuButton } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import MobileMenu from "@/components/nav/MobileMenu";
import DesktopLinks from "@/components/nav/DesktopLinks";
import LogoAlt from "@/components/svg/Logo";
import Image from "next/image";
export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Rules", href: "/rules" },
  { name: "Submit Round", href: "/scores/upload" },
];

const mapLinksToCurrent = (currentPath: string, items: NavigationItem[]) => {
  const pathStart = currentPath.slice(1).split("/")[0];
  return items.map((item) => ({
    ...item,
    current: pathStart === item.href.slice(1).split("/")[0],
  }));
};

export const NavBar: React.FC = () => {
  const pathName = usePathname();
  const links = mapLinksToCurrent(pathName, navigation);
  return (
    <Menu as="nav" className="bg-gray-800 text-white shadow-lg">
      {({ open, close }) => (
        <>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between md:justify-start h-16 items-center">
              <div className="flex items-center relative justify-between w-full md:w-fit h-16 overflow-hidden">
                <MenuButton className="relative inline-flex md:hidden items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </MenuButton>
                <Image src="/icons/logo.webp" alt="CLRI" width={50} height={50}/>
                {/* <LogoAlt className="w-16 grow-0" fill="white" /> */}
              </div>
              <DesktopLinks links={links} />
            </div>
          </div>
          <MobileMenu links={links} closeMenu={close} />
        </>
      )}
    </Menu>
  );
};
