# PLAYLUME — B2B Wholesale Trading & Distribution Platform

> **Positioning:** Multi-category wholesale trading and distribution company connecting manufacturers, retailers, wholesalers, and distributors across India.

---

## 🌟 Product Categories Supported
- 🧸 **Toys & Games**
- 👕 **Clothing**
- ⌚ **Watches**
- 📱 **Electronics**
- 🏠 **Home & Kitchen**
- ✏️ **Stationery**
- *...easily expandable dynamically via the admin panel!*

---

## 🏗️ Architecture & Technology Stack
- **Frontend & App Framework:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **UI Components:** Lucide Icons + Radix UI primitives + Responsive design
- **Database ORM:** Drizzle ORM + MySQL
- **Form Validation:** React Hook Form + Zod
- **Image Storage:** Cloudinary
- **Communication:** Sticky & Inline WhatsApp Click-to-Chat integration
- **SEO & Tracking:** Dynamic `sitemap.xml`, `robots.ts`, OpenGraph metadata, Meta Pixel & GA4 readiness
- **Admin Security:** Route protection middleware + secure HTTP security headers

---

## 🌿 Git Branches & Environments
- **`dev`**: Active development branch. (Start here tomorrow)
- **`stage`**: Staging & pre-production testing environment.
- **`main`**: Production release branch.

---

## 📂 Project Structure
```text
playlume/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage (Hero, Trust indicators, Categories, CTA, Footer)
│   │   ├── layout.tsx             # Root Layout with SEO metadata & Geist fonts
│   │   ├── products/page.tsx      # All Products catalogue with sidebar category & availability filters
│   │   ├── enquiry/page.tsx       # Bulk Wholesale Enquiry form with Zod validation
│   │   ├── become-a-buyer/page.tsx# Buyer registration page
│   │   ├── about/page.tsx         # Company positioning & credibility page
│   │   ├── contact/page.tsx       # Contact details, business hours & WhatsApp
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Admin sidebar & header navigation
│   │   │   ├── page.tsx           # Admin dashboard overview & stats
│   │   │   ├── products/page.tsx  # Product management
│   │   │   └── enquiries/page.tsx # Enquiries CRM management
│   │   ├── api/
│   │   │   ├── enquiries/route.ts # REST API for submitting & listing bulk enquiries
│   │   │   └── products/route.ts  # REST API for products with filtering
│   │   ├── sitemap.ts             # Auto-generated XML sitemap
│   │   └── robots.ts              # Search engine robots configuration
│   ├── lib/
│   │   ├── constants.ts           # Business info, categories, Indian states, status colors
│   │   ├── utils.ts               # Price formatting (INR), slugify, WhatsApp link generator
│   │   ├── validations.ts         # Zod schemas for enquiries, buyers, products, login
│   │   └── db/
│   │       ├── schema.ts          # Complete Drizzle MySQL schema (10 tables + relations)
│   │       └── index.ts           # MySQL connection pool
│   └── middleware.ts              # Admin route protection
├── drizzle.config.ts              # Drizzle ORM configuration
├── next.config.ts                 # Next.js config with security headers & Cloudinary
├── .env.example                   # Environment configuration template
└── package.json                   # Dependencies
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local` and add your database and API credentials:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin portal.

### 4. Build for Production
```bash
npm run build
```
*(Verified: Compiles successfully with 0 errors)*
