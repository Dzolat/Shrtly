# Shrtly - the simplest link shortener

#### Video Demo: https://youtu.be/5XP4OWm2nDY

## Description

Shrtly is a web application that turns long URLs into shorter links that are easier to share. It is built with Next.js, React, TypeScript, and PostgreSQL hosted on Neon. Users can generate a random link or choose a custom slug, revisit links through browser history, and view a QR code and basic click statistics.

I wanted the design to be minimal, lightweight, and easy to understand. The home page presents the main actions directly: shorten a URL, create a custom link, or open an existing link's management page. Building this application brings together web forms, HTTP requests, input validation, SQL queries, persistent storage, and client-side state.

## Using Shrtly

Enter an absolute URL, such as `https://cs50.harvard.edu/x/project/`, into either shortening form. The standard form generates a six-character slug containing uppercase letters, lowercase letters,    and digits. The custom form lets you choose something recognizable, such as `learning`. Leaving the custom slug blank also generates a random slug.

After successful creation, the application opens `/manage/[slug]`. This page displays the destination, the complete short link, a copy button, a QR code, and statistics: total clicks, creation time, and last visit. Long destination URLs are shortened visually for display; the database keeps the complete destination. Visiting `/s/learning`, for example, redirects to the stored URL and increments its click count.

The history panel links to previously created links' management pages. History is stored in the current browser's `localStorage`, while the actual URL mappings and statistics live in PostgreSQL. Clearing browser storage removes the local history, but does not delete the links from the database. A separate form opens a management page when you already know the slug.

## How it works and design choices

Both shortening forms send `FormData` to `POST /api/shorten`. The server validates the destination and optional custom slug, checks availability, and inserts the mapping into the database. A successful response contains `shortUrl` and `longUrl`; the browser then saves a history entry and navigates to the management page. Failed responses show an inline error without adding a history entry or navigating away.

Validation happens on the server so it also applies to requests made outside the interface. Destinations must be valid HTTP or HTTPS URLs. Custom slugs must contain 1–32 letters, digits, underscores, or hyphens. An occupied custom slug produces HTTP 409. Random generation tries up to ten candidates before returning HTTP 503. Other invalid input produces HTTP 400, and unexpected server failures produce HTTP 500.

The database's unique constraint provides a second check against duplicate slugs. SQL queries use the Neon driver's parameterized template syntax, keeping supplied values separate from SQL commands. The availability check and insertion are separate operations, so a simultaneous collision can still produce a generic server error.

Next.js keeps the interface and server routes in one application. Interactive forms and clipboard access use client components; the management page retrieves data on the server. PostgreSQL stores shared link data, and browser storage provides a simple history without accounts. Tailwind CSS styles the interface, and an external QR service generates images from the short link.

## Database

`schema/migration.db` contains SQL, despite its filename. Run it against a new PostgreSQL database to create this table:

```sql
CREATE TABLE links (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    short_url TEXT NOT NULL UNIQUE,
    long_url TEXT NOT NULL,
    clicks INTEGER NOT NULL DEFAULT 0,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_visited TIMESTAMPTZ
);
```

`id` identifies each record. `short_url` stores the slug, and `long_url` stores its destination. New links start with zero clicks and a creation timestamp. `last_visited` remains null until a redirect request updates it. The click counter measures redirect requests rather than unique visitors.

## Project files

| File | Purpose |
| --- | --- |
| `app/page.tsx` | Home page, form layout, and loading local history. |
| `app/layout.tsx`, `app/globals.css` | Shared page layout, metadata, fonts, and global styles. |
| `app/api/shorten/route.ts` | Creation endpoint, validation, slug selection, and JSON responses. |
| `app/s/[slug]/route.ts` | Destination lookup, click update, and redirect; unknown slugs return not found. |
| `app/manage/[slug]/page.tsx` | Loads a link for display; unknown slugs return to the home page. |
| `app/manage/route.ts` | Redirects the bare `/manage` route home. |
| `components/InputForm.tsx`, `components/CustomInputForm.tsx` | Submission, inline errors, history storage, and navigation. |
| `components/ManageForm.tsx`, `components/History.tsx` | Slug lookup form and history navigation. |
| `components/Output.tsx`, `components/CopyButton.tsx` | Link details, QR image, statistics, and clipboard interaction. |
| `components/Items/*`, `components/ui/alert.tsx` | Shared inputs, buttons, and an available alert component. |
| `lib/db.ts`, `lib/func.ts`, `lib/utils.ts` | Database operations, random slug generation, availability checks, and a CSS class helper. |
| `schema/migration.db` | Database creation SQL. |
| `next.config.ts` | Permits images from the QR service. |
| `package.json`, `package-lock.json` | Dependencies, npm commands, and locked versions. |
| `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json` | TypeScript, linting, CSS, and UI tooling configuration. |

## Running locally

Use Node.js 20.9 or newer and npm. Create a Neon PostgreSQL database and execute `schema/migration.db` in its SQL editor. In the project root, create `.env.local` with your database connection string:

```env
DATABASE_URL="your_neon_postgresql_connection_string"
```

Install the dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. The database and QR service require network access, and Next.js fetches the configured Google Fonts during builds. `.env.local` is ignored by Git; keep the connection string private.

`npm run lint` runs ESLint. For a production build, run `npm run build`, followed by `npm start` after a successful build.

## Limitations and future improvements

There are no user accounts, ownership checks, editing, deletion, or expiration. Anyone who knows a slug can view its management page and statistics. History does not synchronize between devices. QR images depend on an external service, and its requests include the short URL. URL validation checks syntax and protocol; it does not confirm that a destination is available or trustworthy.

Possible improvements include link expiration, authenticated management, better mobile layouts, and more detailed analytics. These are future ideas, rather than features of the current version.

## AI usage

The original project disclosure records AI assistance with the design of `Output.tsx`, `InputForm.tsx`, `CustomInputForm.tsx`, and `/manage/[slug]`, and states that backend functionality, API routes, library code, and SQL were written without AI assistance. AI also helped expand and edit this README.