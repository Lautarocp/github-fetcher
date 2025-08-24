
import type { RepositoryType } from '../types/RepositoryType'; 


interface RepoCardProps {
  repo: RepositoryType;
}


export const RepoCard = ({ repo }: RepoCardProps) => {
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='repoCard'>
      <h2>
       <a href={repo.html_url} target='_blank' >{repo.name} /</a>
      </h2>
       <p>
        {repo.description || "No description provided."}
      </p>
        <div>
            <span>
            <strong>Language:</strong> {repo.language || "Not specified"}
            </span>
            <span className='Span'>
            <strong> Last Updated:</strong> {formatDate(repo.updated_at)}
            </span>
        </div>
    </div>
  );
};
