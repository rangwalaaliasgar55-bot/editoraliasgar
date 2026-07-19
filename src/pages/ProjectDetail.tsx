"use client";

import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectStatusTimeline, { ProjectStatus } from "@/components/ProjectStatusTimeline";

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

const ProjectDetail = () => {
  const params = useParams();
  const projectId = params.id;

  const project: Project = {
    id: projectId,
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
  };

  const client: Client = {
    id: "1",
    name: "Alex Rivera",
    company: "Rivera Productions",
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      <div className="w-64 sticky top-0 bg-[#0B0C0E] border-r border-white/5 flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <span className="text-[#2DD4BF] font-bold text-xl tracking-tight">
            {project.name}<span className="text-white">OS</span>
          </span>
          <button className="p-1.5 rounded-md bg-white/5 text-gray-400 hover:text-white">
            <ArrowUp size={18} className="text-gray-400" />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-2 mt-4">
          <div className="py-2 rounded-md bg-[#0B0C0E]/80">
            <span className="text-sm text-gray-400">Overview</span>
          </div>
          <div className="py-2 rounded-md bg-[#0B0C0E]/80">
            <span className="text-sm text-gray-400">Details</span>
          </div>
          <div className="py-2 rounded-md bg-[#0B0C0E]/80">
            <span className="text-sm text-gray-400">Timeline</span>
          </div>
          <div className="py-2 rounded-md bg-[#0B0C0E]/80">
            <span className="text-sm text-gray-400">Files</span>
          </div>
          <div className="py-2 rounded-md bg-[#0B0C0E]/80">
            <span className="text-sm text-gray-400">History</span>
          </div>
        </nav>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Project Details</h1>
            <p className="text-gray-500 mt-1">Comprehensive view of {project.name}'s details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Name</span>
                      <p className="text-lg font-medium">{project.name}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Client</span>
                      <p className="text-lg font-medium">{client.name}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Type</span>
                      <p className="text-lg font-medium">{project.type}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Status</span>
                      <p className="text-lg font-medium">
                        <ProjectStatusTimeline status={project.status as ProjectStatus} totalSteps={8} />
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Dates</span>
                      <p className="text-lg font-medium">
                        {formatDate(project.start_date)} – {formatDate(project.due_date)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Amount</span>
                  <p className="text-2xl font-medium">${project.amount.toLocaleString()}</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Contact</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Client</span>
                      <p className="text-lg font-medium">{client.name}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Type</span>
                      <p className="text-lg font-medium">{project.type}</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Status</span>
                      <p className="text-lg font-medium">
                        <ProjectStatusTimeline status={project.status as ProjectStatus} totalSteps={8} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Timeline</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <ProjectStatusTimeline status={project.status as ProjectStatus} totalSteps={8} />
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Files</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    <a href={project.drive_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2DD4BF] hover:text-[#2DD4BF]/50">
                      <ExternalLink size={16} />
                      <span className="text-sm text-gray-400">Drive Link</span>
                    </a>
                    <a href={project.assets_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#2DD4BF] hover:text-[#2DD4BF]/50">
                      <ExternalLink size={16} />
                      <span className="text-sm text-gray-400">Assets Link</span>
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">History</h3>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-gray-400/20 text-gray-400">Created: {new Date(project.created_at).toLocaleDateString()}</Badge>
                </div>
              </div>
            </Card>
          </div>

          <Separator className="my-8" />

          <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Due Date Countdown</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#2DD4BF]" />
              <span className="text-sm text-gray-400">
                Due: {formatDate(project.due_date)} ({project.due_date === new Date().toISOString().split('T')[0] ? "TODAY" : "Upcoming"})
              </span>
            </div>
          </Card>

          <Separator className="my-8" />

          <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">AI Insights</h3>
            <p className="text-gray-400 italic">
              "Project {project.name} is currently {project.status}. 
              With {project.amount.toLocaleString()} revenue generated and {project.editing_hours} editing hours logged, 
              this project contributes significantly to your revenue stream. 
              Consider scheduling a follow-up with the client to ensure timely payment."
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;