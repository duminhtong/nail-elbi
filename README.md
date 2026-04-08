# NAIL ELBI — Nail Art Catalogue & Course Platform

A complete Next.js 14 App Router project for NAIL ELBI, integrating a web catalogue, course information, and YouTube video gallery. Built with modern UI tools, including Tailwind CSS v3, Shadcn UI, Framer Motion, and powered by Supabase.

## ✨ Features

- **Mobile First Design**: Fully optimized for mobile with bottom navigation bar and touch interactions.
- **Dynamic Catalogue**: View nail art and student work with a Masonry layout and full-screen swipeable lightbox.
- **Course Information**: Full dynamic course pricing and requirements loading from the database.
- **YouTube Galleries**: Display free lessons and student interviews using YouTube thumbnails to drive subscription traffic.
- **Protected Admin Panel**: Secure `/admin` dashboard for uploading images and managing YouTube links and dynamic course info schemas. Built natively with Supabase Auth and Server actions/APIs.

## 🚀 Local Setup

### 1. Database & Supabase Prep
1. Create a Supabase project at [Supabase](https://supabase.com/).
2. In the SQL Editor, execute the `001_initial.sql` script (from `supabase/migrations/001_initial.sql`) to initialize the database schema and RLS policies.
3. In Supabase **Storage**, create a new public bucket called `nail-images`. Add CORS configuration to allow GET requests if necessary (usually default is fine for public buckets). Note: ensure MIME types (image/jpeg, png, etc.) are allowed up to 5MB.
4. Manually go to **Authentication** -> **Users** and create an admin user using an email and password. This will be your admin login.

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your variables inside `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: From Supabase -> Project Settings -> API (`URL`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: From Supabase -> Project Settings -> API (`anon` `public` key)
- `SUPABASE_SERVICE_ROLE_KEY`: From Supabase -> Project Settings -> API (`service_role` `secret` key) - **NEVER EXPOSE TO CLIENT**
- `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL`: Set to your YouTube Channel URL.

### 3. Install & Run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`. 
Admin dashboard is at `/admin/login`.

## 📦 Supabase Integration & Schema

The required schema is provided natively inside `supabase/migrations/001_initial.sql`.
Make sure you applied the migration, then you just log in through the Next.js app to start utilizing the application and filling with dynamic content.

## 🚀 Deployment (Vercel)
1. Push this codebase to a GitHub repository.
2. In Vercel, import the repository.
3. Add environment variables exactly as you added to `.env.local`.
4. Deploy!

## ⚙️ Workflow For Admins
- Use the **Admin panel** (`/admin/login`) to manage content. 
- You can upload new images to **Nail Menu** or **Student Works** using `multipart/form-data` natively parsed limits.
- Manage YouTube links (simply copy-paste the URL). Thumbnails will be auto-generated.
- Edit Pricing, Rules, and Benefits easily; Changes take place immediately without full redeployment.
