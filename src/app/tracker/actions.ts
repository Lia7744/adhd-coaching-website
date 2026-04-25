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

