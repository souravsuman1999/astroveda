import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blogs - AstraVeda',
  description: 'Read our latest blogs and articles',
}

interface Blog {
  id: string
  title: string
  slug: string
  short_description: string | null
  cover_image: string | null
  created_at: string
}

async function getBlogs(): Promise<Blog[]> {
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase')
    const supabase = getSupabaseAdmin()
    
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching blogs from Supabase:', error)
      return []
    }

    return data || []
  } catch (error: any) {
    console.error('Exception while fetching blogs:', error)
    return []
  }
}

function BlogsGrid({ blogs }: { blogs: Blog[] }) {
  if (blogs.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '6rem 2rem',
        background: 'rgba(15, 23, 42, 0.4)',
        borderRadius: '24px',
        border: '1px solid rgba(59, 130, 246, 0.2)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.5 }}>📝</div>
        <h2 style={{
          fontSize: '1.5rem',
          marginBottom: '0.5rem',
          color: '#e2e8f0'
        }}>
          No blogs yet
        </h2>
        <p style={{ 
          fontSize: '1rem', 
          opacity: 0.7,
          color: '#cbd5e1'
        }}>
          Check back soon for new articles!
        </p>
      </div>
    )
  }

  return (
    <div className="blogs-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '2rem',
      marginTop: '2rem'
    }}>
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blogs/${blog.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <article className="blog-card" style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {blog.cover_image && (
              <div style={{
                width: '100%',
                height: '250px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Image
                  src={blog.cover_image}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 100%)'
                }} />
              </div>
            )}
            <div style={{ 
              padding: '1.5rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '0.75rem',
                lineHeight: '1.3',
                color: '#fff',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {blog.title}
              </h2>
              {blog.short_description && (
                <p style={{
                  fontSize: '1rem',
                  opacity: 0.8,
                  marginBottom: '1rem',
                  lineHeight: '1.6',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  color: '#e2e8f0',
                  flex: 1
                }}>
                  {blog.short_description}
                </p>
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: 'auto',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(59, 130, 246, 0.1)'
              }}>
                <time style={{
                  fontSize: '0.9rem',
                  opacity: 0.6,
                  color: '#cbd5e1'
                }}>
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span style={{
                  fontSize: '0.9rem',
                  opacity: 0.4,
                  color: '#cbd5e1'
                }}>•</span>
                <span style={{
                  fontSize: '0.9rem',
                  opacity: 0.6,
                  color: '#93c5fd',
                  fontWeight: '500'
                }}>
                  Read more →
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="blogs-page" style={{
      minHeight: '100vh',
      background: 'var(--gradient-hero)',
      position: 'relative',
      paddingTop: '6rem',
      paddingBottom: '4rem'
    }}>
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <header style={{ 
          marginBottom: '4rem', 
          textAlign: 'center' 
        }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: '12px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            marginBottom: '1.5rem'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: '#93c5fd',
              fontWeight: '600',
              letterSpacing: '0.05em'
            }}>
              LATEST ARTICLES
            </span>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'var(--gradient-blue)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Our Blog
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.8,
            color: '#e2e8f0',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explore our latest insights, stories, and updates
          </p>
        </header>

        <BlogsGrid blogs={blogs} />
      </div>

    </div>
  )
}
