import { useMemo, useState } from 'react'
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

type SortKey = 'updated' | 'stars' | 'name'

export function RepositoriesList({ username, repositories, loading, error }: RepositoriesListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('updated')

  const filteredRepos = useMemo(() => {
    const term = searchTerm.toLowerCase()
    const filtered = repositories.filter((repo) =>
      repo.name.toLowerCase().includes(term) ||
      (repo.description?.toLowerCase().includes(term) ?? false)
    )
    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === 'stars') return b.stargazers_count - a.stargazers_count
      if (sortKey === 'name') return a.name.localeCompare(b.name)
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    })
    return sorted
  }, [repositories, searchTerm, sortKey])

  if (loading) {
    return (
      <div className="hud-panel">
        <div className="hud-label">// repositories</div>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="hud-panel">
        <div className="hud-label">// repositories</div>
        <ErrorMessage message={error} />
      </div>
    )
  }

  if (repositories.length === 0) {
    return (
      <div className="hud-panel">
        <div className="hud-label">// repositories</div>
        <div className="empty-state">
          ▸ no repositories found for target <code>{username}</code>
        </div>
      </div>
    )
  }

  return (
    <div className="hud-panel repos-panel">
      <div className="hud-label hud-label-row">
        <span>// repositories ({repositories.length})</span>
        <span className="hud-sort">
          sort:{' '}
          {(['updated', 'stars', 'name'] as SortKey[]).map((k) => (
            <button
              key={k}
              className={`sort-btn ${sortKey === k ? 'is-active' : ''}`}
              onClick={() => setSortKey(k)}
              type="button"
            >
              {k}
            </button>
          ))}
        </span>
      </div>

      <div className="repo-filter">
        <span className="filter-prompt">filter ▸</span>
        <input
          type="text"
          placeholder="grep repos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="filter-input"
        />
        <span className="filter-count">
          {filteredRepos.length}/{repositories.length}
        </span>
      </div>

      <div className="repo-table-head">
        <span>#</span>
        <span>NAME · DESC</span>
        <span>LANG</span>
        <span>★</span>
        <span>UPDATED</span>
      </div>

      {filteredRepos.length > 0 ? (
        <div className="repo-list">
          {filteredRepos.map((repo, i) => (
            <RepositoryCard key={repo.id} repo={repo} index={i + 1} />
          ))}
        </div>
      ) : (
        <div className="empty-state">▸ no matches for "{searchTerm}"</div>
      )}
    </div>
  )
}
