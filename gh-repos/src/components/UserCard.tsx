import type { User } from '../types/User'

interface UserCardProps {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} className="user-avatar" />
      <h1>{user.name ?? user.login}</h1>
      <h2>@{user.login}</h2>
      <p className="user-bio">{user.bio ?? 'No bio available'}</p>
      {user.location && <p className="user-location">📍 {user.location}</p>}
      <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="profile-link">
        View Profile
      </a>
    </div>
  )
}
