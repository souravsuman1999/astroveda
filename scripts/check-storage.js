// Helper script to check if Supabase Storage bucket exists
// Run with: node scripts/check-storage.js

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function checkBucket() {
  console.log('🔍 Checking for "blog-images" bucket...\n')

  try {
    // List all buckets
    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
      console.error('❌ Error accessing storage:', error.message)
      return
    }

    console.log('📦 Available buckets:')
    if (buckets.length === 0) {
      console.log('   (No buckets found)')
    } else {
      buckets.forEach(bucket => {
        const isTarget = bucket.name === 'blog-images'
        console.log(`   ${isTarget ? '✅' : '  '} ${bucket.name} ${bucket.public ? '(Public)' : '(Private)'}`)
      })
    }

    const blogImagesBucket = buckets.find(b => b.name === 'blog-images')

    if (!blogImagesBucket) {
      console.log('\n❌ Bucket "blog-images" not found!')
      console.log('\n📝 To create the bucket:')
      console.log('   1. Go to: https://supabase.com/dashboard/project/tezpqmdpkmsktzciyyyx')
      console.log('   2. Click "Storage" in left sidebar')
      console.log('   3. Click "New bucket"')
      console.log('   4. Name: blog-images')
      console.log('   5. Make it PUBLIC')
      console.log('   6. Click "Create bucket"')
    } else {
      console.log('\n✅ Bucket "blog-images" found!')
      console.log(`   Public: ${blogImagesBucket.public ? 'Yes ✅' : 'No ❌ (Should be public!)'}`)
      
      if (!blogImagesBucket.public) {
        console.log('\n⚠️  Warning: Bucket is not public. Images may not be accessible.')
        console.log('   To make it public, go to Storage > blog-images > Settings > Make public')
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkBucket()

