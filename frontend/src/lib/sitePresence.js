export function watchSitePresence(client, onChange) {
  let stopped = false
  let generation = 0
  let ready = false
  let syncPending = false
  const key = crypto.randomUUID()
  const channel = client.channel('portfolio-presence', {
    config: { presence: { key } },
  })

  function count() {
    return Object.values(channel.presenceState()).reduce((total, entries) => total + (Array.isArray(entries) ? entries.length : 0), 0)
  }

  function hasOwnConnection() {
    const entries = channel.presenceState()[key]
    return Array.isArray(entries) && entries.length > 0
  }

  function publish(value) {
    if (!stopped) onChange(value)
  }

  function sync() {
    if (!ready) {
      syncPending = true
      publish(null)
      return
    }
    publish(hasOwnConnection() ? count() : null)
  }

  channel.on('presence', { event: 'sync' }, sync)
  channel.subscribe(async status => {
    if (stopped) return
    const current = ++generation
    if (status !== 'SUBSCRIBED') {
      ready = false
      syncPending = false
      publish(null)
      return
    }
    syncPending = false
    let result
    try {
      result = await channel.track({})
    } catch {
      result = 'error'
    }
    // A newer subscription/status made this acknowledgement stale.
    if (stopped || current !== generation) return
    if (result !== 'ok') {
      ready = false
      publish(null)
      return
    }
    ready = true
    if (syncPending) {
      syncPending = false
      publish(hasOwnConnection() ? count() : null)
    }
  })

  return () => {
    if (stopped) return
    stopped = true
    ready = false
    generation++
    void channel.untrack().catch(() => {})
    void client.removeChannel(channel).catch(() => {})
  }
}
