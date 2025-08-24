import type { User } from "../types/User";

interface UserCardProps { 
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt={user.login}
        
      />
      <h1>{user.name ?? user.login}</h1>
      <h2>{user.login}</h2>  
      <p>{user.bio ?? "No bio available"}</p>
      <p>{user.location }</p>
      
    </div>
  );
};
