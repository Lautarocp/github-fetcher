import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { UserCard } from "./UserCard";

type GithubUserFetcherProps = {
  username: string;
};

export const GithubUserFetcher = ({ username }: GithubUserFetcherProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("Usuario no encontrado");
        const data: User = await res.json();
        console.log("Datos del usuario:", data);
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return <UserCard user={user} />;
};
