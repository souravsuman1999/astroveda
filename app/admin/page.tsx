'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Blog {
  id: string
  title: string
  slug: string
  short_description: string | null
  created_at: string
}

export default function AdminPage() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check')
      const data = await res.json()
      setAuthenticated(data.authenticated)
      if (data.authenticated) {
        fetchBlogs()
      } else {
        setLoading(false)
      }
    } catch (error) {
      setAuthenticated(false)
      setLoading(false)
    }
  }

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs')
      const data = await res.json()
      setBlogs(data.blogs || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setAuthenticated(true)
        fetchBlogs()
      } else {
        setLoginError(data.error || 'Invalid credentials')
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setAuthenticated(false)
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return
    }

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchBlogs()
      } else {
        alert('Failed to delete blog')
      }
    } catch (error) {
      alert('Error deleting blog')
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="admin-login" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '3rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'inherit',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'inherit',
                  fontSize: '1rem'
                }}
              />
            </div>
            {loginError && (
              <p style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {loginError}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'inherit',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard" style={{
      minHeight: '100vh',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
          <p style={{ opacity: 0.7 }}>Manage your blogs</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link
            href="/blogs"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            View Blogs
          </Link>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 107, 107, 0.2)',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <Link
          href="/admin/new"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: '600'
          }}
        >
          + New Blog
        </Link>
      </div>

      <div className="blogs-list">
        {blogs.length === 0 ? (
          <p style={{ opacity: 0.7, textAlign: 'center', padding: '3rem' }}>
            No blogs yet. Create your first blog!
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {blog.title}
                  </h3>
                  {blog.short_description && (
                    <p style={{ opacity: 0.7, marginBottom: '0.5rem' }}>
                      {blog.short_description}
                    </p>
                  )}
                  <p style={{ fontSize: '0.9rem', opacity: 0.5 }}>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link
                    href={`/admin/edit/${blog.slug}`}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      textDecoration: 'none',
                      color: 'inherit',
                      fontSize: '0.9rem'
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      background: 'rgba(255, 107, 107, 0.1)',
                      color: 'inherit',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

