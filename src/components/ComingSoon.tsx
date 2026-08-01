"use client";

import React from "react";

interface ComingSoonProps {
  title: string;
  description: string;
}

/**
 * Honest placeholder for admin sections that aren't built yet, so sidebar
 * nav never leads to a 404 or an empty page while a section is in progress.
 */
const ComingSoon = ({ title, description }: ComingSoonProps) => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </header>
      <div className="rounded-xl bg-white/[0.04] border border-white/5 p-10 text-center">
        <p className="text-gray-400">This section isn't built yet.</p>
        <p className="text-gray-600 text-sm mt-1">Check back once it's ready.</p>
      </div>
    </div>
  );
};

export default ComingSoon;
