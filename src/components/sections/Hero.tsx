import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/data/content";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Logo - scrolls with page, not fixed */}
      <Link
        href="/"
        className="absolute top-0 left-0 z-20 p-6"
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

      <div className="bg-neutral-gray grain flex-grow pt-24 sm:pt-28 md:pt-0">
        <div className="mx-auto px-6 sm:px-14 md:px-20 lg:px-28 xl:px-36 max-w-8xl h-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full">
            <div className="flex flex-col justify-center md:pt-32 w-full">
              <h1 className="text-[17vw] sm:text-[18vw] md:text-[19vw] lg:text-[19vw] xl:text-[19vw] 2xl:text-[19vw] leading-[0.95] tracking-tight stylized-name">
                <span className="name-line">{heroContent.firstName}</span>
                <span className="name-line">{heroContent.lastName}</span>
              </h1>

              <div className="mt-3 sm:mt-3 md:-mt-2 max-w-xs">
                <h2 className="text-sm sm:text-base md:text-lg font-bold">
                  {heroContent.title}
                </h2>
                <ul className="mt-1 space-y-0.5">
                  {heroContent.details.map((detail, index) => (
                    <li
                      key={index}
                      className="text-sm md:text-base font-medium"
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
      <div className="absolute bottom-10 sm:bottom-14 md:bottom-40 inset-x-0 flex justify-center z-10 pointer-events-none">
        <div className="relative w-44 h-60 sm:w-56 sm:h-72 md:w-72 md:h-96">
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
