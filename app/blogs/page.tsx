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
      console.error('Error fetching blogs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="blogs-page">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Our Blog
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Latest articles and insights
          </p>
        </header>

        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>
              No blogs available yet. Check back soon!
            </p>
          </div>
        ) : (
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {blog.cover_image && (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <Image
                        src={blog.cover_image}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem' }}>
                    <h2 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      marginBottom: '0.75rem',
                      lineHeight: '1.3'
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
                        overflow: 'hidden'
                      }}>
                        {blog.short_description}
                      </p>
                    )}
                    <time style={{
                      fontSize: '0.9rem',
                      opacity: 0.6,
                      display: 'block'
                    }}>
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

