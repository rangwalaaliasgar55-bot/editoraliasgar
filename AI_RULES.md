# Freelance Video Editor — Business Dashboard

## Tech Stack
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + Shadcn/UI + Framer Motion
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Data/state:** TanStack Query (server state) + Zustand (UI state)
- **Backend:** Supabase — Postgres, Auth, Row Level Security, Edge Functions
- **ORM:** Drizzle ORM
- **AI:** OpenRouter API
- **Email:** Resend

## Conventions
- Production-ready, reusable components.
- Modular/scalable folder structure.
- Real loading, empty, and error states.
- All financial numbers are computed via deterministic queries; the AI only narrates.

## Data Model
- **clients**: id, name, company, email, whatsapp, phone, country, notes, payment_preference, tags (text[]), created_at, updated_at
- **projects**: id, client_id (FK), name, type (enum: youtube/reel/shorts/documentary/ad/podcast/motion_graphics/wedding/corporate), status (enum: inquiry/negotiation/editing/revision/delivered/waiting_payment/paid/cancelled), start_date, due_date, delivery_date, amount, advance_paid, editing_hours, notes, drive_link, assets_link, created_at, updated_at
- **invoices**: id, invoice_number (auto-sequenced), client_id (FK), project_id (FK, nullable), issue_date, due_date, amount, gst_percent, discount, notes, status (enum: draft/sent/viewed/paid/partially_paid/overdue), created_at
- **payments**: id, invoice_id (FK), amount, paid_date, method, status (enum: paid/pending/partial/overdue)
- **expenses**: id, category, description, amount, date, is_recurring (bool), created_at
- **ai_messages**: id, role (user/assistant), content, created_at
- **settings**: singleton row: currency, default_tax_percent, theme, openrouter_api_key, resend_api_key, preferred_model, notification_prefs (jsonb)

## Design System
- **Palette:** 
  - Background: `#0B0C0E` (near-black charcoal)
  - Surface/Card: `rgba(255,255,255,0.04)` with backdrop-blur and `1px rgba(255,255,255,0.08)` border.
  - Primary Accent: `#2DD4BF` (waveform-teal)
  - Danger: `#FF4D4D` (overdue/danger)
- **Type:** 
  - Sans: Geometric sans (Geist/General Sans)
  - Monospace: Geist Mono / JetBrains Mono (for all currency/stats, tabular numerals)
- **Signature Element:** Project status pipeline rendered as a horizontal scrubber/timeline with a playhead (video editing style).
- **Restraint:** Glass treatment on primary surfaces only (stat cards, AI panel). Sidebar and table rows remain flat.

## AI Assistant Accuracy Rule
Every number reported by the AI must come from a deterministic query. The LLM narrates and recommends; it never calculates totals.