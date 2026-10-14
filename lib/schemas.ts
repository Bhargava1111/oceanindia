import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Tell us your name"),
  phone: z.string().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  company: z.string().optional(),
  interest: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().max(2000).optional(),
  source: z.string().optional(),
  product: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const checkoutSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  email: z.string().email("Enter a valid email"),
  address1: z.string().min(5, "Enter your address"),
  address2: z.string().optional(),
  city: z.string().min(2, "Enter your city"),
  state: z.string().min(2, "Select your state"),
  pincode: z.string().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code"),
  gstin: z.string().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Enter a valid GSTIN").optional().or(z.literal("")),
  notes: z.string().max(500).optional(),
  payment: z.enum(["razorpay", "bank"]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
