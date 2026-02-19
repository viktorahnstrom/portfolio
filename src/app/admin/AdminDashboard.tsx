"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";
import ProjectForm from "@/app/admin/ProjectForm";

interface AdminDashboardProps {
  onSignOut: () => void;
}

export default function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchProjects = async () => {
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
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      alert("Error deleting project");
    } else {
      fetchProjects();
    }
  };

  const handleSave = async () => {
    setEditingProject(null);
    setIsCreating(false);
    fetchProjects();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-gray flex items-center justify-center">
        <div className="text-xl">Loading projects...</div>
      </div>
    );
  }

  if (isCreating || editingProject) {
    return (
      <div className="min-h-screen bg-neutral-gray p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setIsCreating(false);
              setEditingProject(null);
            }}
            className="mb-6 text-gray-600 hover:text-gray-800"
          >
            ← Back to projects
          </button>
          <ProjectForm
            project={editingProject}
            onSave={handleSave}
            onCancel={() => {
              setIsCreating(false);
              setEditingProject(null);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-gray">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={onSignOut}
            className="text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-primary-orange text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            + Add Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.featured ? "✓" : "–"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-primary-orange hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No projects yet. Add your first project!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}