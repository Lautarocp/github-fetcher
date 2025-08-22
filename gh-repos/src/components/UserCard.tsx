import type { User } from "../types/user";

type UserCardProps = {
  user: User;
};

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card border p-4 rounded shadow-md max-w-sm">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full mb-2"
      />
      <h1 className="text-xl font-bold">{user.name ?? user.login}</h1>
      <h2 className="text-gray-500 mb-2">{user.login}</h2>  
      <p className="text-gray-700 mb-2">{user.bio ?? "No bio available"}</p>
      <p className="text-gray-600">{user.location }</p>
      
    </div>
  );
};
