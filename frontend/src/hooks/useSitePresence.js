import { useEffect, useState } from 'react'
import { watchSitePresence } from '../lib/sitePresence'

export default function useSitePresence() {
  const [count, setCount] = useState(null)
  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
    if (!url || !key) return
    let disposed = false
    let stop
    async function connect() {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        if (disposed) return
        const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
        stop = watchSitePresence(client, value => {
          if (!disposed) setCount(value)
        })
      } catch {
        if (!disposed) setCount(null)
      }
    }
    connect()
    return () => {
      disposed = true
      stop?.()
    }
  }, [])
  return count
}
