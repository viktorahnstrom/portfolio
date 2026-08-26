"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { isVideoUrl } from "@/lib/storage";
import { Project } from "@/types/project";

function getTags(tags: string[] | string | null): string[] {
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
}

function getHeroImage(project: Project): string | null {
  if (project.images && project.images.length > 0) return project.images[0];
  if (project.image_url) return project.image_url;
  return null;
}

function getPreviewImages(project: Project): string[] {
  if (project.images && project.images.length > 0) return project.images;
  if (project.image_url) return [project.image_url];
  return [];
}

function useImageOrientation(src: string | null) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (!src) return;
    const img = new window.Image();
    img.onload = () => setIsPortrait(img.naturalHeight > img.naturalWidth);
    img.src = src;
  }, [src]);

  return isPortrait;
}

/* ── Single showcase section ── */

function ShowcaseItem({ project, index, total }: { project: Project; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();
  const heroImage = getHeroImage(project);
  const previewImages = getPreviewImages(project);
  const heroIsVideo = heroImage ? isVideoUrl(heroImage) : false;
  const isPortrait = useImageOrientation(heroIsVideo ? null : heroImage);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tags = getTags(project.tags);

  // Autoplay video when in view, pause when out
  useEffect(() => {
    if (!heroIsVideo || !videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, heroIsVideo]);
  const number = String(index + 1).padStart(2, "0");
  const isFirst = index === 0;
  const isEven = index % 2 === 0;

  const ease = [0.22, 1, 0.36, 1] as const;

  const fadeUp = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, ease, delay: prefersReduced ? 0 : delay },
  });

  const fadeScale = (delay: number) => ({
    initial: prefersReduced ? false : { opacity: 0, scale: 0.97 },
    animate: isInView ? { opacity: 1, scale: 1 } : undefined,
    transition: { duration: 0.7, ease, delay: prefersReduced ? 0 : delay },
  });

  return (
    <article
      ref={ref}
      aria-posinset={index + 1}
      aria-setsize={total}
      className={`px-4 py-16 md:px-12 md:py-24 lg:px-24 ${
        index < total - 1 ? "border-b border-neutral-black/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
          {/* Media column — sticky on desktop */}
          {heroImage && (
            <motion.div
              className={`lg:sticky lg:top-28 mb-6 lg:mb-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}
              {...fadeScale(0.15)}
            >
              {heroIsVideo ? (
                /* Video: autoplay muted when in view */
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-black/5">
                  <video
                    ref={videoRef}
                    src={heroImage}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : isPortrait ? (
                /* Portrait: show up to 3 phone screenshots side by side */
                <div className="flex gap-3 justify-center">
                  {previewImages.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[9/19] rounded-xl overflow-hidden bg-neutral-black/5 flex-1 max-w-[200px]"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 30vw, 200px"
                        priority={isFirst && i === 0}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* Landscape: single large image */
                <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden bg-neutral-black/5">
                  <Image
                    src={heroImage}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 640px"
                    priority={isFirst}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* Text column */}
          <div
            className={`${isEven ? "lg:order-1" : "lg:order-2"} ${
              !heroImage ? "lg:col-span-2 lg:max-w-2xl" : ""
            }`}
          >
            {/* Number + Status */}
            <motion.div className="flex items-center gap-3 mb-4" {...fadeUp(0)}>
              <span
                aria-hidden="true"
                className="font-dharma text-6xl md:text-8xl leading-none text-primary-orange"
              >
                {number}
              </span>
              {project.status === "wip" && (
                <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                  WIP
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="text-4xl md:text-5xl lg:text-6xl font-light italic tracking-tight text-neutral-darkgray mb-3 md:mb-4"
              {...fadeUp(0.08)}
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-neutral-black/60 leading-relaxed mb-5 md:mb-6 max-w-prose"
              {...fadeUp(0.16)}
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            {tags.length > 0 && (
              <motion.div className="flex flex-wrap gap-2 mb-6 md:mb-8" {...fadeUp(0.24)}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs md:text-sm text-neutral-black/50 border border-neutral-black/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Links */}
            <motion.div className="flex flex-wrap gap-3" {...fadeUp(0.32)}>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 bg-primary-orange text-white text-sm font-medium px-5 py-3 rounded-full min-h-[44px] hover:bg-primary-orange/90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
              >
                View project
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="inline-flex items-center gap-2 border border-neutral-black/20 text-neutral-darkgray text-sm px-5 py-3 rounded-full min-h-[44px] hover:border-neutral-black/40 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
                >
                  GitHub
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live site`}
                  className="inline-flex items-center gap-2 border border-neutral-black/20 text-neutral-darkgray text-sm px-5 py-3 rounded-full min-h-[44px] hover:border-neutral-black/40 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
                >
                  Live site
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Archive list ── */

function ArchiveList({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  if (projects.length === 0) return null;

  return (
    <div ref={ref} className="px-4 py-16 md:px-12 md:py-24 lg:px-24 border-t border-neutral-black/10">
      <div className="max-w-7xl mx-auto">
        <motion.h3
          className="text-sm font-medium uppercase tracking-widest text-neutral-black/40 mb-8"
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Archive
        </motion.h3>

        <ul className="divide-y divide-neutral-black/10 md:max-w-2xl" role="list">
          {projects.map((project, i) => {
            const year = new Date(project.created_at).getFullYear();

            return (
              <motion.li
                key={project.id}
                initial={prefersReduced ? false : { opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1] as const,
                  delay: prefersReduced ? 0 : 0.1 + i * 0.06,
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex items-center justify-between py-4 min-h-[44px] group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange rounded-sm"
                >
                  <span className="text-base text-neutral-darkgray group-hover:text-primary-orange transition-colors">
                    {project.title}
                  </span>
                  <span className="text-sm text-neutral-black/30 tabular-nums ml-4 shrink-0">
                    {year}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ── Section heading ── */

function SectionHeading({ isInView }: { isInView: boolean }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="px-4 pb-8 md:px-12 md:pb-12 lg:px-24 lg:pb-16 max-w-7xl mx-auto">
      <motion.p
        className="text-sm uppercase tracking-widest text-neutral-black/40 mb-3"
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      >
        Selected work
      </motion.p>
      <motion.h2
        className="font-dharma-light text-7xl md:text-9xl lg:text-[10rem] leading-[0.85] italic text-neutral-darkgray"
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.08 }}
      >
        Projects
      </motion.h2>
    </div>
  );
}

/* ── Main section ── */

export default function Projects() {
  const [featured, setFeatured] = useState<Project[]>([]);
  const [archived, setArchived] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const headingInView = useInView(sectionRef, { once: true, margin: "-40px" });

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        const all = data || [];
        setFeatured(all.filter((p) => p.featured));
        setArchived(all.filter((p) => !p.featured));
      }
      setLoading(false);
    }

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-neutral-white py-16 md:py-24"
    >
      <SectionHeading isInView={headingInView} />

      {loading ? (
        <div className="text-center py-12 text-neutral-black/40">Loading projects...</div>
      ) : (
        <>
          <div role="feed" aria-label="Featured projects">
            {featured.map((project, index) => (
              <ShowcaseItem
                key={project.id}
                project={project}
                index={index}
                total={featured.length}
              />
            ))}
          </div>

          <ArchiveList projects={archived} />

          {featured.length === 0 && archived.length === 0 && (
            <div className="text-center py-12 text-neutral-black/40">No projects found.</div>
          )}
        </>
      )}
    </section>
  );
}
