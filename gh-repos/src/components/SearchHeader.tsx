import { useState } from 'react'

interface SearchHeaderProps {
  onSearch: (username: string) => void
}

export function SearchHeader({ onSearch }: SearchHeaderProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="search-header">
      <div className="header-content">
        <div className="brand">
          <span className="brand-mark">▞▞</span>
          <span className="brand-name">GH//FETCH</span>
          <span className="brand-version">v0.4 · neural git interface</span>
        </div>

        <div className="status-strip">
          <span className="status-pill status-live">● LIVE</span>
          <span className="status-meta">SYS: github.api.v3</span>
          <span className="status-meta">LAT: <span className="status-num">142</span>ms</span>
          <span className="status-meta status-clock" id="status-clock">--:--:--</span>
        </div>
      </div>

      <div className="cmd-bar">
        <span className="cmd-label">TARGET ▸</span>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="enter_handle.exe ___________"
          className="cmd-input"
          autoFocus
        />
        <button onClick={handleSearch} className="cmd-button">
          [ENTER] EXEC
        </button>
      </div>
    </header>
  )
}
