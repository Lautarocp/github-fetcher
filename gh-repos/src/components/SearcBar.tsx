import { useEffect, useState } from "react";
import type { RepositoryType } from "../types/RepositoryType"; 
import { RepoCard } from "./ReposCard"; 

type GithubRepoFetcherProps = {
  username: string;
};

export const SearchBar = ({ username }: GithubRepoFetcherProps) => {
  const [repos, setRepos] = useState<RepositoryType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); 
  
   

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

  // 👇 filtrado en tiempo real
  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Repositorios de {username}</h3>
      
      {/* Barra de búsqueda */}
      <input
        className="search-bar"
        type="text"
        placeholder="Find Repository..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
      />

      {/* Render repos filtrados */}
      {filteredRepos.length > 0 ? (
        filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))
      ) : (
        <p>No hay repositorios que coincidan con "{searchTerm}".</p>
      )}
    </div>
  );
};
