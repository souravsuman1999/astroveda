export default function BlogCardSkeleton() {
  return (
    <article style={{
      background: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      {/* Image skeleton */}
      <div style={{
        width: '100%',
        height: '250px',
        background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }} />
      
      <div style={{ padding: '1.5rem' }}>
        {/* Title skeleton */}
        <div style={{
          height: '28px',
          background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 75%)',
          backgroundSize: '200% 100%',
          borderRadius: '8px',
          marginBottom: '1rem',
          animation: 'shimmer 1.5s infinite'
        }} />
        
        {/* Description skeleton */}
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{
            height: '16px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 75%)',
            backgroundSize: '200% 100%',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            width: '100%',
            animation: 'shimmer 1.5s infinite'
          }} />
          <div style={{
            height: '16px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 75%)',
            backgroundSize: '200% 100%',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            width: '85%',
            animation: 'shimmer 1.5s infinite'
          }} />
          <div style={{
            height: '16px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 75%)',
            backgroundSize: '200% 100%',
            borderRadius: '4px',
            width: '70%',
            animation: 'shimmer 1.5s infinite'
          }} />
        </div>
        
        {/* Date skeleton */}
        <div style={{
          height: '14px',
          background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(59, 130, 246, 0.1) 75%)',
          backgroundSize: '200% 100%',
          borderRadius: '4px',
          width: '40%',
          animation: 'shimmer 1.5s infinite'
        }} />
      </div>

    </article>
  )
}

