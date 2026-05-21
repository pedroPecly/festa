"use server";

import { redirect } from "next/navigation";

import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function submitRsvp(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const normalizedEmail = email.toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const guestsRaw = Number(formData.get("guests") || 1);
  const attendance = String(formData.get("attendance") || "sim");
  const message = String(formData.get("message") || "").trim();

  if (!name || !normalizedEmail || !phone) {
    redirect("/?error=1#rsvp");
  }

  const sanitizedGuests = Number.isFinite(guestsRaw)
    ? Math.max(1, Math.floor(guestsRaw))
    : 1;
  const status = attendance === "nao" ? "nao" : "sim";
  const guests = status === "nao" ? 0 : sanitizedGuests;

  try {
    const supabase = getSupabaseAdmin();
    const payload = {
      name,
      email: normalizedEmail,
      phone,
      guests,
      attendance: status,
      message: message || null,
    };

    const { error } = await supabase
      .from("rsvps")
      .upsert(payload, { onConflict: "email" });

    if (error) {
      console.error("RSVP insert failed", error);
      redirect("/?error=1#rsvp");
    }
  } catch (error) {
    console.error("RSVP submit failed", error);
    redirect("/?error=1#rsvp");
  }

  redirect("/?sent=1#rsvp");
}
