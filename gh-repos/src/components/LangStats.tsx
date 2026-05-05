import { useMemo } from 'react'
import type { Repository } from '../types/Repository'

interface LangStatsProps {
  repositories: Repository[]
}

const LANG_COLOR: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'C++': '#f34b7d',
  C: '#555555',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Ruby: '#701516',
  Shell: '#89e051',
  Vue: '#41b883',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}

export function LangStats({ repositories }: LangStatsProps) {
  const stats = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of repositories) {
      if (!r.language) continue
      counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
    }
    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang, n]) => ({
        lang,
        count: n,
        pct: Math.round((n / total) * 100),
      }))
  }, [repositories])

  return (
    <div className="hud-panel langs-panel">
      <div className="hud-label">// lang.stats</div>
      {stats.length === 0 ? (
        <div className="empty-state small">▸ no language data</div>
      ) : (
        <div className="lang-list">
          {stats.map((s) => (
            <div key={s.lang} className="lang-row">
              <div className="lang-row-head">
                <span className="lang-name">
                  <span
                    className="lang-dot"
                    style={{ background: LANG_COLOR[s.lang] ?? '#f97316' }}
                  />
                  {s.lang}
                </span>
                <span className="lang-pct">{s.pct}%</span>
              </div>
              <div className="lang-bar-track">
                <div
                  className="lang-bar-fill"
                  style={{
                    width: `${s.pct}%`,
                    background: LANG_COLOR[s.lang] ?? '#f97316',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
