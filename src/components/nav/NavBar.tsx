import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
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

export const NavBar: React.FC = () => {
  return (
    <div className="navbar bg-neutral text-white z-50 fixed top-0 left-0 right-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Bars3Icon className="h-5 w-5" fill="none" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
            {navigation.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">ChampionsLeagueRI</a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};
