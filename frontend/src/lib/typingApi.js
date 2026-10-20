const base = (import.meta.env?.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '')

export class TypingApiError extends Error {
  constructor(message, status, code) {
    super(message)
    this.status = status
    this.code = code
  }
}

export async function typingRequest(path, { signal, body } = {}) {
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (signal?.aborted) controller.abort()
  signal?.addEventListener('abort', abort, { once: true })
  const timeout = setTimeout(abort, 10000)
  try {
    const response = await fetch(`${base}/api/typing${path}`, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      ...(body && { body: JSON.stringify(body) }),
      signal: controller.signal,
      cache: 'no-store',
    })
    const data = await response.json()
    if (!response.ok) throw new TypingApiError(data.error?.message || 'The typing service is unavailable.', response.status, data.error?.code)
    return data
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', abort)
  }
}

export function visitorId() {
  try {
    const stored = localStorage.getItem('typing-visitor')
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(stored || '')) return stored
    const id = crypto.randomUUID()
    localStorage.setItem('typing-visitor', id)
    return id
  } catch {
    return undefined
  }
}
