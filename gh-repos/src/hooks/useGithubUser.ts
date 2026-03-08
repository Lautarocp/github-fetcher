import { useEffect, useState } from 'react'
import { githubService } from '../api/github.service'
import type { User } from '../types/User'

interface UseGithubUserReturn {
  user: User | null
  loading: boolean
  error: string | null
}

export function useGithubUser(username: string): UseGithubUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username.trim()) {
      setUser(null)
      setLoading(false)
      return
    }

    const fetchUser = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await githubService.getUser(username)
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  return { user, loading, error }
}
