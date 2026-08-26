'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Project } from '@/types/project';

interface ProjectArchiveProps {
  projects: Project[];
}

export default function ProjectArchive({ projects }: ProjectArchiveProps) {
  if (projects.length === 0) return null;

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={sectionRef} aria-label="Project archive" className="px-4 py-16 md:px-12 md:py-24 lg:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-sm font-medium uppercase tracking-widest text-white/40 mb-8"
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Archive
        </motion.h2>

        <ul className="divide-y divide-white/10 md:max-w-2xl" role="list">
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
                  <span className="text-base text-white/80 group-hover:text-primary-orange transition-colors">
                    {project.title}
                  </span>
                  <span className="text-sm text-white/30 tabular-nums ml-4 shrink-0">
                    {year}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
