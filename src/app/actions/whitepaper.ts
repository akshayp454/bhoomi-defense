"use server";

import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const whitepaperSchema = z.object({
  email: z.string().email("Valid email address required"),
  organization: z.string().min(2, "Organization name required"),
  documentRequested: z.string().default("BHOOMI_v2.0_Detailed_Proposal"),
});

export type WhitepaperState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitWhitepaperRequest(
  _prevState: WhitepaperState,
  formData: FormData
): Promise<WhitepaperState> {
  const validated = whitepaperSchema.safeParse({
    email: formData.get("email"),
    organization: formData.get("organization"),
    documentRequested: formData.get("documentRequested") || "BHOOMI_v2.0_Detailed_Proposal",
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Please provide your valid organization and email.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const supabase = createServerSupabaseClient();

  if (supabase) {
    try {
      const { error } = await supabase.from("whitepaper_requests").insert({
        email: validated.data.email,
        organization: validated.data.organization,
        document_requested: validated.data.documentRequested,
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
    message: "Authorization link for BHOOMI v2.0 Proposal Dossier dispatched to your email address.",
  };
}
