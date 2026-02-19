import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to safely get tags array
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

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Viktor Ahnström`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const tags = getTags(project.tags);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-gray">
        {/* Header */}
        <div className="bg-neutral-white pt-32 md:pt-36">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-neutral-black/60 hover:text-primary-orange transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to projects
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-neutral-white pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-neutral-black/60 border border-neutral-black/20 px-4 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light italic tracking-tight text-neutral-darkgray mb-6">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-neutral-black/70 max-w-3xl">
              {project.description}
            </p>

            {/* Links */}
            <div className="flex gap-4 mt-8">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-orange text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
                >
                  View Live
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-neutral-black/20 text-neutral-darkgray px-6 py-3 rounded-full hover:border-neutral-black/40 transition-colors"
                >
                  GitHub
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Image */}
        {project.image_url && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Long Description */}
        {project.long_description && (
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
            <div className="bg-neutral-white p-8 md:p-12 lg:p-16 rounded-lg">
              <h2 className="text-3xl md:text-4xl font-light italic tracking-tight text-neutral-darkgray mb-8">
                About this project
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-black/70">
                {project.long_description.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
          <div className="flex justify-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-primary-orange hover:underline text-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              View all projects
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}