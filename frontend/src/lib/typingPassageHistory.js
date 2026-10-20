const STORAGE_KEY = 'typing-recent-passages'
const HISTORY_LIMIT = 5
const isPassageId = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
const clean = values => [...new Set((Array.isArray(values) ? values : []).filter(isPassageId).map(value => value.toLowerCase()))].slice(0, HISTORY_LIMIT)

export function createPassageHistory(getStorage = () => globalThis.sessionStorage) {
  let memory = []
  return {
    get() {
      try {
        const storage = getStorage()
        if (storage) memory = clean([...memory, ...clean(JSON.parse(storage.getItem(STORAGE_KEY) || '[]'))])
      } catch { /* Storage is optional; retain this tab's in-memory history. */ }
      return [...memory]
    },
    remember(id) {
      if (!isPassageId(id)) return
      memory = clean([id, ...this.get()])
      try { getStorage()?.setItem(STORAGE_KEY, JSON.stringify(memory)) } catch { /* Keep the latest selection even when storage is full. */ }
    },
  }
}

export function pickPracticePassage(passages, recentIds, random = Math.random) {
  if (!passages.length) throw new Error('No practice passages are available')
  const recent = new Set(recentIds)
  let candidates = passages.filter(passage => !recent.has(passage.id))
  if (!candidates.length) candidates = passages.filter(passage => passage.id !== recentIds[0])
  if (!candidates.length) candidates = passages
  return candidates[Math.floor(random() * candidates.length)]
}

export const passageHistory = createPassageHistory()
