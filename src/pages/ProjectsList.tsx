"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, Trash2, Edit, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import ProjectStatusTimeline, { ProjectStatus } from "@/components/ProjectStatusTimeline";
import ProjectForm from "@/components/ProjectForm";

interface Client {
  id: string;
  name: string;
  company: string;
}

interface Project {
  id: string;
  client_id: string;
  name: string;
  type: string;
  status: string;
  start_date: string;
  due_date: string;
  delivery_date: string;
  amount: number;
  advance_paid: boolean;
  editing_hours: number;
  notes: string;
  drive_link: string;
  assets_link: string;
  created_at: string;
  updated_at: string;
}

const ProjectsList = () => {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const mockClients: Client[] = [
          { id: "1", name: "Alex Rivera", company: "Rivera Productions" },
          { id: "2", name: "Samira Khan", company: "Khan Creative" },
        ];
        setClients(mockClients);
      } catch (err) {
        setError("Failed to load clients");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 500));
        const mockProjects: Project[] = [
          {
            id: "1",
            client_id: "1",
            name: "YouTube Video",
            type: "youtube",
            status: "delivered",
            start_date: "2023-01-01",
            due_date: "2023-02-01",
            delivery_date: "2023-01-15",
            amount: 5000,
            advance_paid: true,
            editing_hours: 10,
            notes: "High priority",
            drive_link: "https://drive.google.com/...",
            assets_link: "https://assets.example.com/...",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            client_id: "2",
            name: "Reel Project",
            type: "reel",
            status: "waiting_payment",
            start_date: "2023-03-01",
            due_date: "2023-04-01",
            delivery_date: "2023-03-30",
            amount: 3000,
            advance_paid: false,
            editing_hours: 8,
            notes: "New client",
            drive_link: "https://drive.google.com/...",
            assets_link: "https://assets.example.com/...",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
        setProjects(mockProjects);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTagFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTagFilter(e.target.value);
  };

  const handleCreate = () => {
    navigate("/projects/new");
  };

  const handleEdit = (id: string) => {
    navigate(`/projects/${id}`);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Success", description: "Project deleted" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0B0C0E] text-white items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2DD4BF]/20" />
          <p className="mt-4 text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#0B0C0E] text-white items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="text-gray-400 mt-2">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      <div className="w-64 sticky top-0 bg-[#0B0C0E] border-r border-white/5 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#2DD4BF] font-bold text-xl tracking-tight">
            EDITOR<span className="text-white">OS</span>
          </span>
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 rounded-md bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowUp size={18} className="text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-2 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreate}
            className="w-full flex items-center justify-center gap-2"
          >
            <ArrowUp className="text-[#2DD4BF]" />
            New Project
          </Button>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
            <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
              <Eye size={18} className="text-gray-400" />
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={handleSearch}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white placeholder-text-white"
              />
            </div>
            <select
              value={tagFilter}
              onChange={handleTagFilter}
              className="px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
            >
              <option value="">All Types</option>
              <option value="youtube">YouTube</option>
              <option value="reel">Reel</option>
              <option value="shorts">Shorts</option>
              <option value="documentary">Documentary</option>
              <option value="ad">Ad</option>
              <option value="podcast">Podcast</option>
              <option value="motion_graphics">Motion Graphics</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate</option>
            </select>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.04] border border-white/5 rounded-xl">
              <p className="text-gray-400">No projects found.</p>
              <Button variant="ghost" onClick={handleCreate} className="mt-2">
                Create New Project
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Client</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Dates</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((p) => (
                  <TableRow key={p.id} className="border-b border-white/5 hover:bg-[#0B0C0E]/10">
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {clients.find((c) => c.id === p.client_id)?.name || "Unknown"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ProjectStatusTimeline status={p.status as ProjectStatus} totalSteps={8} />
                    </TableCell>
                    <TableCell>
                      {new Date(p.start_date).toLocaleDateString()} / {new Date(p.due_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${p.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/projects/${p.id}`)}>
                        <Eye size={16} className="text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/projects/${p.id}/edit`)}>
                        <Edit size={16} className="text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                        <Trash2 size={16} className="text-gray-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;