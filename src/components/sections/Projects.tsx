"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FALLBACK_COLORS = [
  "#0072BB", // brand blue
  "#1F6F6A", // muted teal (derived from #20B2AA)
  "#323232", // brand dark gray
];

function getAccentColor(project: Project, index: number): string {
  const maybeColor = (project as unknown as { accent_color?: string }).accent_color;
  if (maybeColor && /^#[0-9a-f]{3,8}$/i.test(maybeColor)) return maybeColor;
  return FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function getPreviewImage(project: Project): string | null {
  if (project.images && project.images.length > 0) return project.images[0];
  if (project.image_url) return project.image_url;
  return null;
}

export default function Projects() {
  const { ref, isInView } = useScrollAnimation(0.1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const previewX = useSpring(mouseX, { damping: 20, stiffness: 350, mass: 0.4 });
  const previewY = useSpring(mouseY, { damping: 20, stiffness: 350, mass: 0.4 });

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const getTags = (tags: string[] | string | null): string[] => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      try {
        const parsed = JSON.parse(tags);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return tags.split(",").map((t) => t.trim()).filter(Boolean);
      }
    }
    return [];
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleListMove = (e: React.MouseEvent) => {
    if (!listRef.current) return;
    const rows = listRef.current.querySelectorAll<HTMLElement>("[data-project-index]");
    const y = e.clientY;
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i].getBoundingClientRect();
      if (y >= r.top && y <= r.bottom) {
        const idx = Number(rows[i].dataset.projectIndex);
        if (hoveredIndex !== idx) setHoveredIndex(idx);
        return;
      }
    }
  };

  const activeProject = hoveredIndex !== null ? projects[hoveredIndex] : null;
  const activeColor = activeProject ? getAccentColor(activeProject, hoveredIndex!) : null;
  const activeImage = activeProject ? getPreviewImage(activeProject) : null;

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen relative py-16 md:py-24 flex flex-col justify-center transition-colors duration-500 ease-out overflow-hidden"
      style={{
        backgroundColor: activeColor ?? "#FFFFFF",
      }}
    >
      <div
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        className="mx-auto px-6 md:px-12 lg:px-24 max-w-7xl w-full relative"
      >
        <h2
          className={`text-7xl md:text-9xl font-light italic tracking-wide mb-12 md:mb-16 font-dharma scroll-animate transition-colors duration-500 ${
            isInView ? "in-view" : ""
          } ${activeColor ? "text-white" : "text-neutral-darkgray"}`}
        >
          Projects
        </h2>

        {loading ? (
          <div className="text-center py-12 text-neutral-black/60">
            Loading projects...
          </div>
        ) : (
          <div
            ref={listRef}
            onMouseMove={handleListMove}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`space-y-0 border-t transition-colors duration-500 ${
              activeColor ? "border-white/30" : "border-neutral-black/10"
            }`}
          >
            {projects.map((project, index) => {
              const isActive = hoveredIndex === index;
              const isDimmed = hoveredIndex !== null && !isActive;

              return (
                <div
                  key={project.id}
                  data-project-index={index}
                  className={`group border-b py-6 md:py-8 scroll-animate transition-all duration-500 ${
                    isInView ? "in-view" : ""
                  } ${activeColor ? "border-white/30" : "border-neutral-black/10"} ${
                    isDimmed ? "opacity-40" : "opacity-100"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span
                        className={`font-mono text-sm transition-colors duration-300 ${
                          activeColor ? "text-white/80" : "text-primary-orange"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <Link href={`/projects/${project.slug}`}>
                        <h3
                          className={`text-2xl md:text-4xl font-medium cursor-pointer transition-all duration-300 inline-flex items-center gap-3 ${
                            activeColor ? "text-white" : "text-neutral-darkgray"
                          } ${isActive ? "translate-x-2" : ""}`}
                        >
                          {project.title}
                          <span
                            className={`transition-all duration-300 ${
                              isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                            }`}
                            aria-hidden="true"
                          >
                            &rarr;
                          </span>
                        </h3>
                      </Link>
                    </div>

                    <div className="flex flex-wrap gap-2 md:gap-3 ml-8 md:ml-0">
                      {getTags(project.tags).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs md:text-sm px-3 py-1 rounded-full border transition-colors duration-300 ${
                            activeColor
                              ? "text-white border-white/40"
                              : "text-neutral-black/60 border-neutral-black/20"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p
                    className={`mt-3 ml-8 md:ml-16 max-w-2xl text-sm md:text-base transition-colors duration-300 ${
                      activeColor ? "text-white/80" : "text-neutral-black/60"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-4 ml-8 md:ml-16">
                    <Link
                      href={`/projects/${project.slug}`}
                      className={`text-sm transition-colors duration-300 hover:underline ${
                        activeColor ? "text-white" : "text-primary-orange"
                      }`}
                    >
                      View Project &rarr;
                    </Link>
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm transition-colors duration-300 ${
                          activeColor
                            ? "text-white/80 hover:text-white"
                            : "text-neutral-black/60 hover:text-neutral-black"
                        }`}
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {projects.length === 0 && (
              <div className="py-12 text-center text-neutral-black/60">
                No projects found.
              </div>
            )}
          </div>
        )}

        {/* Cursor-tracked image preview */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              key={activeProject?.id}
              className="pointer-events-none absolute z-20 hidden md:block"
              style={{
                left: previewX,
                top: previewY,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.85, rotate: -4 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-80 h-56 lg:w-96 lg:h-64 shadow-2xl overflow-hidden rounded-sm">
                <Image
                  src={activeImage}
                  alt={activeProject?.title ?? ""}
                  fill
                  className="object-cover"
                  sizes="384px"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
