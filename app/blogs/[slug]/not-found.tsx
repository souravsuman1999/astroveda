import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Blog Not Found</h2>
      <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
        The blog post you're looking for doesn't exist.
      </p>
      <Link
        href="/blogs"
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          textDecoration: 'none',
          color: 'inherit',
          fontWeight: '600'
        }}
      >
        Back to Blogs
      </Link>
    </div>
  )
}

