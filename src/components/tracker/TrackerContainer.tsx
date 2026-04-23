"use client";

import { useClientData } from "@/hooks/useClientData";
import TrackerApp from "./TrackerApp";

export default function TrackerContainer({ slug }: { slug: string }) {
  const { data, loading, error, updateData } = useClientData(slug);

  if (loading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-12 mt-10 min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-sage mb-4" />
        <p className="text-brand-warm-gray font-medium">Loading your dashboard securely...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center p-12 mt-10 min-h-[50vh]">
        <p className="text-[#D25D48] font-bold text-lg mb-2">Error loading dashboard.</p>
        <p className="text-brand-warm-gray">{error || "Client data not found."}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#FAF9F6] border-none rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] overflow-hidden">
      <TrackerApp data={data} onUpdate={updateData} />
    </div>
  );
}
