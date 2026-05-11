"use client";

import { aboutContent } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import FlowingTopography from "@/components/ui/FlowingTopography";

export default function About() {
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation(0.1);
  const { ref: cardRef, isInView: cardInView } = useScrollAnimation(0.2);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: "#dddddd" }}
      className={`relative py-16 md:py-24 overflow-hidden scroll-animate-scale ${sectionInView ? "in-view" : ""}`}
    >
      <FlowingTopography
        className="absolute inset-0 w-full h-full pointer-events-none"
        lineColor="#F9541D"
        lineCount={20}
      />
      <div className="relative z-10 mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        <div
          ref={cardRef}
          className={`bg-neutral-white p-10 md:p-16 lg:p-20 max-w-4xl scroll-animate ${cardInView ? "in-view" : ""}`}
        >
          <h2 className="text-7xl md:text-9xl font-light italic tracking-tight">
            {aboutContent.heading}
          </h2>

          <div className="mt-8 space-y-4">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-neutral-black/70 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <a
            href={aboutContent.resumeUrl}
            className="inline-block mt-8 text-primary-orange font-semibold hover:underline"
          >
            {aboutContent.resumeText} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}