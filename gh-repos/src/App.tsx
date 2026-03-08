import { useState } from 'react'
import { SearchHeader } from './components/SearchHeader'
import { UserCard } from './components/UserCard'
import { RepositoriesList } from './components/RepositoriesList'
import { LoadingSpinner } from './components/LoadingSpinner'
import { ErrorMessage } from './components/ErrorMessage'
import { useGithubUser } from './hooks/useGithubUser'
import { useGithubRepositories } from './hooks/useGithubRepositories'

export function App() {
  const [searchedUsername, setSearchedUsername] = useState('')
  const { user, loading: userLoading, error: userError } = useGithubUser(searchedUsername)
  const { repositories, loading: reposLoading, error: reposError } = useGithubRepositories(searchedUsername)

  return (
    <div className="app">
      <SearchHeader onSearch={setSearchedUsername} />

      {searchedUsername && (
        <main className="main-content">
          <aside className="sidebar">
            {userLoading ? (
              <LoadingSpinner />
            ) : userError ? (
              <ErrorMessage message={userError} />
            ) : user ? (
              <UserCard user={user} />
            ) : null}
          </aside>

          <section className="content">
            <RepositoriesList
              username={searchedUsername}
              repositories={repositories}
              loading={reposLoading}
              error={reposError}
            />
          </section>
        </main>
      )}

      {!searchedUsername && (
        <div className="welcome-container">
          <div className="welcome-content">
            <h2>Welcome to GitHub Fetcher</h2>
            <p>Search for any GitHub user to see their profile and repositories</p>
          </div>
        </div>
      )}
    </div>
  )
}
