'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    short_description: '',
    cover_image: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check')
      const data = await res.json()
      setAuthenticated(data.authenticated)
      if (data.authenticated) {
        fetchBlog()
      } else {
        router.push('/admin')
      }
    } catch (error) {
      setAuthenticated(false)
      router.push('/admin')
    }
  }

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${slug}`)
      const data = await res.json()

      if (res.ok && data.blog) {
        setFormData({
          title: data.blog.title,
          slug: data.blog.slug,
          content: data.blog.content,
          short_description: data.blog.short_description || '',
          cover_image: data.blog.cover_image || '',
        })
      } else {
        setError('Blog not found')
      }
      setLoading(false)
    } catch (error) {
      setError('Error loading blog')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const updateData = {
        title: formData.title,
        content: formData.content,
        short_description: formData.short_description,
        cover_image: formData.cover_image,
        ...(formData.slug !== slug && { new_slug: formData.slug }),
      }

      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin')
      } else {
        setError(data.error || 'Failed to update blog')
      }
    } catch (error) {
      setError('Error updating blog. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !authenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Edit Blog</h1>
        <p style={{ opacity: 0.7 }}>Update your blog post</p>
      </header>

      {error && !formData.title && (
        <div style={{
          padding: '1rem',
          borderRadius: '8px',
          background: 'rgba(255, 107, 107, 0.2)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          marginBottom: '1.5rem',
          color: '#ff6b6b'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Short Description
          </label>
          <textarea
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'inherit',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Cover Image URL
          </label>
          <input
            type="url"
            value={formData.cover_image}
            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            placeholder="https://example.com/image.jpg"
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
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Content * (HTML)
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={20}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'inherit',
              fontSize: '1rem',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
        </div>

        {error && formData.title && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            background: 'rgba(255, 107, 107, 0.2)',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            marginBottom: '1.5rem',
            color: '#ff6b6b'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'inherit',
              fontSize: '1rem',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              opacity: saving ? 0.5 : 1
            }}
          >
            {saving ? 'Saving...' : 'Update Blog'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'transparent',
              color: 'inherit',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

