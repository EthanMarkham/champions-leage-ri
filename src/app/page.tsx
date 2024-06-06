import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image src="/icons/logo.webp" alt="CLRI" width={250} height={250} />
          <div>
            <h1 className="text-5xl font-bold">Champions League RI</h1>
            <h2 className="">Connecting Competitors, Creating Community.</h2>

            <p className="py-6">
              Join our community and participate in the league. Whether you&apos;re a seasoned pro or a beginner, we
              have something for everyone.
            </p>
            <Link href="/rules" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/*
      <section className="">
        <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
        <p>Stay tuned for our upcoming events. Check out our calendar to see whats coming up!</p>
      </section>
      <section className="">
        <h3 className="text-xl font-semibold mb-2">League Standings</h3>
        <p>Get the latest updates on scores and rankings.</p>
      </section>
      <div className="text-center my-12">
        <Link href="/rules">
          <button className="btn">Learn More</button>
        </Link>
  </div>*/}
    </>
  );
}
