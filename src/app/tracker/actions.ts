"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Generate OTP using Supabase's native auth
export async function sendMagicLink(email: string) {
  if (!email) return { success: false, error: "Please enter your email address." };

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 1. Verify that the email actually belongs to an active client
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("slug, client_name")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (clientError || !client) {
    return { success: false, error: "No client found with this email. Please check the spelling or ask your coach." };
  }

  // 2. Trigger OTP — shouldCreateUser:false ensures it's a LOGIN flow, not a signup flow
  const { error } = await supabase.auth.signInWithOtp({
    email: email.toLowerCase().trim(),
    options: {
      shouldCreateUser: false, // Only allow existing auth users, not new signups
    },
  });

  if (error) {
    // If user doesn't exist in Supabase Auth yet, create them first then send OTP
    if (error.message.includes("Signups not allowed")) {
      // Admin-create the Auth user first using service role isn't available here,
      // so we allow user creation on first login only
      const { error: signupError } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase().trim(),
      });
      if (signupError) {
        return { success: false, error: "Failed to send code: " + signupError.message };
      }
    } else {
      return { success: false, error: "Failed to send code: " + error.message };
    }
  }

  return { success: true };
}

// Verify the OTP code — try both 'email' and 'magiclink' types
export async function verifyOtpCode(email: string, token: string) {
  if (!token) return { success: false, error: "Please enter the 6-digit code." };

  const supabase = createClient(supabaseUrl, supabaseKey);
  const cleanEmail = email.toLowerCase().trim();
  const cleanToken = token.trim();

  // Try 'email' type first, then fall back to 'magiclink' and 'signup'
  const typesToTry = ['email', 'magiclink', 'signup'] as const;
  let lastError = "";

  for (const type of typesToTry) {
    const { data: authData, error: authError } = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanToken,
      type,
    });

    if (!authError && authData.session) {
      // Verified! Now find the client record to get their slug
      const { data: client, error: clientErr } = await supabase
        .from("clients")
        .select("slug")
        .eq("email", cleanEmail)
        .single();

      if (clientErr || !client) {
        return { success: false, error: "Client record not found. Please contact your coach." };
      }

      // Set a secure server-side cookie for the session
      const cookieStore = await cookies();
      cookieStore.set("client_portal_session", client.slug, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return { success: true };
    }

    lastError = authError?.message || "Unknown error";
  }

  return { success: false, error: `Invalid or expired code (${lastError}). Please request a new one.` };
}

export async function logoutClientPortal() {
  const cookieStore = await cookies();
  cookieStore.delete("client_portal_session");
}

// ─── SECURE DATA ACTIONS ──────────────────────────────────────────────────────
// All Supabase reads/writes for tracker data go through these server actions.
// The browser NEVER talks to Supabase directly — it calls these functions,
// which verify the session cookie before doing anything.

export async function loadClientData(slug: string) {
  // Verify the request comes from an authenticated session
  const cookieStore = await cookies();
  const sessionSlug = cookieStore.get("client_portal_session")?.value;
  const coachSession = cookieStore.get("coach_portal_session")?.value;

  // Allow access if: logged-in client owns this slug, OR coach is logged in
  if (sessionSlug !== slug && coachSession !== "verified") {
    return { success: false, error: "Unauthorized" };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .select("*")
    .eq("slug", slug)
    .single();

  if (clientErr || !client) {
    return { success: false, error: "Client not found" };
  }

  const [goalsRes, strengthsRes, strategiesRes, sessionsRes] = await Promise.all([
    supabase.from("goals").select("*").eq("client_id", client.id).order("sort_order"),
    supabase.from("strengths").select("*").eq("client_id", client.id).order("sort_order"),
    supabase.from("strategies").select("*").eq("client_id", client.id).order("sort_order"),
    supabase.from("sessions").select("*").eq("client_id", client.id).order("sort_order", { ascending: false }),
  ]);

  const goalIds = (goalsRes.data || []).map((g: any) => g.id);
  let actionsData: any[] = [];
  if (goalIds.length > 0) {
    const { data: actions } = await supabase
      .from("actions")
      .select("*")
      .in("goal_id", goalIds)
      .order("sort_order");
    actionsData = actions || [];
  }

  const goals = (goalsRes.data || []).map((goal: any) => ({
    ...goal,
    completed: goal.completed || false,
    actions: actionsData
      .filter((a: any) => a.goal_id === goal.id)
      .map((a: any) => ({
        id: a.id,
        text: a.text || "",
        done: a.done || false,
        dueDate: a.due_date || "",
        status: a.status || "todo",
      })),
  }));

  return {
    success: true,
    data: {
      clientId: client.id,
      clientName: client.client_name || "",
      clientInitial: client.client_initial || "",
      avatarSymbol: client.avatar_symbol || "",
      showSymbolPicker: false,
      startDate: client.start_date || "",
      northStar: client.north_star || "",
      goals,
      strengths: (strengthsRes.data || []).map((s: any) => ({ id: s.id, text: s.text || "" })),
      strategies: (strategiesRes.data || []).map((s: any) => ({ id: s.id, text: s.text || "" })),
      sessions: (sessionsRes.data || []).map((s: any) => ({
        id: s.id,
        date: s.date || "",
        title: s.title || "",
        takeaways: s.takeaways || "",
        nextSteps: s.next_steps || "",
      })),
    },
  };
}

export async function saveClientData(slug: string, currentData: any) {
  // Same auth gate — must be the owning client OR the coach
  const cookieStore = await cookies();
  const sessionSlug = cookieStore.get("client_portal_session")?.value;
  const coachSession = cookieStore.get("coach_portal_session")?.value;

  if (sessionSlug !== slug && coachSession !== "verified") {
    return { success: false, error: "Unauthorized" };
  }

  if (!currentData?.clientId) return { success: false, error: "No client ID" };

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Update client record
    await supabase.from("clients").update({
      client_name: currentData.clientName,
      client_initial: currentData.clientInitial,
      avatar_symbol: currentData.avatarSymbol,
      start_date: currentData.startDate,
      north_star: currentData.northStar,
    }).eq("id", currentData.clientId);

    // Goals: delete removed ones, upsert remaining
    const existingGoalIds = currentData.goals
      .filter((g: any) => typeof g.id === "string" && g.id.includes("-"))
      .map((g: any) => g.id);

    if (existingGoalIds.length > 0) {
      await supabase.from("goals").delete()
        .eq("client_id", currentData.clientId)
        .not("id", "in", `(${existingGoalIds.join(",")})`);
    } else {
      await supabase.from("goals").delete().eq("client_id", currentData.clientId);
    }

    for (let i = 0; i < currentData.goals.length; i++) {
      const goal = currentData.goals[i];
      const isNew = typeof goal.id === "number";
      let goalId: string;

      if (isNew) {
        const { data: inserted } = await supabase.from("goals").insert({
          client_id: currentData.clientId,
          title: goal.title || "",
          why: goal.why || "",
          challenges: goal.challenges || "",
          notes: goal.notes || "",
          completed: goal.completed || false,
          sort_order: i,
        }).select("id").single();
        goalId = (inserted as any).id;
        goal.id = goalId;
      } else {
        goalId = goal.id;
        await supabase.from("goals").update({
          title: goal.title || "",
          why: goal.why || "",
          challenges: goal.challenges || "",
          notes: goal.notes || "",
          completed: goal.completed || false,
          sort_order: i,
        }).eq("id", goalId);
      }

      // Replace all actions for this goal
      await supabase.from("actions").delete().eq("goal_id", goalId);
      if (goal.actions.length > 0) {
        await supabase.from("actions").insert(
          goal.actions.map((a: any, j: number) => ({
            goal_id: goalId,
            text: a.text || "",
            done: a.done || false,
            due_date: a.dueDate || "",
            status: a.status || "todo",
            sort_order: j,
          }))
        );
      }
    }

    // Replace strengths
    await supabase.from("strengths").delete().eq("client_id", currentData.clientId);
    if (currentData.strengths.length > 0) {
      await supabase.from("strengths").insert(
        currentData.strengths.map((s: any, i: number) => ({
          client_id: currentData.clientId,
          text: s.text || "",
          sort_order: i,
        }))
      );
    }

    // Replace strategies
    await supabase.from("strategies").delete().eq("client_id", currentData.clientId);
    if (currentData.strategies.length > 0) {
      await supabase.from("strategies").insert(
        currentData.strategies.map((s: any, i: number) => ({
          client_id: currentData.clientId,
          text: s.text || "",
          sort_order: i,
        }))
      );
    }

    // Replace sessions
    await supabase.from("sessions").delete().eq("client_id", currentData.clientId);
    if (currentData.sessions.length > 0) {
      await supabase.from("sessions").insert(
        currentData.sessions.map((s: any, i: number) => ({
          client_id: currentData.clientId,
          date: s.date || "",
          title: s.title || "",
          takeaways: s.takeaways || "",
          next_steps: s.nextSteps || "",
          sort_order: i,
        }))
      );
    }

    return { success: true };
  } catch (err: any) {
    console.error("saveClientData error:", err);
    return { success: false, error: err.message };
  }
}
