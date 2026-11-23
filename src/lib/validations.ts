import { z } from "zod";

// Enquiry form schema
export const enquirySchema = z.object({
  buyerName: z.string().min(2, "Name must be at least 2 characters").max(100),
  businessName: z.string().max(200).optional(),
  phone: z
    .string()
    .min(10, "Enter valid phone number")
    .max(15)
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number"),
  whatsappNumber: z.string().max(15).optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  productId: z.number().optional(),
  productName: z.string().max(200).optional(),
  quantity: z.number().min(1, "Quantity must be at least 1").optional(),
  additionalRequirements: z.string().max(1000).optional(),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

// Buyer registration schema
export const buyerRegistrationSchema = z.object({
  name: z.string().min(2).max(100),
  businessName: z.string().max(200).optional(),
  phone: z.string().min(10).max(15),
  whatsappNumber: z.string().max(15).optional(),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  businessType: z.enum(["retailer", "wholesaler", "distributor", "other"]).optional(),
});

export type BuyerRegistrationFormData = z.infer<typeof buyerRegistrationSchema>;

// Admin login schema
export const adminLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

// Product schema (admin)
export const productSchema = z.object({
  name: z.string().min(2).max(200),
  categoryId: z.number({ message: "Category is required" }),
  brand: z.string().max(100).optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  availability: z.enum(["available", "enquiry_only", "unavailable"]),
  moq: z.number().min(1).default(1),
  indicativePrice: z.number().optional(),
  showPrice: z.boolean().default(false),
  status: z.enum(["published", "draft", "archived"]),
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

// Category schema (admin)
export const categorySchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  sortOrder: z.number().default(0),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
