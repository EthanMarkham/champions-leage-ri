// pages/index.tsx

export default function Home() {
  return (
    <section className="bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center items-center text-white text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Champions League</h1>
      <p className="text-2xl mb-8">The Ultimate Competition for Disc Golf Enthusiasts</p>
      <a href="#about" className="bg-blue-500 px-4 py-2 rounded-full text-white">
        Learn More
      </a>
    </section>
  );
}
