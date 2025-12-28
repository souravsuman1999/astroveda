import { cookies } from 'next/headers'

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    return !!session
  } catch {
    return false
  }
}

