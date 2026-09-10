import { useEffect, useState } from 'react'
import { fetchHistory, SavedClassification } from '../api'

const AREA_LABELS: Record<string, string> = {
  hr: 'HR / nábor',
  finance: 'Finance',
  health: 'Zdravotnictví',
  support: 'Zákaznická podpora',
  other: 'Jiné',
}

const LEVEL_LABELS: Record<string, string> = {
  high: 'Vysoké riziko',
  limited: 'Omezené riziko',
  minimal: 'Minimální riziko',
}

export default function History({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<SavedClassification[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchHistory()
      .then((data) => {
        if (!cancelled) {
          setItems(data)
          setError(false)
        }
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [refreshKey])

  if (error) {
    return (
      <p className="history-empty">
        Historie se nenačetla — backend nejspíš neběží. Spusť ho podle README (`uvicorn main:app`
        ve složce <code>backend/</code>).
      </p>
    )
  }

  if (items === null) {
    return <p className="history-empty">Načítám historii…</p>
  }

  if (items.length === 0) {
    return <p className="history-empty">Zatím žádné uložené klasifikace — vyzkoušej klasifikátor výše.</p>
  }

  return (
    <div className="history-list">
      {items.map((item) => (
        <div className="history-row" key={item.id}>
          <span className={`tag ${item.level}`}>{LEVEL_LABELS[item.level] ?? item.level}</span>
          <span>{AREA_LABELS[item.area] ?? item.area}</span>
          <span className="time">
            {new Date(item.created_at).toLocaleDateString('cs-CZ')}
          </span>
        </div>
      ))}
    </div>
  )
}
