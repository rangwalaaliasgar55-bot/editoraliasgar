"use client";

import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { formatINR } from "@/lib/utils";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  notes: string;
  payment_preference: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  projects: number;
  invoices: number;
  total_revenue: number;
  outstanding_balance: number;
  last_payment_date: string;
  last_contact_date: string;
}

const ClientProfile = () => {
  const params = useParams();
  const clientId = params.id;

  const client: Client = {
    id: clientId ?? "",
    name: "Alex Rivera", company: "Rivera Productions",
    email: "alex@riveraproductions.com", phone: "+1 555 123 4567",
    whatsapp: "+1 555 123 4567", country: "USA",
    notes: "High-value client, prefers upfront payment",
    payment_preference: "full", tags: ["premium", "vip"],
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    projects: 5, invoices: 8, total_revenue: 45000, outstanding_balance: 2300,
    last_payment_date: "2023-12-15", last_contact_date: "2024-01-10",
  };

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <button className="mb-4 p-1.5 rounded-md bg-white/5 text-gray-400 hover:text-white">
            <ArrowLeft size={18} />
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">Client Profile</h1>
            <p className="text-gray-500 mt-1">Comprehensive view of {client.name}'s business details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Basic Info</h3>
              <p className="text-lg font-medium">{client.name}</p>
              <p className="text-gray-300">{client.company}</p>
              <a href={`mailto:${client.email}`} className="text-[#2DD4BF] text-sm">{client.email}</a>
              <p className="text-gray-300 text-sm mt-1">{client.phone}</p>
            </Card>

            <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Contact</h3>
              <p className="text-sm text-gray-300">WhatsApp: {client.whatsapp}</p>
              <p className="text-sm text-gray-300">Country: {client.country}</p>
              <p className="text-sm text-gray-300">Last Contact: {new Date(client.last_contact_date).toLocaleDateString()}</p>
            </Card>

            <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Stats</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-xs text-gray-400">Proj</p><p className="text-xl font-mono">{client.projects}</p></div>
                <div><p className="text-xs text-gray-400">Inv</p><p className="text-xl font-mono">{client.invoices}</p></div>
                <div><p className="text-xs text-gray-400">Rev</p><p className="text-xl font-mono">{formatINR(client.total_revenue)}</p></div>
              </div>
              <Badge className="mt-2 bg-[#2DD4BF]/20 text-[#2DD4BF]">VIP Client</Badge>
            </Card>

            <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#2DD4BF]" />
                  <span className="text-gray-400">Last Payment: {client.last_payment_date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/20" />
                  <span className="text-gray-400">Onboarded: 2023-10-10</span>
                </div>
              </div>
            </Card>
          </div>

          <Separator className="my-8 bg-white/5" />

          <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4 mb-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Payment History</h3>
            <p className="text-gray-300">Total Paid: ${(client.total_revenue - client.outstanding_balance).toLocaleString()}</p>
            <p className="text-gray-300">Outstanding: ${client.outstanding_balance.toLocaleString()}</p>
          </Card>

          <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4 mb-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Project History</h3>
            <p className="text-gray-300">{client.projects} projects completed</p>
          </Card>

          <Card className="bg-white/[0.04] border-white/5 backdrop-blur-sm p-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">AI Summary</h3>
            <p className="text-gray-400 italic">"Client {client.name} contributes significantly to your revenue stream…"</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;