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
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
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
                  style={{ objectFit: 'cover' }}
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

      <style jsx global>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .blog-content h1 { font-size: 2.5rem; }
        .blog-content h2 { font-size: 2rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content h4 { font-size: 1.25rem; }
        
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2rem 0;
        }
        
        .blog-content a {
          color: inherit;
          text-decoration: underline;
          opacity: 0.8;
        }
        
        .blog-content a:hover {
          opacity: 1;
        }
        
        .blog-content code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-size: 0.9em;
        }
        
        .blog-content pre {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
        }
        
        .blog-content blockquote {
          border-left: 4px solid rgba(255, 255, 255, 0.3);
          padding-left: 1.5rem;
          margin: 2rem 0;
          opacity: 0.8;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}

