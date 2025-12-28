import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogBySlug, getAllSlugs } from '@/lib/getBlogs'

interface BlogPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found | AstraVeda',
    }
  }

  return {
    title: `${blog.title} | AstraVeda Blog`,
    description: blog.description,
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <Link href="/blog" className="blog-detail-back">
          ← Back to Blog
        </Link>

        <article className="blog-detail-article">
          <header className="blog-detail-header">
            <h1 className="blog-detail-title">{blog.title}</h1>
            <div className="blog-detail-meta">
              <time dateTime={blog.date} className="blog-detail-date">
                {formattedDate}
              </time>
            </div>
            {blog.description && (
              <p className="blog-detail-description">{blog.description}</p>
            )}
          </header>

          <div 
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>

        <div className="blog-detail-footer">
          <Link href="/blog" className="blog-detail-back-link">
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

