import type { Repository } from '../types/Repository'

interface RepositoryCardProps {
  repo: Repository
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="repo-card">
      <div className="repo-header">
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-name">
          {repo.name}
        </a>
        {repo.stargazers_count > 0 && (
          <span className="star-count">⭐ {repo.stargazers_count}</span>
        )}
      </div>
      <p className="repo-description">{repo.description || 'No description provided'}</p>
      <div className="repo-meta">
        {repo.language && (
          <span className="repo-language">
            <span className="language-dot"></span>
            {repo.language}
          </span>
        )}
        <span className="repo-updated">Updated {formatDate(repo.updated_at)}</span>
      </div>
    </div>
  )
}
