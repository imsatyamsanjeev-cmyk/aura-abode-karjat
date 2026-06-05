# Aura Abode Karjat - Luxury Villa Booking Website

A modern, high-performance, and visually premium direct-booking website built for **Aura Abode Karjat** using **Next.js** (App Router), **Prisma ORM**, and **TailwindCSS**. It includes an interactive reservation calendar, live pricing calculations, a direct Razorpay checkout flow, and an administrative channel manager (iCal Sync).

---

## 🌟 Production Readiness Status

The website is fully configured and ready to be delivered to your client:
* **No Dummy Text**: All placeholders ("Lorem Ipsum", TODOs, etc.) have been completely removed and replaced with actual description copies.
* **Official Contact Credentials**:
  * **Phone & WhatsApp**: `9867778833` (Redirections map to `919867778833`)
  * **Email Address**: `ditihospitality.india@gmail.com`
  * **Operations**: Configured under the **Diti Hospitality Team** for unified Razorpay onboarding.
* **Resilient Demo Mode**: If the database is disconnected during local preview, the application shifts to client-side `localStorage` state simulation to keep the calendar, settings, and checkout forms interactive.

---

## 🛠️ Step-by-Step Hosting & Deployment Guide

Follow these steps to host the website and connect it to a live database.

### Step 1: Create a PostgreSQL Database
The app requires a PostgreSQL database to persist reservations, manual calendar blocks, and external calendar feeds.
1. Sign up for a managed PostgreSQL provider (e.g., [Neon.tech](https://neon.tech), [Supabase](https://supabase.com), or [Render](https://render.com)).
2. Create a new database project.
3. Copy the database connection string. It will look like this:
   `postgresql://username:password@ep-cool-snowflake-123456.us-east-2.aws.neon.tech/aura_abode?sslmode=require`

### Step 2: Choose a Hosting Platform (Vercel is Recommended)
Since this is a Next.js application, hosting on **Vercel** is free, fast, and takes under 5 minutes.

1. **Push your code to GitHub**:
   * Create a private or public repository on GitHub.
   * Commit and push your local files to that repository.
2. **Import into Vercel**:
   * Go to [Vercel](https://vercel.com) and sign in using your GitHub account.
   * Click **Add New** > **Project** and select your repository.
3. **Configure Environment Variables**:
   Under the "Environment Variables" section in Vercel, copy and paste the following keys (based on [`.env.example`](file:///C:/Users/KIIT/.gemini/antigravity-ide/scratch/aura-abode-karjat/.env.example)):
   * `DATABASE_URL`: *Your PostgreSQL connection string (from Step 1)*
   * `JWT_SECRET`: *A secure random string of characters (e.g. `diti_aura_abode_secure_secret_hash_2026`)*
   * `ADMIN_USERNAME`: `admin` (or your client's custom admin username)
   * `ADMIN_PASSWORD`: *A secure password for the admin panel*
   * `NEXT_PUBLIC_RAZORPAY_KEY_ID`: *Your client's Razorpay Public Key ID*
   * `RAZORPAY_KEY_ID`: *Your client's Razorpay Public Key ID*
   * `RAZORPAY_KEY_SECRET`: *Your client's Razorpay Private Secret Key*
4. **Deploy**:
   * Click **Deploy**. Vercel will automatically build the site and provide a live URL (e.g., `https://aura-abode-karjat.vercel.app`).

### Step 3: Run Database Migrations
Once hosted, initialize the database tables using the command line:
```bash
# Push the schema definitions from prisma/schema.prisma to your database
npx prisma db push
```

---

## 🔑 Administrative Control Panel Guide

Your client (the host) can manage bookings, blocks, and channel synchronization via the admin console:

### 1. Log In
* Visit `/admin/login` on the live domain.
* Enter the `ADMIN_USERNAME` and `ADMIN_PASSWORD` defined in the environment variables (defaults to `admin` and `admin123` if none are set).

### 2. Configure Channel Sync (iCal Manager)
* Go to the channel sync section in the Admin Control Panel.
* **To Export Booking Calendar to OTA (Airbnb/Booking.com)**:
  * Copy the URL provided under the **iCal Export Feed** section (e.g., `https://auraabodekarjat.com/api/ical/export`).
  * Paste this link into Airbnb/Booking.com host settings under "Import Calendar".
* **To Import OTA bookings to your Site**:
  * Copy the export `.ics` link from Airbnb/Booking.com.
  * In the Aura Abode admin panel, under **Add iCal Feed**, specify the Platform Name (e.g., "Airbnb") and paste the link.
  * Save the channel.
  * The site will periodically fetch dates from Airbnb and block those dates on your direct-booking calendar.

### 3. Add Manual Blocks / Maintenance
* If the host wants to block dates manually (e.g., for personal use or repairs):
  * Select the date range in the Admin control panel under **Manual Blocks**.
  * Add a reason (e.g., "Personal Stay" or "Maintenance") and click **Block**.
  * Guests on the homepage will immediately see these dates grayed-out and unclickable.
