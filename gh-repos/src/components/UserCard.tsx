import type { User } from '../types/User'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="hud-panel user-panel">
      <div className="hud-label">// subject.profile</div>

      <div className="user-avatar-wrap">
        <img src={user.avatar_url} alt={user.login} className="user-avatar" />
        <span className="avatar-corner avatar-corner-tl" />
        <span className="avatar-corner avatar-corner-tr" />
        <span className="avatar-corner avatar-corner-bl" />
        <span className="avatar-corner avatar-corner-br" />
      </div>

      <div className="user-id">
        <h2 className="user-name">{user.name ?? user.login}</h2>
        <p className="user-handle">@{user.login}</p>
      </div>

      {user.bio && <p className="user-bio">"{user.bio}"</p>}

      <dl className="user-meta">
        <div className="meta-row">
          <dt>LOC</dt>
          <dd>{user.location ?? '—'}</dd>
        </div>
        <div className="meta-row">
          <dt>FLW</dt>
          <dd>{user.followers}</dd>
        </div>
        <div className="meta-row">
          <dt>FLG</dt>
          <dd>{user.following}</dd>
        </div>
        <div className="meta-row">
          <dt>RPO</dt>
          <dd>{user.public_repos}</dd>
        </div>
        <div className="meta-row">
          <dt>EST</dt>
          <dd>{new Date(user.created_at).getFullYear()}</dd>
        </div>
      </dl>

      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
        ▸ OPEN PROFILE
      </a>
    </div>
  )
}
