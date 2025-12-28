import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

// GET single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const supabase = getSupabaseAdmin()
    
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ blog: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()
    const { title, content, short_description, cover_image, new_slug } = body

    const supabase = getSupabaseAdmin()
    
    // First check if blog exists
    const { data: existingBlog } = await supabase
      .from('blogs')
      .select('id')
      .eq('slug', slug)
      .single()

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // Update blog
    const updateData: any = {}
    if (title) updateData.title = title
    if (content) updateData.content = content
    if (short_description !== undefined) updateData.short_description = short_description
    if (cover_image !== undefined) updateData.cover_image = cover_image
    if (new_slug) updateData.slug = new_slug

    const { data, error } = await supabase
      .from('blogs')
      .update(updateData)
      .eq('id', existingBlog.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ blog: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const supabase = getSupabaseAdmin()
    
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('slug', slug)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

