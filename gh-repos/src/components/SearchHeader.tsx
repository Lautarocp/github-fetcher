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
        <h1 className="logo">🐙 GitHub Fetcher</h1>
        <div className="search-box">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search GitHub username..."
            className="search-input-header"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
      </div>
    </header>
  )
}
