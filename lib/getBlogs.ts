import fs from 'fs'
import path from 'path'

export interface Blog {
  title: string
  slug: string
  description: string
  content: string
  date: string
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blogs')

export function getAllBlogs(): Blog[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(blogsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(blogsDirectory)
    const blogs = fileNames
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => {
        const filePath = path.join(blogsDirectory, fileName)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const blog: Blog = JSON.parse(fileContents)
        return blog
      })
      .sort((a, b) => {
        // Sort by date, newest first
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })

    return blogs
  } catch (error) {
    console.error('Error reading blogs:', error)
    return []
  }
}

export function getBlogBySlug(slug: string): Blog | null {
  try {
    const filePath = path.join(blogsDirectory, `${slug}.json`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const blog: Blog = JSON.parse(fileContents)
    
    return blog
  } catch (error) {
    console.error('Error reading blog:', error)
    return null
  }
}

export function getAllSlugs(): string[] {
  try {
    if (!fs.existsSync(blogsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(blogsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => fileName.replace(/\.json$/, ''))
  } catch (error) {
    console.error('Error reading blog slugs:', error)
    return []
  }
}

