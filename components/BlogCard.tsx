import Link from 'next/link'
import { Blog } from '@/lib/getBlogs'

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="blog-card">
      <div className="blog-card-content">
        <h2 className="blog-card-title">
          <Link href={`/blog/${blog.slug}`} className="blog-card-link">
            {blog.title}
          </Link>
        </h2>
        <p className="blog-card-description">{blog.description}</p>
        <div className="blog-card-footer">
          <time className="blog-card-date" dateTime={blog.date}>
            {formattedDate}
          </time>
          <Link 
            href={`/blog/${blog.slug}`} 
            className="blog-card-read-more"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  )
}

