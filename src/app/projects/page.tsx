import { getFeaturedProjects, getNonFeaturedProjects } from '@/lib/projects';
import { Project } from '@/types/project';
import ProjectShowcase from '@/components/projects/ProjectShowcase';
import ProjectArchive from '@/components/projects/ProjectArchive';
import ProjectsHeading from '@/components/projects/ProjectsHeading';

export const metadata = {
  title: 'Projects | Viktor Ahnström',
  description: 'A showcase of my featured projects and work.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const [featured, archived]: [Project[], Project[]] = await Promise.all([
    getFeaturedProjects(),
    getNonFeaturedProjects(),
  ]);

  return (
    <div className="min-h-screen bg-neutral-darkgray pt-24">
      <h1 className="sr-only">Projects</h1>

      {/* Page heading */}
      <ProjectsHeading />

      {/* Featured showcase */}
      <div role="feed" aria-label="Featured projects" className="space-y-8">
        {featured.map((project, index) => (
          <article
            key={project.id}
            aria-posinset={index + 1}
            aria-setsize={featured.length}
            className={index < featured.length - 1 ? 'border-b border-white/10' : ''}
          >
            <ProjectShowcase project={project} index={index} />
          </article>
        ))}
      </div>

      {/* Archive */}
      <ProjectArchive projects={archived} />
    </div>
  );
}
