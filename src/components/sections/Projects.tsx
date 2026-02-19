"use client";

import { projectsContent } from "@/data/content";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Projects() {
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen bg-neutral-white py-16 md:py-24 flex flex-col justify-center"
    >
      <div className="mx-auto px-6 md:px-12 lg:px-24 max-w-7xl w-full">
        <h2
          className={`text-6xl md:text-8xl font-light italic tracking-tight text-neutral-darkgray mb-12 md:mb-16 scroll-animate ${isInView ? "in-view" : ""}`}
        >
          {projectsContent.heading}
        </h2>

        <div className="space-y-0 border-t border-neutral-black/10">
          {projectsContent.projects.map((project, index) => (
            <div
              key={project.id}
              className={`group border-b border-neutral-black/10 py-6 md:py-8 scroll-animate ${isInView ? "in-view" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-primary-orange font-mono text-sm">
                    0{index + 1}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-medium text-neutral-darkgray group-hover:text-primary-orange transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 ml-8 md:ml-0">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs md:text-sm text-neutral-black/60 border border-neutral-black/20 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-neutral-black/60 mt-3 ml-8 md:ml-16 max-w-2xl text-sm md:text-base">
                {project.description}
              </p>

              <div className="flex gap-4 mt-4 ml-8 md:ml-16">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-orange hover:underline"
                  >
                    View Project &rarr;
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-black/60 hover:text-neutral-black transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}