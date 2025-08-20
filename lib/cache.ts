/* eslint-disable @typescript-eslint/no-explicit-any */
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

export function getCachedData(key: string) {
  const cached = cache.get(key)
  if (!cached) return null
  
  if (Date.now() - cached.timestamp > cached.ttl) {
    cache.delete(key)
    return null
  }
  
  return cached.data
}

export function setCachedData(key: string, data: any, ttlMs: number = 300000) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl: ttlMs
  })
}

export function clearCache(pattern?: string) {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key)
      }
    }
  } else {
    cache.clear()
  }
}
