"use server";

import { z } from "zod";

// ─── Validation Schema ─────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  goal: z.string().min(1, "Please select a fitness goal"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Google Sheets Integration ─────────────────────────────────
// Replace GOOGLE_SHEET_SCRIPT_URL in .env.local with your Apps Script Web App URL
// How to set up:
//  1. Open Google Sheets → Extensions → Apps Script
//  2. Paste the doPost script (see README.md)
//  3. Deploy as Web App (execute as Me, anyone can access)
//  4. Copy the Web App URL into .env.local as GOOGLE_SHEET_SCRIPT_URL

async function saveToGoogleSheets(data: ContactFormData) {
  const scriptUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn("GOOGLE_SHEET_SCRIPT_URL not configured. Skipping Sheets save.");
    return;
  }

  const payload = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    goal: data.goal,
    message: data.message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Sheets API error: ${response.status}`);
    }
  } catch (error) {
    // Log but don't throw — form submission should still succeed
    console.error("Failed to save to Google Sheets:", error);
  }
}

// ─── Main Server Action ────────────────────────────────────────
export async function submitContactForm(
  prevState: { success: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  // Extract & validate
  const raw = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    goal: formData.get("goal") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Validation failed",
    };
  }

  // Save to Google Sheets (non-blocking on error)
  await saveToGoogleSheets(parsed.data);

  return { success: true };
}
