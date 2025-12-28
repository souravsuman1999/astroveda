# Supabase Storage Setup for Image Upload

## ⚠️ IMPORTANT: Create Storage Bucket First!

The image upload feature requires a Supabase Storage bucket. Follow these steps:

## Step-by-Step Instructions:

### 1. Go to Supabase Dashboard
   - Open: https://supabase.com/dashboard/project/tezpqmdpkmsktzciyyyx
   - Or go to your Supabase dashboard and select your project

### 2. Navigate to Storage
   - Click on **"Storage"** in the left sidebar
   - You should see the Storage page

### 3. Create New Bucket
   - Click the **"New bucket"** button (usually at the top right)
   - A modal/form will appear

### 4. Configure the Bucket
   - **Bucket name**: Enter exactly `blog-images` (must match exactly)
   - **Public bucket**: Toggle this to **ON** (very important!)
     - This allows images to be accessed via public URLs
   - **File size limit**: Leave default or set to 5MB
   - **Allowed MIME types**: Leave empty (allows all image types)

### 5. Create the Bucket
   - Click **"Create bucket"** or **"Save"**
   - Wait for confirmation

### 6. Set Bucket Policies (Optional but Recommended)

   **For Public Read Access:**
   - Click on the `blog-images` bucket
   - Go to **"Policies"** tab
   - Click **"New policy"**
   - Select **"For full customization"**
   - Policy name: `Public read access`
   - Allowed operation: `SELECT`
   - Target roles: `anon`, `authenticated`
   - Policy definition:
     ```sql
     true
     ```
   - Click **"Review"** then **"Save policy"**

   **For Upload Access (Admin only via service role):**
   - The upload API uses service_role key, so it should work automatically
   - If you want authenticated users to upload, create another policy:
     - Policy name: `Authenticated uploads`
     - Allowed operation: `INSERT`
     - Target roles: `authenticated`
     - Policy definition:
       ```sql
       true
       ```

## Verification:

1. After creating the bucket, try uploading an image from the admin panel
2. If you still get errors, check:
   - Bucket name is exactly `blog-images` (case-sensitive)
   - Bucket is set to **Public**
   - Your Supabase credentials in `.env.local` are correct

## Troubleshooting:

**Error: "Bucket not found"**
- Make sure the bucket name is exactly `blog-images`
- Check that the bucket was created successfully in Supabase dashboard

**Error: "Permission denied"**
- Make sure the bucket is set to **Public**
- Check your `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

**Images not displaying**
- Verify the bucket is **Public**
- Check the public URL is accessible

## Quick Checklist:
- [ ] Bucket created with name `blog-images`
- [ ] Bucket is set to **Public**
- [ ] `.env.local` has correct Supabase credentials
- [ ] Tested image upload from admin panel
