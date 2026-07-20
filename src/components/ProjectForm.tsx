"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProjectSchema = z.object({
  client_id: z.string().nonempty("Select a client"),
  name: z.string().min(3, "Project name is required"),
  type: z.enum(["youtube", "reel", "shorts", "documentary", "ad", "podcast", "motion_graphics", "wedding", "corporate"]),
  status: z.enum(["inquiry", "negotiation", "editing", "revision", "delivered", "waiting_payment", "paid", "cancelled"]),
  start_date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  due_date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  delivery_date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  amount: z.number().min(0, "Amount must be positive"),
  advance_paid: z.boolean(),
  editing_hours: z.number().min(0, "Editing hours must be non-negative"),
  notes: z.string().optional(),
  drive_link: z.string().url("Invalid URL"),
  assets_link: z.string().url("Invalid URL"),
});

interface ProjectFormData {
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
}

const ProjectForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const defaultValues: ProjectFormData = {
    client_id: "",
    name: "",
    type: "youtube",
    status: "inquiry",
    start_date: new Date().toISOString().split("T")[0],
    due_date: new Date().toISOString().split("T")[0],
    delivery_date: new Date().toISOString().split("T")[0],
    amount: 0,
    advance_paid: false,
    editing_hours: 0,
    notes: "",
    drive_link: "",
    assets_link: "",
  };

  const { control, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues,
    mode: "onBlur",
  });

  const onSubmit = (data: ProjectFormData) => {
    const projectId = isEdit ? params.id : crypto.randomUUID();
    console.log("Submitting project:", { ...data, id: projectId });
    toast({ title: isEdit ? "Project updated" : "Project created", description: "Success" });
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#0B0C0E]/80 border border-white/5 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {isEdit ? "Edit Project" : "New Project"}
        </h2>
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-1">Client</Label>
          <Controller
            name="client_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full bg-[#0B0C0E]/80 border-white/20 text-white">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Alex Rivera</SelectItem>
                  <SelectItem value="2">Samira Khan</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Project Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                type="text"
                placeholder="YouTube Video"
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white placeholder-text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full bg-[#0B0C0E]/80 border-white/20 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                  <SelectItem value="shorts">Shorts</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="ad">Ad</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="motion_graphics">Motion Graphics</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full bg-[#0B0C0E]/80 border-white/20 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inquiry">Inquiry</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="editing">Editing</SelectItem>
                  <SelectItem value="revision">Revision</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="waiting_payment">Waiting Payment</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Start Date</Label>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Due Date</Label>
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Delivery Date</Label>
          <Controller
            name="delivery_date"
            control={control}
            render={({ field }) => (
              <Input
                type="date"
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Amount ($)</Label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                placeholder="5000"
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Advance Paid</Label>
          <Controller
            name="advance_paid"
            control={control}
            render={({ field }) => (
              <Select onValueChange={(val) => field.onChange(val === "true")} value={field.value ? "true" : "false"}>
                <SelectTrigger className="w-full bg-[#0B0C0E]/80 border-white/20 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Editing Hours</Label>
          <Controller
            name="editing_hours"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                placeholder="10"
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Notes</Label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
                rows={4}
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Drive Link</Label>
          <Controller
            name="drive_link"
            control={control}
            render={({ field }) => (
              <Input
                type="url"
                placeholder="https://drive.google.com/..."
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Assets Link</Label>
          <Controller
            name="assets_link"
            control={control}
            render={({ field }) => (
              <Input
                type="url"
                placeholder="https://assets.example.com/..."
                {...field}
                className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white"
              />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-[#2DD4BF] text-black hover:bg-[#2DD4BF]/80"
          >
            {isEdit ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;