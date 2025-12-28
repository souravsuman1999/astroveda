import { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogs } from '@/lib/getBlogs'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blog | AstraVeda',
  description: 'Read our latest articles and insights about satellite ground infrastructure, quantum security, and space technology.',
}

export default function BlogPage() {
  const blogs = getAllBlogs()

  return (
    <div className="blog-page">
      <div className="blog-container">
        <header className="blog-header">
          <h1 className="blog-title">Our Blog</h1>
          <p className="blog-subtitle">
            Insights, updates, and thoughts on satellite ground infrastructure, 
            quantum security, and space technology.
          </p>
        </header>

        {blogs.length === 0 ? (
          <div className="blog-empty">
            <p>No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        )}

        <div className="blog-footer">
          <Link href="/" className="blog-back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

