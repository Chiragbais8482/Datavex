import { Hero } from "../components/Hero";
import WhatYouGet from "../components/WhatYouGet";
import { HowItWorks } from "../components/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative mt-32">
        <WhatYouGet />
      </section>

      <section className="relative mt-32">
        <HowItWorks />
      </section>
    </>
  );
}
