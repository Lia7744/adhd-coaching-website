import { cookies } from "next/headers";
import CoachLogin from "@/components/coach/CoachLogin";
import CoachDashboard from "@/components/coach/CoachDashboard";
import { getAllClients } from "@/app/coachlg/actions";

export const metadata = {
  robots: "noindex, nofollow",
};

export default async function CoachPage() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("coach_portal_session")?.value === "verified";

  if (!isLoggedIn) {
    return <CoachLogin />;
  }

  const { clients } = await getAllClients();

  return <CoachDashboard initialClients={clients as any} />;
}
