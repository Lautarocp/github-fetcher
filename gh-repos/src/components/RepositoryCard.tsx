import type { Repository } from '../types/Repository'

interface RepositoryCardProps {
  repo: Repository
  index: number
}

export function RepositoryCard({ repo, index }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().slice(0, 10)
  }

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-row"
    >
      <span className="repo-idx">{String(index).padStart(2, '0')}</span>
      <div className="repo-main">
        <div className="repo-name-row">
          <span className="repo-name">./{repo.name}</span>
          {repo.fork && <span className="repo-tag">fork</span>}
        </div>
        <p className="repo-description">
          {repo.description || <span className="repo-empty">// no description</span>}
        </p>
      </div>
      <div className="repo-lang-cell">
        {repo.language ? (
          <>
            <span className="lang-dot" data-lang={repo.language} />
            <span className="repo-lang">{repo.language}</span>
          </>
        ) : (
          <span className="repo-lang muted">—</span>
        )}
      </div>
      <span className="repo-stars">★ {repo.stargazers_count}</span>
      <span className="repo-updated">{formatDate(repo.updated_at)}</span>
    </a>
  )
}
