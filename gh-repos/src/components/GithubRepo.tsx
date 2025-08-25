// Component to fetch and display GitHub repositories for a given user
import { useEffect, useState } from "react"; 
import type { RepositoryType } from "../types/RepositoryType"; //RepositoryType is a type that defines the structure of a GitHub repository object
import { RepoCard } from "./ReposCard"; 

type GithubRepoFetcherProps = {
  username: string;
};

export const GithubRepoFetcher = ({ username }: GithubRepoFetcherProps) => {
  const [repos, setRepos] = useState<RepositoryType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!res.ok) {
          throw new Error(`Error fetching repositories: ${res.statusText}`);
        }
        const data: RepositoryType[] = await res.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) {
    return <p>Cargando repositorios...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!repos || repos.length === 0) {
    return <p>No se encontraron repositorios para el usuario {username}.</p>;
  }

  return (
    <div>
      <h3>Repositorios de {username}</h3>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};