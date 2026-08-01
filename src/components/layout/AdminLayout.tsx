"use client";

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { MadeWithDyad } from "@/components/made-with-dyad";

/**
 * Shared shell for every admin-facing page: sidebar nav + topbar + content
 * area. Individual pages should render only their own content and rely on
 * this layout for navigation chrome, so nav is never lost mid-app.
 */
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default AdminLayout;
