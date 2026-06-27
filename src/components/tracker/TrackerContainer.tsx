"use client";

import { useState, useRef, useEffect } from "react";
import { loadClientData, saveClientData } from "@/app/tracker/actions";
import TrackerApp from "./TrackerApp";

export default function TrackerContainer({ slug }: { slug: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSaving = useRef(false);
  const lastEdited = useRef<number>(0);
  const dataRef = useRef<any>(null); // Keep a ref to the latest data for comparison

  // Update ref whenever state changes
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Load data once on mount via secure server action
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const fetchInitial = async () => {
      const result = await loadClientData(slug);
      if (cancelled) return;

      if (!result.success && result.error === "Unauthorized") {
        setSessionExpired(true);
        setLoading(false);
        return;
      }

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to load client data.");
      }
      setLoading(false);
    };

    fetchInitial();

    // 5-second background polling
    const pollTimer = setInterval(async () => {
      if (isSaving.current) return; // Don't poll while saving
      
      // If the user typed something in the last 4 seconds, skip this poll to prevent overwriting their work
      if (Date.now() - lastEdited.current < 4000) return;

      const result = await loadClientData(slug);
      if (cancelled) return;
      
      // Post-fetch check: if the user edited something while the fetch was in flight, discard the stale server data
      if (Date.now() - lastEdited.current < 4000) return;
      
      if (!result.success && result.error === "Unauthorized") {
        setSessionExpired(true);
        return;
      }

      if (result.success && result.data) {
        // Only update React state if the data actually changed (prevents React re-renders/flashing)
        if (JSON.stringify(result.data) !== JSON.stringify(dataRef.current)) {
           setData(result.data);
        }
      }
    }, 5000);

    return () => { 
      cancelled = true; 
      clearInterval(pollTimer);
    };
  }, [slug]);

  // Called by TrackerApp on every change — updates UI instantly, debounces the save
  const handleUpdate = (newData: any) => {
    lastEdited.current = Date.now();
    setData(newData);

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      isSaving.current = true;
      try {
        const result = await saveClientData(slug, newData);
        if (!result.success && result.error === "Unauthorized") {
          setSessionExpired(true);
        }
      } finally {
        isSaving.current = false;
        saveTimer.current = null;
      }
    }, 1500);
  };

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
    <div className="w-full h-full bg-[#FAF9F6] border-none rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] overflow-hidden relative">
      {sessionExpired && (
        <div className="fixed inset-0 z-[9999] bg-white/80 flex items-center justify-center p-6 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
             <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Session Expired</h2>
             <button onClick={() => window.location.reload()} className="bg-brand-sage text-white font-bold rounded-xl px-6 py-3 w-full hover:brightness-90 transition-colors">
               Sign In
             </button>
           </div>
        </div>
      )}
      <TrackerApp data={data} onUpdate={handleUpdate} />
    </div>
  );
}
