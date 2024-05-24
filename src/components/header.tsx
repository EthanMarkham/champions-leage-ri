import Link from "next/link";
import Image from "next/image";
import Logo from "./svg/Logo";

const Header = () => (
  <header className="bg-black text-white p-4 flex justify-between items-center">
    <Logo fill="white"/>
    <nav className="flex space-x-4">
      <Link href="/">Home</Link>
      <Link href="#about">About</Link>
      <Link href="#teams">Teams</Link>
      <Link href="#schedule">Schedule</Link>
      <Link href="#contact">Contact</Link>
    </nav>
  </header>
);

export default Header;
