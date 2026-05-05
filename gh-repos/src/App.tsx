import { useState } from 'react'
import { SearchHeader } from './components/SearchHeader'
import { UserCard } from './components/UserCard'
import { RepositoriesList } from './components/RepositoriesList'
import { LangStats } from './components/LangStats'
import { ActivityHeat } from './components/ActivityHeat'
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
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-scanlines" aria-hidden="true" />

      <SearchHeader onSearch={setSearchedUsername} />

      {searchedUsername ? (
        <main className="main-content">
          <aside className="sidebar">
            {userLoading ? (
              <div className="hud-panel">
                <div className="hud-label">// subject.profile</div>
                <LoadingSpinner />
              </div>
            ) : userError ? (
              <div className="hud-panel">
                <div className="hud-label">// subject.profile</div>
                <ErrorMessage message={userError} />
              </div>
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

          <aside className="rail">
            <LangStats repositories={repositories} />
            <ActivityHeat repositories={repositories} />
          </aside>
        </main>
      ) : (
        <main className="welcome-container">
          <div className="welcome-frame">
            <span className="cross-h" />
            <span className="cross-v" />
            <div className="welcome-corner welcome-corner-tl" />
            <div className="welcome-corner welcome-corner-tr" />
            <div className="welcome-corner welcome-corner-bl" />
            <div className="welcome-corner welcome-corner-br" />

            <div className="welcome-content">
              <div className="welcome-tag">▸ STANDBY</div>
              <h2 className="welcome-title">NO TARGET</h2>
              <p className="welcome-sub">
                // awaiting username · enter target callsign in the bar above
              </p>
              <div className="welcome-suggestions">
                <span className="welcome-suggest-label">try ▸</span>
                {['torvalds', 'gaearon', 'sindresorhus', 'yyx990803'].map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="welcome-chip"
                    onClick={() => setSearchedUsername(n)}
                  >
                    @{n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="footer">
        <span>github-fetcher · gh//fetch</span>
        <span className="footer-meta">no api key · no tracking · client-side only</span>
      </footer>
    </div>
  )
}
