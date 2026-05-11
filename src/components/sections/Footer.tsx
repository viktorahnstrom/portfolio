import { footerContent, navLinks } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-neutral-white py-16 md:py-24">
      <div className="mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center">
          {/* Left - Contact Info */}
          <div>
            <h3 className="text-sm tracking-[0.3em] text-neutral-white/60 mb-4">
              {footerContent.heading}
            </h3>
            <a
              href={`mailto:${footerContent.email}`}
              className="text-primary-orange hover:underline text-lg"
            >
              {footerContent.email}
            </a>
          </div>

          {/* Middle - Navigation */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`/${link.href}`}
                className="text-primary-orange hover:text-primary-orange/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right - Logo */}
          <div className="flex justify-start md:justify-end">
            <a href="/" aria-label="Home" className="block">
              <span
                aria-hidden="true"
                className="block w-24 h-24 bg-primary-orange"
                style={{
                  WebkitMaskImage: "url(/logo.svg)",
                  maskImage: "url(/logo.svg)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-orange/30 mt-12 pt-8">
          <p className="text-primary-orange text-sm">
            {footerContent.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}