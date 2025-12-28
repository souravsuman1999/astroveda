import BlogCardSkeleton from '@/components/BlogCardSkeleton'

export default function Loading() {
  return (
    <div className="blogs-page" style={{
      minHeight: '100vh',
      background: 'var(--gradient-hero)',
      position: 'relative',
      paddingTop: '6rem',
      paddingBottom: '4rem'
    }}>
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
              LOADING...
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
            Loading articles...
          </p>
        </header>

        <div className="blogs-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

