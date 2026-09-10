export interface SavedClassification {
  id: number
  area: string
  decision: string
  discloses: string
  level: string
  created_at: string
}

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000'

export async function saveClassification(payload: {
  area: string
  decision: string
  discloses: string
  level: string
}): Promise<SavedClassification> {
  const res = await fetch(`${API_BASE}/api/classifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`Uložení selhalo (${res.status})`)
  }
  return res.json()
}

export async function fetchHistory(): Promise<SavedClassification[]> {
  const res = await fetch(`${API_BASE}/api/classifications`)
  if (!res.ok) {
    throw new Error(`Načtení historie selhalo (${res.status})`)
  }
  return res.json()
}
