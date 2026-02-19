"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";

interface ProjectFormProps {
  project: Project | null;
  onSave: () => void;
  onCancel: () => void;
}

// Helper function to safely get tags as string
function getTagsString(tags: string[] | string | null): string {
  if (Array.isArray(tags)) return tags.join(", ");
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) return parsed.join(", ");
    } catch {
      return tags;
    }
  }
  return "";
}

export default function ProjectForm({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    long_description: project?.long_description || "",
    tags: getTagsString(project?.tags ?? null),
    image_url: project?.image_url || "",
    github_url: project?.github_url || "",
    live_url: project?.live_url || "",
    order: project?.order || 0,
    featured: project?.featured || false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const projectData = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      long_description: formData.long_description || null,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image_url: formData.image_url || null,
      github_url: formData.github_url || null,
      live_url: formData.live_url || null,
      order: Number(formData.order),
      featured: formData.featured,
    };

    let result;

    if (project) {
      // Update existing
      result = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", project.id);
    } else {
      // Create new
      result = await supabase.from("projects").insert([projectData]);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
    } else {
      onSave();
    }
  };

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setFormData((prev) => ({ ...prev, slug }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">
        {project ? "Edit Project" : "Add New Project"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={() => !project && !formData.slug && generateSlug()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Long Description
          </label>
          <textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, TypeScript, Node.js"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Live URL
            </label>
            <input
              type="url"
              name="live_url"
              value={formData.live_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
            />
          </div>

          <div className="flex items-center pt-8">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 text-primary-orange rounded focus:ring-primary-orange"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Featured on homepage
            </label>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : project ? "Update Project" : "Create Project"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}