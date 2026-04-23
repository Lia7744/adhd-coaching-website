"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ljenmhtlabxktxpirjqt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_oDgsVGPTjt0OXgvDSYggkQ_lZfrDItW";
const COACH_EMAIL = process.env.COACH_EMAIL || "hello@lianagroombridge.com";

export async function sendCoachMagicLink(email: string) {
  if (!email) return { success: false, error: "Please enter your email address." };

  // Only allow the coach email — hard gate on the server
  if (email.toLowerCase().trim() !== COACH_EMAIL.toLowerCase()) {
    return { success: false, error: "This portal is for coaches only." };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.auth.signInWithOtp({
    email: email.toLowerCase().trim(),
  });

  if (error) return { success: false, error: "Failed to send code: " + error.message };
  return { success: true };
}

export async function verifyCoachOtp(email: string, token: string) {
  if (!token) return { success: false, error: "Please enter your login code." };

  if (email.toLowerCase().trim() !== COACH_EMAIL.toLowerCase()) {
    return { success: false, error: "Unauthorized." };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const typesToTry = ["email", "magiclink", "signup"] as const;

  for (const type of typesToTry) {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.toLowerCase().trim(),
      token: token.trim(),
      type,
    });

    if (!error && data.session) {
      const cookieStore = await cookies();
      cookieStore.set("coach_portal_session", "verified", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return { success: true };
    }
  }

  return { success: false, error: "Invalid or expired code. Please try requesting a new one." };
}

export async function logoutCoach() {
  const cookieStore = await cookies();
  cookieStore.delete("coach_portal_session");
  return { success: true };
}

export async function getAllClients() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("clients")
    .select("id, slug, client_name, email, start_date, created_at")
    .order("created_at", { ascending: false });

  if (error) return { success: false, error: error.message, clients: [] };
  return { success: true, clients: data || [] };
}

export async function addClientAction(name: string, email: string) {
  if (!name || !email) return { success: false, error: "Name and email are required." };

  const supabase = createClient(supabaseUrl, supabaseKey);
  const slug =
    name.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-") +
    "-" +
    Math.floor(Math.random() * 9000 + 1000);

  const { error } = await supabase.from("clients").insert({
    slug,
    email: email.toLowerCase().trim(),
    client_name: name,
    client_initial: name.charAt(0).toUpperCase(),
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateClientAction(id: string, name: string, email: string) {
  if (!name || !email) return { success: false, error: "Name and email are required." };

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase
    .from("clients")
    .update({
      client_name: name,
      client_initial: name.charAt(0).toUpperCase(),
      email: email.toLowerCase().trim(),
    })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteClientAction(id: string) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
