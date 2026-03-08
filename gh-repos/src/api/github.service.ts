import type { User } from '../types/User'
import type { Repository } from '../types/Repository'

const GITHUB_API_BASE = 'https://api.github.com'

class GitHubService {
  async getUser(username: string): Promise<User> {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}`)
    if (!res.ok) {
      throw new Error(`User not found: ${res.statusText}`)
    }
    return res.json()
  }

  async getUserRepositories(username: string): Promise<Repository[]> {
    const res = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`)
    if (!res.ok) {
      throw new Error(`Failed to fetch repositories: ${res.statusText}`)
    }
    return res.json()
  }
}

export const githubService = new GitHubService()
