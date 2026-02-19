import Image from "next/image";
import { heroContent } from "@/data/content";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="bg-neutral-gray grain flex-grow pt-44 md:pt-0">
        <div className="mx-auto px-4 md:px-8 lg:px-16 max-w-8xl h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">
            <div className="flex flex-col justify-center md:pt-32 md:w-2/3 -ml-1 md:-ml-2">
              <h1 className="text-display-mobile md:text-display-desktop leading-[0.85] tracking-tight stylized-name animate-fade-slide-up">
                <span>{heroContent.firstName}</span>
                <span>{heroContent.lastName}</span>
              </h1>

              <div className="mt-6 md:mt-10 max-w-xs">
                <h2 className="text-xl md:text-2xl font-bold animate-fade-slide-up animation-delay-200">
                  {heroContent.title}
                </h2>
                <ul className="mt-4 space-y-1">
                  {heroContent.details.map((detail, index) => (
                    <li
                      key={index}
                      className={`text-sm md:text-base text-primary-orange font-medium animate-fade-slide-up animation-delay-${(index + 3) * 100}`}
                    >
                      &rarr; {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-22 md:bottom-48 left-1/2 -translate-x-1/2 z-10 animate-fade-slide-down animation-delay-400">
        <div className="relative w-48 h-60 md:w-64 md:h-80">
          <Image
            src="/profilepicture.svg"
            alt="Profile photo"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      <div className="bg-neutral-white h-22 md:h-48"></div>
    </section>
  );
}