import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/content";

function AnimatedName({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{ animationDelay: `${startDelay + i * 0.04}s` }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Logo - scrolls with page, not fixed */}
      <Link
        href="/"
        className="absolute top-0 left-0 z-20 p-6 animate-fade-in"
        aria-label="Home"
      >
        <Image
          src="/logo.svg"
          alt="VA Logo"
          width={50}
          height={50}
          priority
        />
      </Link>

      <div className="bg-neutral-gray grain flex-grow pt-32 sm:pt-36 md:pt-0">
        <div className="mx-auto px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-8xl h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">
            <div className="flex flex-col justify-center md:pt-32 w-full">
              <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[9.5rem] xl:text-[12rem] 2xl:text-[14rem] leading-[0.92] tracking-tight stylized-name">
                <AnimatedName text={heroContent.firstName} startDelay={0.1} />
                <AnimatedName text={heroContent.lastName} startDelay={0.5} />
              </h1>

              <div className="mt-4 sm:mt-6 md:mt-4 max-w-xs">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold animate-fade-slide-up animation-delay-200">
                  {heroContent.title}
                </h2>
                <ul className="mt-3 sm:mt-4 space-y-1">
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

      {/* Profile picture - centered, larger */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-40 inset-x-0 flex justify-center z-10 animate-fade-in animation-delay-400 pointer-events-none">
        <div className="relative w-48 h-64 sm:w-56 sm:h-72 md:w-72 md:h-96 animate-slide-up">
          <Image
            src="/profilepicture.svg"
            alt="Profile photo"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      <div className="bg-neutral-white h-12 sm:h-16 md:h-40"></div>
    </section>
  );
}