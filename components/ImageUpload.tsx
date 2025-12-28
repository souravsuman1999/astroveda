'use client'

import { useState, useRef, DragEvent } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ value, onChange, label = 'Cover Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError('')

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0])
    }
  }

  const uploadFile = async (file: File) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        onChange(data.url)
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch (error) {
      setError('Error uploading image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ 
        display: 'block', 
        marginBottom: '0.5rem', 
        fontWeight: '600',
        fontSize: '1rem'
      }}>
        {label}
      </label>

      {value ? (
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '1rem'
        }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid rgba(59, 130, 246, 0.3)'
          }}>
            <Image
              src={value}
              alt="Cover"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              background: 'rgba(255, 107, 107, 0.1)',
              color: '#ff6b6b',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Remove Image
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
          style={{
            border: `2px dashed ${dragActive ? 'rgba(59, 130, 246, 0.6)' : 'rgba(255, 255, 255, 0.2)'}`,
            borderRadius: '12px',
            padding: '3rem 2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: dragActive ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            position: 'relative'
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
            disabled={uploading}
          />
          
          {uploading ? (
            <div>
              <div 
                className="spinner"
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid rgba(59, 130, 246, 0.3)',
                  borderTop: '3px solid #3b82f6',
                  borderRadius: '50%',
                  margin: '0 auto 1rem',
                  animation: 'spin 1s linear infinite'
                }} 
              />
              <p style={{ opacity: 0.7 }}>Uploading...</p>
            </div>
          ) : (
            <div>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                opacity: 0.6
              }}>
                📷
              </div>
              <p style={{ 
                fontSize: '1.1rem', 
                marginBottom: '0.5rem',
                fontWeight: '600'
              }}>
                Drag & drop an image here
              </p>
              <p style={{ 
                fontSize: '0.9rem', 
                opacity: 0.6,
                marginBottom: '1rem'
              }}>
                or click to browse
              </p>
              <p style={{ 
                fontSize: '0.85rem', 
                opacity: 0.5
              }}>
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p style={{
          color: '#ff6b6b',
          fontSize: '0.9rem',
          marginTop: '0.5rem'
        }}>
          {error}
        </p>
      )}

      {value && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or enter image URL directly"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'inherit',
            fontSize: '0.9rem',
            marginTop: '0.5rem'
          }}
        />
      )}

    </div>
  )
}

