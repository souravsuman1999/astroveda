# AstraVeda Blog Website

A complete blog website built with Next.js 14 and Supabase, featuring a public blog listing, individual blog pages, and an admin panel for content management.

## Features

- ✅ Public blog listing page with cards showing title, description, and date
- ✅ Dynamic blog detail pages with SEO-friendly slug URLs
- ✅ Admin panel with authentication
- ✅ Create, edit, and delete blogs
- ✅ Simple admin authentication (username/password)
- ✅ Full CRUD API endpoints
- ✅ Supabase database integration
- ✅ SEO-friendly meta tags
- ✅ Clean and modern UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Simple cookie-based auth
- **Styling**: CSS (existing styles)
- **Language**: TypeScript

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the SQL script from `database/schema.sql` to create the blogs table
4. Get your project URL and API keys from Settings > API

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# Optional: For production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
astroveda/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   └── blogs/         # Blog CRUD endpoints
│   ├── admin/             # Admin panel pages
│   │   ├── new/           # Create new blog
│   │   └── edit/[slug]/   # Edit blog
│   ├── blogs/             # Public blog pages
│   │   ├── [slug]/        # Individual blog detail
│   │   └── page.tsx       # Blog listing
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/
│   ├── supabase.ts        # Supabase client setup
│   └── auth.ts            # Auth utilities
├── database/
│   └── schema.sql         # Database schema
└── styles/                # CSS files
```

## API Endpoints

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog (admin only)
- `GET /api/blogs/[slug]` - Get a single blog by slug
- `PUT /api/blogs/[slug]` - Update a blog (admin only)
- `DELETE /api/blogs/[slug]` - Delete a blog (admin only)

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

## Admin Panel

Access the admin panel at `/admin`

- **Login**: Use the credentials from your `.env.local` file
- **Create Blog**: Click "New Blog" button
- **Edit Blog**: Click "Edit" on any blog card
- **Delete Blog**: Click "Delete" on any blog card

## Blog Fields

- `title` (required) - Blog title
- `slug` (required) - URL-friendly identifier (auto-generated from title)
- `content` (required) - HTML content
- `short_description` (optional) - Brief description for cards
- `cover_image` (optional) - Cover image URL
- `created_at` - Auto-generated timestamp
- `updated_at` - Auto-updated timestamp

## SEO Features

- Dynamic meta tags for each blog post
- Open Graph tags for social sharing
- Slug-based URLs for better SEO
- Proper semantic HTML structure

## Security Notes

- Admin authentication uses simple cookie-based sessions
- For production, consider implementing:
  - JWT tokens
  - Rate limiting
  - CSRF protection
  - Stronger password hashing
  - Environment variable validation

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

Private project - All rights reserved
