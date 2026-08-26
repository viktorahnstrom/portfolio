'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Project } from '@/types/project';

function getTags(tags: string[] | string | null): string[] {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === 'string') {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return tags.split(',').map((t) => t.trim()).filter(Boolean);
    }
  }
  return [];
}

function getHeroImage(project: Project): string | null {
  if (project.images && project.images.length > 0) return project.images[0];
  if (project.image_url) return project.image_url;
  return null;
}

interface ProjectShowcaseProps {
  project: Project;
  index: number;
}

export default function ProjectShowcase({ project, index }: ProjectShowcaseProps) {
  const heroImage = getHeroImage(project);
  const tags = getTags(project.tags);
  const number = String(index + 1).padStart(2, '0');
  const isFirst = index === 0;
  const isEven = index % 2 === 0;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

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
    <section ref={sectionRef} aria-label={project.title} className="px-4 py-16 md:px-12 md:py-24 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

          {/* Image column — sticky on desktop */}
          {heroImage && (
            <motion.div
              className={`lg:sticky lg:top-28 mb-6 lg:mb-0 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
              {...fadeScale(0.15)}
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden bg-white/5">
                <Image
                  src={heroImage}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 640px"
                  priority={isFirst}
                />
              </div>
            </motion.div>
          )}

          {/* Text column */}
          <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} ${!heroImage ? 'lg:col-span-2 lg:max-w-2xl' : ''}`}>
            {/* Number + Status */}
            <motion.div className="flex items-center gap-3 mb-4" {...fadeUp(0)}>
              <span aria-hidden="true" className="font-dharma text-6xl md:text-8xl leading-none text-primary-orange">
                {number}
              </span>
              {project.status === 'wip' && (
                <span className="inline-flex items-center gap-1.5 bg-yellow-900/40 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                  WIP
                </span>
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-light italic tracking-tight text-white mb-3 md:mb-4"
              {...fadeUp(0.08)}
            >
              {project.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-base md:text-lg text-white/60 leading-relaxed mb-5 md:mb-6 max-w-prose"
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
                    className="text-xs md:text-sm text-white/50 border border-white/20 px-3 py-1 rounded-full"
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
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-sm px-5 py-3 rounded-full min-h-[44px] hover:border-white/40 hover:text-white active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
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
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-sm px-5 py-3 rounded-full min-h-[44px] hover:border-white/40 hover:text-white active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange"
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
    </section>
  );
}
