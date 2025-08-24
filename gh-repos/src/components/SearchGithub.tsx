import { useState } from "react";
import { GithubUserFetcher } from "./GithubUser";
import { SearchBar } from "./SearcBar";

function SearchGithub() {
  const [inputUsername, setInputUsername] = useState("");
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    setUsername(inputUsername);
  };

  return (
    <div>
      
      <nav className="navbar">
        <h1 className="logo">GitHub Fetch</h1>
        <div className="search-box">
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="GitHub Username"
          />
          <button onClick={handleSearch}>Find</button>
        </div>
      </nav>

      
      <main className="content">
        {username && (
          <>
            <GithubUserFetcher username={username} />
            <SearchBar username={username} />
          </>
        )}
      </main>
    </div>
  );
}

export default SearchGithub;
