import { useState } from 'react'
import type { Repository } from '../types/Repository'
import { RepositoryCard } from './RepositoryCard'
import { LoadingSpinner } from './LoadingSpinner'
import { ErrorMessage } from './ErrorMessage'

interface RepositoriesListProps {
  username: string
  repositories: Repository[]
  loading: boolean
  error: string | null
}

export function RepositoriesList({ username, repositories, loading, error }: RepositoriesListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (repositories.length === 0) {
    return <div className="empty-state">No repositories found for user {username}</div>
  }

  const filteredRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="repositories-container">
      <div className="repos-header">
        <h2>Repositories ({repositories.length})</h2>
        <input
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredRepos.length > 0 ? (
        <div className="repos-list">
          {filteredRepos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No repositories match "{searchTerm}"</div>
      )}
    </div>
  )
}
