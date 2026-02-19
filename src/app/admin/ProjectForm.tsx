"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadProjectImage } from "@/lib/storage";
import { Project } from "@/types/project";
import Image from "next/image";

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

// Helper function to safely get images array
function getImagesArray(images: string[] | string | null): string[] {
  if (Array.isArray(images)) return images;
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return images ? [images] : [];
    }
  }
  return [];
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
    github_url: project?.github_url || "",
    live_url: project?.live_url || "",
    order: project?.order || 0,
    featured: project?.featured || false,
    status: project?.status || "done",
  });
  const [images, setImages] = useState<string[]>(getImagesArray(project?.images ?? null));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check max images limit
    if (images.length + files.length > 10) {
      setError("Maximum 10 images allowed");
      return;
    }

    setUploading(true);
    setError("");

    const uploadPromises = Array.from(files).map(async (file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return null;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        return null;
      }
      return uploadProjectImage(file);
    });

    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((url): url is string => url !== null);

    if (successfulUploads.length > 0) {
      setImages((prev) => [...prev, ...successfulUploads]);
    }

    if (successfulUploads.length < files.length) {
      setError(`${files.length - successfulUploads.length} image(s) failed to upload`);
    }

    setUploading(false);
    // Reset input
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReorderImage = (index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const newImages = [...prev];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= newImages.length) return prev;
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      return newImages;
    });
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
      images: images,
      image_url: images[0] || null, // Keep legacy field updated
      github_url: formData.github_url || null,
      live_url: formData.live_url || null,
      order: Number(formData.order),
      featured: formData.featured,
      status: formData.status,
    };

    let result;

    if (project) {
      result = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", project.id);
    } else {
      result = await supabase.from("projects").insert([projectData]);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
    } else {
      onSave();
    }
  };

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

        {/* Multiple Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Images ({images.length}/10)
          </label>

          {/* Current Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative group">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={img}
                      alt={`Project image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-primary-orange text-white text-xs px-2 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleReorderImage(index, "up")}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100"
                        title="Move left"
                      >
                        ←
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                      title="Remove"
                    >
                      ×
                    </button>
                    {index < images.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleReorderImage(index, "down")}
                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100"
                        title="Move right"
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Area */}
          {images.length < 10 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {uploading ? (
                <div className="text-gray-500">
                  <svg className="animate-spin h-8 w-8 mx-auto mb-2 text-primary-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <label className="mt-3 block">
                    <span className="text-primary-orange hover:underline cursor-pointer font-medium">
                      Upload images
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB each</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
            >
              <option value="done">Completed</option>
              <option value="wip">Work in Progress</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving || uploading}
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