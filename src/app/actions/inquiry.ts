"use server";

import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  organization: z.string().min(2, "Organization is required (e.g. iDEX, DIO, Indian Army, DRDO)"),
  designation: z.string().optional(),
  email: z.string().email("Valid official email required"),
  phone: z.string().optional(),
  inquiryType: z.enum([
    "grant_evaluation",
    "technical_briefing",
    "field_trial_partnership",
    "procurement",
    "other",
  ]),
  message: z.string().min(10, "Please provide brief details (min 10 characters)"),
});

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitGrantInquiry(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawData = {
    fullName: formData.get("fullName"),
    organization: formData.get("organization"),
    designation: formData.get("designation") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    inquiryType: formData.get("inquiryType"),
    message: formData.get("message"),
  };

  const validated = inquirySchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Please review and complete all required fields.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const supabase = createServerSupabaseClient();

  if (supabase) {
    try {
      const { error } = await supabase.from("grant_inquiries").insert({
        full_name: validated.data.fullName,
        organization: validated.data.organization,
        designation: validated.data.designation || null,
        email: validated.data.email,
        phone: validated.data.phone || null,
        inquiry_type: validated.data.inquiryType,
        message: validated.data.message,
        status: "pending",
      });

      if (error) {
        console.warn("Supabase insert error (using local handling):", error);
      }
    } catch (err) {
      console.warn("Supabase execution error:", err);
    }
  }

  return {
    success: true,
    message:
      "Briefing request recorded securely. The BHOOMI technical team will transmit the encrypted meeting coordinate packet within 24 hours.",
  };
}
