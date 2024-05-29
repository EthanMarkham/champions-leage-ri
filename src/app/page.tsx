import { Button } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import PageWrapper from "@/components/ui/PageWrapper";
import Logo from "@/components/svg/Logo";

export default function Home() {
  return (
    <PageWrapper className="max-w-4xl mx-auto [&>*]:lg:mb-8 [&>*]:mb-4">
      <hgroup className="text-center space-y-2">
        <h1 className="text-xl lg:text-4xl font-bold">Welcome to Champions League RI</h1>
        <h2 className="text-sm lg:text-lg text-gray-700/70">Connecting Competitors, Creating Community.</h2>
      </hgroup>
      <p className="text-lg text-center max-w-[400px]">
        Join our community and participate in the league. Whether you&apos;re a seasoned pro or a
        beginner, we have something for everyone.
      </p>
      <figure className="flex flex-col items-center">
        <Image src="/icons/logo.webp" alt="CLRI"  width={250} height={250} />
        <figcaption className="font-bold tracking-widest text-lg mt-4">Champions League RI</figcaption>
      </figure>
      <section className="">
        <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
        <p>
          Stay tuned for our upcoming events. Check out our calendar to see whats coming up!
        </p>
      </section>
      <section className="">
        <h3 className="text-xl font-semibold mb-2">League Standings</h3>
        <p>Get the latest updates on scores and rankings.</p>
      </section>
      <div className="text-center my-12">
        <Link href="/rules">
          <Button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-white">Learn More</Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
