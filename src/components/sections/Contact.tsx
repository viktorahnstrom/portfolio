"use client";

import { contactContent } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Contact() {
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation(0.1);
  const { ref: cardRef, isInView: cardInView } = useScrollAnimation(0.2);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`min-h-screen pattern-topography-2 py-16 md:py-24 flex flex-col justify-center scroll-animate-scale ${sectionInView ? "in-view" : ""}`}
    >
      <div className="mx-auto px-6 md:px-12 lg:px-24 max-w-7xl w-full">
        <div
          ref={cardRef}
          className={`bg-neutral-white p-10 md:p-16 lg:p-20 max-w-4xl mx-auto scroll-animate ${cardInView ? "in-view" : ""}`}
        >
          {/* Heading */}
          <h2 className="text-5xl md:text-7xl font-light italic tracking-tight text-center mb-4">
            {contactContent.heading}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-black/60 text-center max-w-xl mx-auto mb-12">
            {contactContent.subtitle}
          </p>

          {/* Form */}
          <form className="space-y-8">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div>
                <label className="block text-sm text-neutral-black/50 mb-2">
                  {contactContent.nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={contactContent.namePlaceholder}
                  className="w-full bg-transparent border-b border-neutral-black/30 py-3 text-neutral-darkgray placeholder:text-neutral-black/40 focus:outline-none focus:border-primary-orange transition-colors"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm text-neutral-black/50 mb-2">
                  {contactContent.emailLabel}
                </label>
                <input
                  type="email"
                  placeholder={contactContent.emailPlaceholder}
                  className="w-full bg-transparent border-b border-neutral-black/30 py-3 text-neutral-darkgray placeholder:text-neutral-black/40 focus:outline-none focus:border-primary-orange transition-colors"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm text-neutral-black/50 mb-2">
                {contactContent.messageLabel}
              </label>
              <textarea
                placeholder={contactContent.messagePlaceholder}
                rows={4}
                className="w-full bg-transparent border-b border-neutral-black/30 py-3 text-neutral-darkgray placeholder:text-neutral-black/40 focus:outline-none focus:border-primary-orange transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="group flex items-center gap-4 px-16 py-4 border border-primary-orange text-primary-orange rounded-full hover:bg-primary-orange hover:text-neutral-white transition-all duration-300"
              >
                <span className="font-medium tracking-wider">
                  {contactContent.buttonText}
                </span>
                <svg
                  className="w-6 h-6 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}