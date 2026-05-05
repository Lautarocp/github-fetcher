import { useMemo } from 'react'
import type { Repository } from '../types/Repository'

interface ActivityHeatProps {
  repositories: Repository[]
}

// Build a 14-week × 7-day grid based on repo updated_at timestamps.
// Not real commit data (would need GraphQL + auth), but reflects push cadence.
export function ActivityHeat({ repositories }: ActivityHeatProps) {
  const grid = useMemo(() => {
    const weeks = 14
    const days = 7
    const cells = Array.from({ length: weeks * days }, () => 0)
    const now = Date.now()
    const msDay = 86_400_000

    for (const r of repositories) {
      const t = new Date(r.updated_at).getTime()
      const ageDays = Math.floor((now - t) / msDay)
      if (ageDays < 0 || ageDays >= weeks * days) continue
      // newest = right column
      const col = weeks - 1 - Math.floor(ageDays / days)
      const row = ageDays % days
      const idx = row * weeks + col
      cells[idx] += 1
    }

    const max = Math.max(1, ...cells)
    return cells.map((v) => Math.min(4, Math.round((v / max) * 4)))
  }, [repositories])

  return (
    <div className="hud-panel activity-panel">
      <div className="hud-label">// activity.heat</div>
      <div className="heat-grid">
        {grid.map((v, i) => (
          <div key={i} className={`heat-cell heat-${v}`} />
        ))}
      </div>
      <div className="heat-legend">
        <span>− less</span>
        <div className="heat-legend-cells">
          {[0, 1, 2, 3, 4].map((v) => (
            <div key={v} className={`heat-cell heat-${v}`} />
          ))}
        </div>
        <span>more +</span>
      </div>
      <div className="heat-foot">
        ▸ last <span className="heat-num">{repositories.length}</span> repo updates · ~14w window
      </div>
    </div>
  )
}
