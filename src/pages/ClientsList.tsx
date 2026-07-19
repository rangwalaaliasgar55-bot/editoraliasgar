"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  notes: string;
  payment_preference: "full" | "partial" | "installment";
  tags: string[];
  created_at: string;
  updated_at: string;
}

const ClientsList = () => {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 400));
        const mock: Client[] = [
          {
            id: "1", name: "Alex Rivera", company: "Rivera Productions",
            email: "alex@riveraproductions.com", phone: "+1 555 123 4567",
            whatsapp: "+1 555 123 4567", country: "USA", notes: "High-value",
            payment_preference: "full", tags: ["premium", "vip"],
            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
          },
          {
            id: "2", name: "Samira Khan", company: "Khan Creative",
            email: "samira@khancreative.com", phone: "+1 555 234 5678",
            whatsapp: "+1 555 234 5678", country: "Canada", notes: "New",
            payment_preference: "installment", tags: ["new"],
            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
          },
        ];
        setClients(mock);
      } catch (e) {
        setError("Failed to load clients");
        toast({ title: "Error", description: "Failed to load clients", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [toast]);

  const filtered = clients.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (tagFilter && !c.tags.includes(tagFilter)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0B0C0E] text-white items-center justify-center">
        <p className="text-gray-400">Loading clients…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#0B0C0E] text-white items-center justify-center">
        <div className="text-center">
          <p className="text-[#FF4D4D] mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold tracking-tight">Clients</h1>
            <Button onClick={() => navigate("/clients/new")} className="bg-[#2DD4BF] text-black hover:bg-[#2DD4BF]/80">
              <Plus size={18} className="mr-2" /> New Client
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-3 text-gray-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients…"
                className="pl-9 bg-white/[0.04] border-white/10 text-white"
              />
            </div>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-white/10 bg-white/[0.04] text-white"
            >
              <option value="">All Tags</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
              <option value="new">New</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.04] border border-white/5 rounded-xl">
              <p className="text-gray-400">No clients found.</p>
              <Button variant="ghost" onClick={() => navigate("/clients/new")} className="mt-2 text-[#2DD4BF]">
                Add your first client
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Company</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Country</TableHead>
                  <TableHead className="text-gray-400">Payment</TableHead>
                  <TableHead className="text-gray-400">Tags</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="border-white/5">
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-gray-300">{c.company}</TableCell>
                    <TableCell>
                      <a href={`mailto:${c.email}`} className="text-[#2DD4BF] hover:underline">{c.email}</a>
                    </TableCell>
                    <TableCell className="text-gray-300">{c.country}</TableCell>
                    <TableCell>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#2DD4BF]/20 text-[#2DD4BF]">
                        {c.payment_preference}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {c.tags.map((t) => <Badge key={t} variant="secondary" className="bg-white/5 text-gray-300">{t}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/clients/${c.id}`)}>
                          <Eye size={16} className="text-gray-400" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/clients/${c.id}/edit`)}>
                          <Pencil size={16} className="text-gray-400" />
                        </Button>
                      </div>
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

export default ClientsList;