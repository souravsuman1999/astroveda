import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  short_description: string | null
  cover_image: string | null
  created_at: string
  updated_at: string
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase')
    const supabase = getSupabaseAdmin()
    
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching blog:', error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlog(params.slug)
  
  if (!blog) {
    return {
      title: 'Blog Not Found - AstraVeda',
    }
  }

  return {
    title: `${blog.title} - AstraVeda Blog`,
    description: blog.short_description || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.short_description || blog.title,
      images: blog.cover_image ? [blog.cover_image] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="blog-detail-page">
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        <Link 
          href="/blogs"
          style={{
            display: 'inline-block',
            marginBottom: '2rem',
            color: 'inherit',
            textDecoration: 'none',
            opacity: 0.8,
            fontSize: '1rem'
          }}
        >
          ← Back to Blogs
        </Link>

        <article>
          <header style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {blog.title}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              opacity: 0.7,
              fontSize: '0.95rem'
            }}>
              <time>
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {blog.cover_image && (
              <div style={{
                width: '100%',
                height: '400px',
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                marginBottom: '2rem'
              }}>
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'fill' }}
                  priority
                />
              </div>
            )}

            {blog.short_description && (
              <p style={{
                fontSize: '1.3rem',
                lineHeight: '1.6',
                opacity: 0.9,
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                {blog.short_description}
              </p>
            )}
          </header>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: 'inherit'
            }}
          />
        </article>
      </div>
    </div>
  )
}

