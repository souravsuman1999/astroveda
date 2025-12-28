# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

## Step 3: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the entire contents of `database/schema.sql`
4. Click **Run** to execute the SQL

## Step 4: Get Supabase Credentials

1. In Supabase dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key** (this is your `SUPABASE_SERVICE_ROLE_KEY`)

## Step 5: Create Environment File

Create a file named `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important**: Replace all placeholder values with your actual Supabase credentials and set a strong admin password.

## Step 6: Run the Application

```bash
npm run dev
```

## Step 7: Access the Application

- **Home Page**: http://localhost:3000
- **Blogs Page**: http://localhost:3000/blogs
- **Admin Panel**: http://localhost:3000/admin

## Admin Login

- Username: The value you set for `ADMIN_USERNAME` in `.env.local` (default: `admin`)
- Password: The value you set for `ADMIN_PASSWORD` in `.env.local`

## Creating Your First Blog

1. Go to http://localhost:3000/admin
2. Login with your admin credentials
3. Click "New Blog"
4. Fill in the form:
   - **Title**: Your blog title
   - **Slug**: Will auto-generate from title (you can edit it)
   - **Short Description**: Brief description (optional)
   - **Cover Image URL**: Image URL (optional)
   - **Content**: HTML content of your blog
5. Click "Create Blog"

## Notes

- The slug should be URL-friendly (lowercase, hyphens instead of spaces)
- Content supports HTML tags for formatting
- Cover images should be publicly accessible URLs
- All blogs are publicly visible on `/blogs` page

## Troubleshooting

### Database Connection Issues
- Verify your Supabase credentials in `.env.local`
- Make sure you ran the SQL schema in Supabase SQL Editor
- Check that your Supabase project is active

### Authentication Issues
- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`
- Clear browser cookies and try again

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check that all environment variables are set correctly

