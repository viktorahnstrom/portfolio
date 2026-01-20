import Image from "next/image";
import { heroContent } from "@/data/content";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Gray Section - Top */}
      <div className="bg-neutral-gray flex-grow pt-44 md:pt-0">
        <div className="mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Text Content */}
            <div className="flex flex-col justify-center md:pt-32 md:w-1/2">
              {/* Name */}
              <h1 className="text-5xl md:text-display-desktop font-medium tracking-tight whitespace-pre-line leading-none">
                {heroContent.name}
              </h1>

              {/* Title and Description */}
              <div className="mt-8 md:mt-12 max-w-xs">
                <h2 className="text-xl md:text-2xl font-bold">
                  {heroContent.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-neutral-black/70 leading-relaxed">
                  {heroContent.description}
                </p>
              </div>
            </div>

            {/* Profile Image - Positioned to overlap gray/white */}
            <div className="flex justify-center md:justify-end md:w-1/2 mt-12 md:mt-0 md:self-end">
              <div className="relative w-48 h-60 md:w-80 md:h-[400px] translate-y-16 md:translate-y-24">
                <Image
                  src={heroContent.image}
                  alt="Profile photo"
                  fill
                  className="object-cover object-top grayscale"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White Section - Bottom */}
      <div className="bg-neutral-white h-22 md:h-48"></div>
    </section>
  );
}