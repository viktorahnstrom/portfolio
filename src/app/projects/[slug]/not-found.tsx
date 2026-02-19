import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-gray flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-light italic tracking-tight text-neutral-darkgray mb-4">
          404
        </h1>
        <p className="text-xl text-neutral-black/60 mb-8">
          Project not found
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 bg-primary-orange text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors"
        >
          Back to projects
        </Link>
      </div>
    </main>
  );
}