import { useEffect, useState } from 'react'
import { githubService } from '../api/github.service'
import type { Repository } from '../types/Repository'

interface UseGithubRepositoriesReturn {
  repositories: Repository[]
  loading: boolean
  error: string | null
}

export function useGithubRepositories(username: string): UseGithubRepositoriesReturn {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username.trim()) {
      setRepositories([])
      setLoading(false)
      return
    }

    const fetchRepositories = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await githubService.getUserRepositories(username)
        setRepositories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setRepositories([])
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [username])

  return { repositories, loading, error }
}
