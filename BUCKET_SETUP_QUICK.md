# 🚀 Quick Fix: Create Storage Bucket

## The Error You're Seeing:
```
Storage bucket not found. Please create a bucket named "blog-images" in Supabase Storage.
```

## ✅ Solution (2 Minutes):

### Step 1: Open Supabase Dashboard
Click this link: **https://supabase.com/dashboard/project/tezpqmdpkmsktzciyyyx/storage/buckets**

Or manually:
1. Go to https://supabase.com/dashboard
2. Select your project: `tezpqmdpkmsktzciyyyx`
3. Click **"Storage"** in the left sidebar

### Step 2: Create Bucket
1. Click the **"New bucket"** button (top right, green/blue button)
2. In the form that appears:
   - **Name**: Type `blog-images` (exactly this, no spaces, lowercase)
   - **Public bucket**: Toggle this **ON** ✅ (Very important!)
   - Leave other settings as default
3. Click **"Create bucket"**

### Step 3: Verify
- You should see `blog-images` in the buckets list
- It should show as "Public"

### Step 4: Test
- Go back to your admin panel
- Try uploading an image again
- It should work now! 🎉

---

## 🔍 Still Not Working?

### Option 1: Check with Script
Run this command in your terminal:
```bash
node scripts/check-storage.js
```

This will tell you if the bucket exists and if it's public.

### Option 2: Manual Check
1. Go to Storage in Supabase dashboard
2. Look for `blog-images` in the list
3. If it's there but not public:
   - Click on `blog-images`
   - Go to Settings tab
   - Toggle "Public bucket" to ON
   - Save

### Option 3: Verify Credentials
Make sure your `.env.local` has:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tezpqmdpkmsktzciyyyx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

---

## 📸 What You Should See:

**Before:**
```
Storage
  └── (empty or other buckets)
```

**After:**
```
Storage
  └── blog-images (Public) ✅
```

---

## ⚠️ Common Mistakes:
- ❌ Bucket name with spaces: `blog images`
- ❌ Wrong case: `Blog-Images` or `BLOG-IMAGES`
- ❌ Not making it public
- ✅ Correct: `blog-images` (lowercase, hyphen, public)

---

**Need help?** Check `STORAGE_SETUP.md` for detailed instructions.

