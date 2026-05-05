# GH//FETCH

> neural git interface · v0.4

A GitHub user/repo viewer with a tactical-HUD hacking aesthetic. Built with **React + TypeScript + Vite**.

```
  ▞▞ GH//FETCH    ● LIVE   SYS: github.api.v3   LAT: 142ms
  ─────────────────────────────────────────────────────────
  TARGET ▸  enter_handle.exe ___________   [ENTER] EXEC
```

## Features

- **Target lookup** — fetch any GitHub user's profile + repos in one shot
- **Tactical HUD layout** — profile panel, repo table, language stats, activity heatmap
- **Live filtering & sorting** — grep repos by name/desc; sort by updated / stars / name
- **Zero auth** — uses the public GitHub REST API (60 req/h per IP, no key needed)
- **Pure client-side** — no tracking, no backend, no cookies
- **Mono-typed CRT vibe** — scanlines, dashed borders, ASCII corners, orange/cyan accent

## Stack

- `react` 18 + TypeScript
- `vite` 5
- public REST: `https://api.github.com/users/:user` and `/users/:user/repos`

No external UI lib — every panel is hand-rolled CSS.

## Project structure

```
src/
  api/
    github.service.ts        // fetch wrapper for users + repos
  components/
    SearchHeader.tsx         // brand bar + status strip + command bar
    UserCard.tsx             // subject.profile panel
    RepositoriesList.tsx     // repo table w/ filter + sort
    RepositoryCard.tsx       // single repo row
    LangStats.tsx            // lang.stats bars (top 5 langs)
    ActivityHeat.tsx         // 14×7 heat grid (repo update cadence)
    LoadingSpinner.tsx       // ASCII progress bar
    ErrorMessage.tsx         // [ERR] frame
  hooks/
    useGithubUser.ts
    useGithubRepositories.ts
  types/
    User.ts
    Repository.ts
  styles/
    global.css               // full HUD theme
  App.tsx
  main.tsx
```

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build
npm run preview
```

## Theme tokens

The whole look is driven by CSS custom props in `src/styles/global.css`:

| token | value | use |
| --- | --- | --- |
| `--bg` | `#08090a` | page background |
| `--bg-elev` | `#0d1013` | panel background |
| `--accent` | `#f97316` | primary orange (labels, focus, links) |
| `--cyan` | `#22d3ee` | secondary accent (corners) |
| `--green` / `--yellow` / `--red` | live / stars / error | semantic colors |
| `--mono` | JetBrains Mono / SF Mono / etc | the only font in the app |

Swap `--accent` to retheme the whole UI in seconds.

## Notes / limitations

- The REST API doesn't expose real commit history without auth — `ActivityHeat` is built from `updated_at` of repos, so it visualizes push cadence rather than commits. To switch to real contribution data, plug in the GraphQL `contributionsCollection` with a personal token.
- Unauthenticated REST is rate-limited to 60 req/h per IP. Add a token via env if you hit the wall.

## License

MIT — go nuts.
