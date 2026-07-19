"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ClientFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  notes: string;
  payment_preference: "full" | "partial" | "installment";
  tags: string[];
}

const ClientForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const params = useParams();
  const isEdit = !!params.id;

  const defaultValues: ClientFormData = {
    name: "", company: "", email: "", phone: "", whatsapp: "",
    country: "", notes: "", payment_preference: "full", tags: [],
  };

  const { control, handleSubmit } = useForm<ClientFormData>({ defaultValues });

  const onSubmit = (data: ClientFormData) => {
    const clientId = isEdit ? params.id : crypto.randomUUID();
    console.log("Submitting client:", { ...data, id: clientId });
    toast({ title: isEdit ? "Client updated" : "Client created", description: "Success" });
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#0B0C0E]/80 border border-white/5 rounded-xl p-6 shadow-sm my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{isEdit ? "Edit Client" : "New Client"}</h2>
        <Button variant="ghost" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="block text-sm font-medium mb-1">Name</Label>
          <Controller name="name" control={control} render={({ field }) => (
            <Input {...field} placeholder="Alex Rivera" className="bg-white/[0.04] border-white/10 text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Company</Label>
          <Controller name="company" control={control} render={({ field }) => (
            <Input {...field} placeholder="Rivera Productions" className="bg-white/[0.04] border-white/10 text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Email</Label>
          <Controller name="email" control={control} render={({ field }) => (
            <Input type="email" {...field} placeholder="alex@riveraproductions.com" className="bg-white/[0.04] border-white/10 text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Phone</Label>
          <Controller name="phone" control={control} render={({ field }) => (
            <Input {...field} placeholder="+1 555 123 4567" className="bg-white/[0.04] border-white/10 text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">WhatsApp</Label>
          <Controller name="whatsapp" control={control} render={({ field }) => (
            <Input {...field} placeholder="+1 555 123 4567" className="bg-white/[0.04] border-white/10 text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Country</Label>
          <Controller name="country" control={control} render={({ field }) => (
            <Input {...field} placeholder="USA" className="bg-white/[0.04] border-white/10 text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Notes</Label>
          <Controller name="notes" control={control} render={({ field }) => (
            <textarea {...field} rows={4} className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/[0.04] text-white" />
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Payment Preference</Label>
          <Controller name="payment_preference" control={control} render={({ field }) => (
            <select {...field} className="w-full px-3 py-2 rounded-md border border-white/10 bg-white/[0.04] text-white">
              <option value="full">Full Payment</option>
              <option value="partial">Partial Payment</option>
              <option value="installment">Installment</option>
            </select>
          )} />
        </div>
        <div>
          <Label className="block text-sm font-medium mb-1">Tags (comma separated)</Label>
          <Input placeholder="premium, vip" className="bg-white/[0.04] border-white/10 text-white" />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" className="bg-[#2DD4BF] text-black hover:bg-[#2DD4BF]/80">
            {isEdit ? "Update Client" : "Create Client"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;