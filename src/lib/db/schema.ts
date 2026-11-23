import {
  mysqlTable,
  varchar,
  text,
  int,
  decimal,
  boolean,
  timestamp,
  mysqlEnum,
  json,
  serial,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// ============================================================
// CATEGORIES
// ============================================================
export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  imageUrl: varchar("image_url", { length: 500 }),
  status: mysqlEnum("status", ["active", "inactive"]).default("active").notNull(),
  sortOrder: int("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// PRODUCTS
// ============================================================
export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  sku: varchar("sku", { length: 50 }),
  categoryId: int("category_id").notNull(),
  brand: varchar("brand", { length: 100 }),
  description: text("description"),
  shortDescription: varchar("short_description", { length: 500 }),
  // Availability: available | enquiry_only | unavailable
  availability: mysqlEnum("availability", ["available", "enquiry_only", "unavailable"])
    .default("enquiry_only")
    .notNull(),
  moq: int("moq").default(1), // Minimum Order Quantity
  // Pricing
  indicativePrice: decimal("indicative_price", { precision: 10, scale: 2 }),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }), // PRIVATE — admin only
  showPrice: boolean("show_price").default(false), // Whether to show price publicly
  // Status & Flags
  status: mysqlEnum("status", ["published", "draft", "archived"]).default("draft").notNull(),
  isFeatured: boolean("is_featured").default(false),
  isTrending: boolean("is_trending").default(false),
  // Specifications (flexible JSON)
  specifications: json("specifications"),
  tags: json("tags"),
  // SEO
  metaTitle: varchar("meta_title", { length: 200 }),
  metaDescription: varchar("meta_description", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// PRODUCT IMAGES
// ============================================================
export const productImages = mysqlTable("product_images", {
  id: serial("id").primaryKey(),
  productId: int("product_id").notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  publicId: varchar("public_id", { length: 200 }), // Cloudinary public ID
  altText: varchar("alt_text", { length: 200 }),
  position: int("position").default(0),
  isPrimary: boolean("is_primary").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// PRODUCT VARIANTS (size, color, model etc.)
// ============================================================
export const productVariants = mysqlTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: int("product_id").notNull(),
  variantName: varchar("variant_name", { length: 100 }).notNull(), // e.g. "Color"
  variantValue: varchar("variant_value", { length: 100 }).notNull(), // e.g. "Red"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// BUYERS (registered wholesale buyers)
// ============================================================
export const buyers = mysqlTable("buyers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  businessName: varchar("business_name", { length: 200 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  email: varchar("email", { length: 150 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  businessType: mysqlEnum("business_type", ["retailer", "wholesaler", "distributor", "other"]),
  notes: text("notes"),
  status: mysqlEnum("status", ["active", "inactive", "blocked"]).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// ENQUIRIES
// ============================================================
export const enquiries = mysqlTable("enquiries", {
  id: serial("id").primaryKey(),
  // Buyer info (may or may not be a registered buyer)
  buyerId: int("buyer_id"),
  buyerName: varchar("buyer_name", { length: 100 }).notNull(),
  businessName: varchar("business_name", { length: 200 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }),
  email: varchar("email", { length: 150 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  // Product details
  productId: int("product_id"),
  productName: varchar("product_name", { length: 200 }), // Snapshot
  quantity: int("quantity"),
  additionalRequirements: text("additional_requirements"),
  // Status tracking (CRM)
  status: mysqlEnum("status", [
    "new",
    "contacted",
    "quotation_sent",
    "negotiation",
    "confirmed",
    "completed",
    "cancelled",
  ])
    .default("new")
    .notNull(),
  adminNotes: text("admin_notes"),
  source: varchar("source", { length: 50 }).default("website"), // website | whatsapp | phone
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// QUOTATIONS
// ============================================================
export const quotations = mysqlTable("quotations", {
  id: serial("id").primaryKey(),
  quotationNumber: varchar("quotation_number", { length: 30 }).notNull().unique(),
  enquiryId: int("enquiry_id"),
  buyerId: int("buyer_id"),
  buyerName: varchar("buyer_name", { length: 100 }).notNull(),
  buyerPhone: varchar("buyer_phone", { length: 20 }),
  buyerEmail: varchar("buyer_email", { length: 150 }),
  // Totals
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }),
  gstAmount: decimal("gst_amount", { precision: 12, scale: 2 }),
  transportationCharges: decimal("transportation_charges", { precision: 10, scale: 2 }),
  totalAmount: decimal("total_amount", { precision: 12, scale: 2 }),
  // Meta
  validityDate: timestamp("validity_date"),
  notes: text("notes"),
  terms: text("terms"),
  status: mysqlEnum("status", ["draft", "sent", "accepted", "rejected", "expired"])
    .default("draft")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// QUOTATION ITEMS
// ============================================================
export const quotationItems = mysqlTable("quotation_items", {
  id: serial("id").primaryKey(),
  quotationId: int("quotation_id").notNull(),
  productId: int("product_id"),
  productName: varchar("product_name", { length: 200 }).notNull(),
  sku: varchar("sku", { length: 50 }),
  quantity: int("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 12, scale: 2 }).notNull(),
  notes: varchar("notes", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================================
// BANNERS
// ============================================================
export const banners = mysqlTable("banners", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  mobileImageUrl: varchar("mobile_image_url", { length: 500 }),
  linkUrl: varchar("link_url", { length: 500 }),
  linkText: varchar("link_text", { length: 100 }),
  position: mysqlEnum("position", ["hero", "category", "promotional"]).default("hero"),
  status: mysqlEnum("status", ["active", "inactive"]).default("active").notNull(),
  sortOrder: int("sort_order").default(0),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// ADMINS
// ============================================================
export const admins = mysqlTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }),
  role: mysqlEnum("role", ["super_admin", "admin", "manager"]).default("admin").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================
// RELATIONS
// ============================================================
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  variants: many(productVariants),
  enquiries: many(enquiries),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const enquiriesRelations = relations(enquiries, ({ one }) => ({
  product: one(products, {
    fields: [enquiries.productId],
    references: [products.id],
  }),
  buyer: one(buyers, {
    fields: [enquiries.buyerId],
    references: [buyers.id],
  }),
}));

export const quotationsRelations = relations(quotations, ({ one, many }) => ({
  enquiry: one(enquiries, {
    fields: [quotations.enquiryId],
    references: [enquiries.id],
  }),
  buyer: one(buyers, {
    fields: [quotations.buyerId],
    references: [buyers.id],
  }),
  items: many(quotationItems),
}));

export const quotationItemsRelations = relations(quotationItems, ({ one }) => ({
  quotation: one(quotations, {
    fields: [quotationItems.quotationId],
    references: [quotations.id],
  }),
  product: one(products, {
    fields: [quotationItems.productId],
    references: [products.id],
  }),
}));
