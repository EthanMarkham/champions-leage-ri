// pages/index.tsx

import { Button } from "@headlessui/react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center text-gray-800 text-center h-full">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Champions League</h1>
      <p className="text-2xl mb-8">The Ultimate Competition for Disc Golf Enthusiasts</p>
      <Link href="/rules">
        <Button className="bg-blue-500 px-4 py-2 rounded-full text-white"> Learn More</Button>
      </Link>
    </section>
  );
}
