import { cookies } from "next/headers";
import Image from "next/image";
import { Lock } from "lucide-react";

import PortalLogin from "@/components/tracker/PortalLogin";
import TrackerContainer from "@/components/tracker/TrackerContainer";
import { logoutClientPortal } from "@/app/tracker/actions";

export default async function TrackerPage() {
  const cookieStore = await cookies();
  const sessionSlug = cookieStore.get("client_portal_session")?.value;
  const isLoggedIn = !!sessionSlug;

  return (
    <div className="min-h-screen bg-white selection:bg-brand-sage/30 flex flex-col">


      {/* ═══ PORTAL / LOGIN CONTENT ═══ */}
      <main className="flex-1 pt-16 w-full flex flex-col items-center">
        {!isLoggedIn ? (
          <PortalLogin />
        ) : (
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col">
            <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
              <p className="text-brand-warm-gray font-medium">Logged in securely.</p>
              <form action={logoutClientPortal}>
                <button 
                  type="submit"
                  className="text-sm font-bold text-brand-sage hover:text-brand-charcoal transition-colors px-4 py-2 bg-brand-cream rounded-full border border-brand-border"
                >
                  Sign out
                </button>
              </form>
            </div>
            
            {/* Embedded Native Tracker App - No iframe needed! */}
            <TrackerContainer slug={sessionSlug} />
          </div>
        )}
      </main>
    </div>
  );
}
